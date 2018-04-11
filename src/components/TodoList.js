import React, { Component } from 'react'
import List from 'material-ui/List'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext, DropTarget } from 'react-dnd'
import TodoListItem from './TodoListItem'

const listTarget = {
  drop() {}
}

class TodoList extends Component {
  render() {
    const {
      todos,
      todoChecked,
      todoEdited,
      todoDeleted,
      connectDropTarget,
      getTodo,
      moveTodo
    } = this.props
    return connectDropTarget(
      <div className="todo-list">
        <List dense={true}>
          {todos.map(todo => (
            <TodoListItem
              key={todo.id}
              todoId={todo.id}
              description={todo.description}
              isComplete={todo.isComplete}
              todoChecked={todoChecked}
              todoEdited={todoEdited}
              todoDeleted={todoDeleted}
              getTodo={getTodo}
              moveTodo={moveTodo}
            />
          ))}
        </List>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(
  DropTarget('todo-list', listTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  }))(TodoList)
)
