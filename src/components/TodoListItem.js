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
import { updateTodo, deleteTodo } from '../reducers/todoList.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'
import { removeCategoryFromTodo } from '../reducers/categories.reducer'

const todoListItemSource = {
  beginDrag(props) {
    return {
      todo: props.todo
    }
  },
  isDragging(props, monitor) {
    return props.todo.id === monitor.getItem().todo.id
  },
  endDrag(props, monitor) {
    // TODO: Implement this when the 'space' to drop is not the whole screen
    // const { id: droppedId, originalIndex } = monitor.getItem()
    // const didDrop = monitor.didDrop()
    // if (!didDrop) {
    //   props.moveTodo(droppedId, originalIndex)
    // }
  }
}

const todoTarget = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const { todo: draggedTodo } = monitor.getItem()
    const { todo } = props

    if (draggedTodo.id !== todo.id) {
      props.moveTodo(draggedTodo, todo.position)
    }
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props)

    this.handleRemovingCategory = this.handleRemovingCategory.bind(this)
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
      todo,
      toggleFormOpen,
      todoChecked,
      deleteTodo,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const { description, isComplete } = todo
    const opacity = isDragging ? 0 : 1
    const categories = todo.categories ? todo.categories : []

    return connectDragSource(
      connectDropTarget(
        <div
          key={todo.id}
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
              secondary={categories.map(category => (
                <Chip
                  key={category.id}
                  label={category.label}
                  onDelete={() => this.handleRemovingCategory(category)}
                />
              ))}
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
    (state, props) => ({
      todo: state.todoList.todos.find(t => t.id === props.todoId)
    }),
    dispatch => ({
      todoChecked(todo) {
        todo.isComplete = !todo.isComplete
        dispatch(updateTodo(todo))
      },
      updateTodo(todo) {
        dispatch(updateTodo(todo))
      },
      toggleFormOpen(todo) {
        dispatch(toggleFormOpen(todo, true))
      },
      deleteTodo(todo) {
        dispatch(deleteTodo(todo))
      },
      removeCategory(todo, category) {
        dispatch(removeCategoryFromTodo(todo, category))
      }
    })
  )
)(TodoListItem)
