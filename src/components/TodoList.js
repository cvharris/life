import React from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'

export const TodoList = ({ todos, todoChecked, todoSelected }) => (
  <div className="todo-list">
    <List>
      {todos.map(todo => (
        <ListItem key={todo.id} className="todo-list-item">
          <Checkbox
            checked={todo.isCompleted}
            onChange={() => todoChecked(todo)}
          />
          <div className="todo-summary" onClick={() => todoSelected(todo)}>
            <ListItemText
              className="todo-description"
              primary={todo.description}
            />
          </div>
        </ListItem>
      ))}
    </List>
  </div>
)
