import React, { Component } from 'react'
import flow from 'lodash/flow'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import { connect } from 'react-redux'
import { DropTarget, DragSource } from 'react-dnd'
import throttle from 'lodash/throttle'
import { updateTodo, deleteTodo, moveTodos } from '../reducers/tasks.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'
import { removeCategoryFromTodo } from '../reducers/categories.reducer'

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

  hover: throttle((props, monitor) => {
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
  }, 100)
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
      toggleFormOpen,
      todoChecked,
      deleteTodo,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const { isComplete, description, category } = task
    const area = task.area ? task.area : { label: '' }
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
                <div>
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
                onClick={() => deleteTodo(task)}>
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
    (state, props) => ({
      task: state.tasks.byId[props.taskId]
    }),
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
