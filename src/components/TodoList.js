import React, { Component } from 'react'
import List from 'material-ui/List'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import TodoListItem from './TodoListItem'
import { connect } from 'react-redux'

class TodoList extends Component {
  render() {
    const { todoIds } = this.props

    return (
      <div className="todo-list">
        <List dense={true}>
          {todoIds.map((todoId, i) => (
            <TodoListItem key={todoId} todoId={todoId} listIndex={i} />
          ))}
        </List>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(
  connect(state => {
    return {
      todoIds: state.todoList.todoIds
    }
  })(TodoList)
)
