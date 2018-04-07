import React, { Component } from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { TodoForm } from './components/TodoForm'
import { Todo } from './lib/Todo'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      todos: [],
      currentTodo: null
    }
    this.checkTodo = this.checkTodo.bind(this)
    this.selectTodo = this.selectTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.addTodo = this.addTodo.bind(this)
  }

  checkTodo(checkedTodo) {
    checkedTodo.isComplete = !checkedTodo.isComplete

    this.updateTodo(checkedTodo)
  }

  selectTodo(selectedTodo) {
    this.setState({
      ...this.state,
      currentTodo: selectedTodo
    })
  }

  updateTodo(updatedTodo) {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id === updatedTodo) {
          return updatedTodo
        } else {
          return todo
        }
      }),
      currentTodo: updatedTodo
    })
  }

  addTodo() {
    const newTodo = new Todo()

    this.setState({
      todos: [...this.state.todos, newTodo],
      currentTodo: newTodo
    })
  }

  render() {
    return (
      <div className="todo-app">
        <button onClick={this.addTodo}>Add Todo +</button>
        <TodoList
          todos={this.state.todos}
          todoChecked={this.checkTodo}
          todoSelected={this.selectTodo}
        />
        <TodoForm todo={this.state.currentTodo} updateTodo={this.updateTodo} />
      </div>
    )
  }
}

export default App
