import React, { Component } from 'react'
import List from 'material-ui/List'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext, DropTarget } from 'react-dnd'
import TodoListItem from './TodoListItem'
import flow from 'lodash/flow'
import { connect } from 'react-redux'
import { moveTodos } from '../reducers/todoList.reducer'

const listTarget = {
  drop() {}
}

class TodoList extends Component {
  constructor(props) {
    super(props)

    this.movedTodo = this.movedTodo.bind(this)
  }

  movedTodo(movedTodo, newPosition) {
    // TODO: make this immutable somehow idk man this is easy as fuck
    const newList = [...this.props.todos]
    newList.splice(movedTodo.position, 1)
    newList.splice(newPosition, 0, movedTodo)
    newList.forEach((t, i) => (t.position = i))

    this.props.moveTodos(newList)
  }

  render() {
    const { todoIds, connectDropTarget } = this.props

    return connectDropTarget(
      <div className="todo-list">
        <List dense={true}>
          {todoIds.map(todoId => (
            <TodoListItem
              key={todoId}
              todoId={todoId}
              moveTodo={this.movedTodo}
            />
          ))}
        </List>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(
  flow(
    DropTarget('todo-list', listTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })),
    connect(
      state => ({
        todos: state.todoList.todos,
        todoIds: state.todoList.todos.map(t => t.id)
      }),
      { moveTodos }
    )
  )(TodoList)
)
