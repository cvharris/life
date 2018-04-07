import React, { Component } from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { TodoForm } from './components/TodoForm'
import { Todo } from './lib/Todo'
import Button from 'material-ui/Button'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import AddIcon from 'material-ui-icons/Add'

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
      <Grid container className="todo-app" spacing={16}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Life
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className="todo-app" spacing={16} justify="center">
          <Grid item xs={6}>
            <TodoForm
              todo={this.state.currentTodo}
              updateTodo={this.updateTodo}
            />
            <TodoList
              todos={this.state.todos}
              todoChecked={this.checkTodo}
              todoSelected={this.selectTodo}
            />
            <Button
              variant="fab"
              id="add-todo-button"
              color="primary"
              onClick={this.addTodo}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )
  }
}

export default App
