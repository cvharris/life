import React from 'react'
import TextField from 'material-ui/TextField'

export const TodoForm = ({ todo, updateTodo }) => {
  const updateText = evt => {
    todo.description = evt.target.value
    updateTodo(todo)
  }

  if (!todo) {
    return <div className="todo-form">No todo selected yet</div>
  }

  return (
    <div className="todo-form">
      <TextField
        placeholder="Have to do..."
        value={todo.description}
        onChange={updateText}
        margin="normal"
      />
    </div>
  )
}
