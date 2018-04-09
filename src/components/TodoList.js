import React from 'react'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'

export const TodoList = ({ todos, todoChecked, todoSelected, todoDeleted }) => (
  <div className="todo-list">
    <List>
      {todos.map(todo => (
        <div
          key={todo.id}
          className={
            todo.isComplete ? 'todo-list-item is-completed' : 'todo-list-item'
          }
        >
          <ListItem>
            <Checkbox
              checked={todo.isComplete}
              onChange={() => todoChecked(todo)}
            />
            <ListItemText
              className="todo-description"
              primary={todo.description}
            />
            <ListItemSecondaryAction className="todo-actions">
              <IconButton
                className="todo-edit"
                aria-label="Edit"
                onClick={() => todoSelected(todo)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                className="todo-delete"
                aria-label="Delete"
                onClick={() => todoDeleted(todo)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      ))}
    </List>
  </div>
)
