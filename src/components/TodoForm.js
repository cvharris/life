import React from 'react'

export const TodoForm = ({ todo, updateTodo }) => {
  const updateText = evt => {
    todo.description = evt.target.value
    updateTodo(todo)
  }

  if (!todo) {
    return <div>No todo selected yet</div>
  }

  return (
    <div className="todo-form">
      <input
        placeholder="Have to do..."
        value={todo.description}
        onChange={updateText}
      />
    </div>
  )
}
