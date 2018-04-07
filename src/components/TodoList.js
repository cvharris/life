import React from 'react'

export const TodoList = ({ todos, todoChecked, todoSelected }) => (
  <div className="todo-list">
    <h1>Todos</h1>
    {todos.map(todo => (
      <div key={todo.id} className="todo-list-item">
        <label htmlFor={`todo-item-${todo.id}`}>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            onChange={() => todoChecked(todo)}
          />
        </label>
        <div className="todo-summary" onClick={() => todoSelected(todo)}>
          <div className="todo-description">{todo.description}</div>
        </div>
      </div>
    ))}
  </div>
)
