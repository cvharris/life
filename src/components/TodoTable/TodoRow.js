import React, { Component } from 'react'
import { updateTodo, deleteTodo } from '../../reducers/todoList.reducer'
import { connect } from 'react-redux'
import { toggleFormOpen } from '../../reducers/todoForm.reducer'
import Checkbox from 'material-ui/Checkbox'
import { TableCell, TableRow } from 'material-ui/Table'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'

class TodoRow extends Component {
  render() {
    const { todo, toggleFormOpen, todoChecked, deleteTodo } = this.props
    return (
      <TableRow hover className={`${todo.isComplete ? 'is-completed' : ''}`}>
        <TableCell padding="checkbox">
          <Checkbox
            checked={todo.isComplete}
            onChange={() => todoChecked(todo)}
          />
        </TableCell>
        {/* TODO: colored icon with tooltip */}
        <TableCell padding="none">{todo.type}</TableCell>
        <TableCell
          className="todo-description"
          style={{ cursor: 'pointer' }}
          padding="none"
          onClick={() => toggleFormOpen(todo)}>
          {todo.description}
        </TableCell>
        <TableCell>{todo.area}</TableCell>
        <TableCell>{todo.project}</TableCell>
        {/* <TableCell>{todo.state}</TableCell> */}
        <TableCell>{todo.dueWhen}</TableCell>
        <TableCell>
          <IconButton
            className="todo-delete"
            aria-label="Delete"
            onClick={() => deleteTodo(todo)}>
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    )
  }
}

export default connect(
  (state, ownProps) => ({
    todo: state.todoList.todos.filter(t => t.id === ownProps.todoId)[0]
  }),
  dispatch => ({
    toggleFormOpen(todo) {
      dispatch(toggleFormOpen(todo, true))
    },
    todoChecked(todo) {
      todo.isComplete = !todo.isComplete
      dispatch(updateTodo(todo))
    },
    deleteTodo(todo) {
      dispatch(deleteTodo(todo))
    }
  })
)(TodoRow)
