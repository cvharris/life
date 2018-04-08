import React, { Component } from 'react'
import './App.css'
import { TodoList } from './components/TodoList'
import { TodoForm } from './components/TodoForm'
import { Todo } from './lib/Todo'
import debounce from 'lodash/debounce'
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
      currentTodo: null,
      modalOpen: false
    }
    this.checkTodo = this.checkTodo.bind(this)
    this.selectTodo = this.selectTodo.bind(this)
    this.updateTodo = this.updateTodo.bind(this)
    this.addTodo = this.addTodo.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
    this.persistStateToStorage = debounce(this.persistStateToStorage, 750)
  }

  componentDidMount() {
    this.hydrateStateFromStorage()
  }

  hydrateStateFromStorage() {
    const storage = localStorage.getItem('lifeStorage')

    if (storage) {
      this.saveState(JSON.parse(storage))
    }
  }

  persistStateToStorage(state) {
    localStorage.setItem('lifeStorage', JSON.stringify(state))
  }

  saveState(state) {
    this.setState(state)

    this.persistStateToStorage(state)
  }

  checkTodo(checkedTodo) {
    checkedTodo.isComplete = !checkedTodo.isComplete

    this.updateTodo(checkedTodo)
  }

  selectTodo(selectedTodo) {
    this.saveState({
      ...this.state,
      currentTodo: selectedTodo,
      modalOpen: true
    })
  }

  updateTodo(updatedTodo) {
    this.saveState({
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

    this.saveState({
      todos: [...this.state.todos, newTodo],
      currentTodo: newTodo,
      modalOpen: true
    })
  }

  handleModalClose() {
    this.saveState({
      ...this.state,
      modalOpen: false
    })
  }

  render() {
    return (
      <Grid container className="todo-app" spacing={16}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Life<small className="app-subtitle">
                <em>"Oh my life!"</em>
              </small>
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className="todo-app" spacing={16}>
          <Grid item xs={6}>
            <TodoList
              todos={this.state.todos}
              todoChecked={this.checkTodo}
              todoSelected={this.selectTodo}
            />
            <TodoForm
              todo={this.state.currentTodo}
              updateTodo={this.updateTodo}
              handleModalClose={this.handleModalClose}
              modalOpen={this.state.modalOpen}
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
