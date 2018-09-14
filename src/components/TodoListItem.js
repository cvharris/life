import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import ListItem from '@material-ui/core/ListItem'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import flow from 'lodash/flow'
import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import { connect } from 'react-redux'
import { removeCategoryFromTodo } from '../reducers/categories.reducer'
// import throttle from 'lodash/throttle'
import { deleteTodo, moveTodos, updateTodo } from '../reducers/tasks.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'

const todoListItemSource = {
  beginDrag(props) {
    return {
      id: props.taskId
    }
  }
}

const todoTarget = {
  canDrop() {
    return false
  },

  hover: (props, monitor) => {
    if (!monitor.getItem()) {
      return
    }
    const dragId = monitor.getItem().id
    const hoverId = props.taskId

    // Don't replace items with themselves
    if (dragId === hoverId) {
      return
    }

    props.moveTodos(dragId, hoverId)
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props)

    this.handleRemovingCategory = this.handleRemovingCategory.bind(this)
  }

  shouldComponentUpdate(newProps) {
    if (this.props.task.description !== newProps.task.description) {
      return true
    }
    if (this.props.task.isComplete !== newProps.task.isComplete) {
      return true
    }
    if (this.props.task.area !== newProps.task.area) {
      return true
    }
    return false
  }

  handleRemovingCategory(category) {
    this.props.updateTodo({
      ...this.props.task,
      categories: this.props.task.categories.filter(
        cat => cat.id !== category.id
      )
    })
  }

  render() {
    const {
      taskId,
      task,
      area,
      category,
      toggleFormOpen,
      todoChecked,
      deleteTodo,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const { isComplete, description } = task
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <div
          key={taskId}
          className={
            isComplete ? 'task-list-item is-completed' : 'task-list-item'
          }>
          <ListItem style={{ opacity }}>
            <Checkbox checked={isComplete} onChange={() => todoChecked(task)} />
            <ListItemText
              className="task-description"
              disableTypography={true}
              primary={
                <h3 className="MuiTypography-root-42 MuiTypography-subheading-49 MuiListItemText-primary-106 MuiListItemText-textDense-108">
                  {description}
                </h3>
              }
              secondary={
                <div className="task-categories">
                  {category.label} - {area.label}
                </div>
              }
            />
            <ListItemSecondaryAction className="task-actions">
              <IconButton
                className="task-edit"
                aria-label="Edit"
                onClick={() => toggleFormOpen(taskId)}>
                <EditIcon />
              </IconButton>
              <IconButton
                className="task-delete"
                aria-label="Delete"
                onClick={() => deleteTodo(taskId)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      )
    )
  }
}

export default flow(
  DropTarget('todoItem', todoTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('todoItem', todoListItemSource, (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  }),
  connect(
    (state, props) => {
      const foundTask = state.tasks.byId[props.taskId]
      const foundArea = state.areas[foundTask.area]
      return {
        task: foundTask,
        area: state.areas[foundTask.area],
        category: state.categories.byId[foundArea.category]
      }
    },
    dispatch => ({
      todoChecked(task) {
        dispatch(updateTodo({ ...task, isComplete: !task.isComplete }))
      },
      updateTodo(task) {
        dispatch(updateTodo(task))
      },
      toggleFormOpen(taskId) {
        dispatch(toggleFormOpen(taskId, true))
      },
      moveTodos(dragIndex, hoverIndex) {
        dispatch(moveTodos(dragIndex, hoverIndex))
      },
      deleteTodo(task) {
        dispatch(deleteTodo(task))
      },
      removeCategory(task, category) {
        dispatch(removeCategoryFromTodo(task, category))
      }
    })
  )
)(TodoListItem)
