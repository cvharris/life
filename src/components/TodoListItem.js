import React, { Component } from 'react'
import flow from 'lodash/flow'
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Chip from 'material-ui/Chip'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import { connect } from 'react-redux'
import { DropTarget, DragSource } from 'react-dnd'
import { getTodoList } from '../selectors/todoList.selectors'
import {
  updateTodo,
  deleteTodo,
  moveTodos,
  updateTodoPositions
} from '../reducers/todoList.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'
import { removeCategoryFromTodo } from '../reducers/categories.reducer'

const todoListItemSource = {
  beginDrag(props) {
    return {
      id: props.todoId,
      listIndex: props.listIndex
    }
  },
  endDrag(props, monitor) {
    props.updateTodoPositions()
  }
}

const todoTarget = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const dragIndex = monitor.getItem().listIndex
    const hoverIndex = props.listIndex

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return
    }

    props.moveTodos(dragIndex, hoverIndex)
    monitor.getItem().listIndex = hoverIndex
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props)

    this.handleRemovingCategory = this.handleRemovingCategory.bind(this)
  }

  shouldComponentUpdate(newProps) {
    if (this.props.todo.description !== newProps.todo.description) {
      return true
    }
    if (this.props.todo.isComplete !== newProps.todo.isComplete) {
      return true
    }
    return false
  }

  handleRemovingCategory(category) {
    this.props.updateTodo({
      ...this.props.todo,
      categories: this.props.todo.categories.filter(
        cat => cat.id !== category.id
      )
    })
  }

  render() {
    const {
      todoId,
      todo,
      toggleFormOpen,
      todoChecked,
      deleteTodo,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const { isComplete, description } = todo
    const opacity = isDragging ? 0 : 1

    return connectDragSource(
      connectDropTarget(
        <div
          key={todoId}
          className={
            isComplete ? 'todo-list-item is-completed' : 'todo-list-item'
          }>
          <ListItem style={{ opacity }}>
            <Checkbox checked={isComplete} onChange={() => todoChecked(todo)} />
            <ListItemText
              className="todo-description"
              disableTypography={true}
              primary={
                <h3 className="MuiTypography-root-42 MuiTypography-subheading-49 MuiListItemText-primary-106 MuiListItemText-textDense-108">
                  {description}
                </h3>
              }
            />
            <ListItemSecondaryAction className="todo-actions">
              <IconButton
                className="todo-edit"
                aria-label="Edit"
                onClick={() => toggleFormOpen(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton
                className="todo-delete"
                aria-label="Delete"
                onClick={() => deleteTodo(todo)}>
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
      return {
        todo: getTodoList(state).find(t => t.id === props.todoId)
      }
    },
    dispatch => ({
      todoChecked(todo) {
        dispatch(updateTodo({ ...todo, isComplete: !todo.isComplete }))
      },
      updateTodo(todo) {
        dispatch(updateTodo(todo))
      },
      toggleFormOpen(todo) {
        dispatch(toggleFormOpen(todo, true))
      },
      moveTodos(dragIndex, hoverIndex) {
        dispatch(moveTodos(dragIndex, hoverIndex))
      },
      deleteTodo(todo) {
        dispatch(deleteTodo(todo))
      },
      removeCategory(todo, category) {
        dispatch(removeCategoryFromTodo(todo, category))
      },
      updateTodoPositions() {
        dispatch(updateTodoPositions())
      }
    })
  )
)(TodoListItem)
