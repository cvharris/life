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
import { updateTodo, deleteTodo } from '../reducers/todoList.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'

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
    const { description, categories, isComplete } = todo
    const opacity = isDragging ? 0 : 1
    const categoryString = categories
      ? `<span class="category">${categories
          .map(cat => cat.label)
          .join(`</span><span class="category">`)}</span>`
      : ``

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
              primary={description}
              secondary={categoryString}
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
      }
    })
  )
)(TodoListItem)
