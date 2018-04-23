import React, { Component } from 'react'
import List from 'material-ui/List'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import TodoListItem from './TodoListItem'
import { connect } from 'react-redux'

class TodoList extends Component {
  render() {
    const { todoIds } = this.props

    if (todoIds.length === 0) {
      return <h1 style={{ textAlign: 'center' }}>No todos yet! Go add some!</h1>
    }

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
      todoIds: state.todoList.filteredTodos.map(t => t.id)
    }
  })(TodoList)
)
