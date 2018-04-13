import React, { Component } from 'react'
import './App.css'
import Todo from './lib/Todo'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import TodoForm from './components/TodoForm'
import { Provider } from 'react-redux'
import { loadState } from './conf/localStorage'
import configureStore from './conf/store'
import TodoListContainer from './containers/TodoListContainer'
import { toggleFormOpen } from './reducers/todoForm.reducer'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isStoreLoading: true,
      state: null
    }

    this.addTodo = this.addTodo.bind(this)
  }

  componentWillMount() {
    const persistedState = loadState()
    this.setState({
      store: configureStore(persistedState),
      isStoreLoading: false
    })
  }

  addTodo() {
    const newTodo = new Todo()

    this.state.store.dispatch(toggleFormOpen(newTodo, true))
  }

  render() {
    if (this.state.storeLoading) {
      return <h1>Loading...</h1>
    }

    return (
      <Provider store={this.state.store}>
        <div>
          <TodoListContainer />
          <TodoForm />
          <Button
            variant="fab"
            id="add-todo-button"
            color="primary"
            onClick={this.addTodo}>
            <AddIcon />
          </Button>
        </div>
      </Provider>
    )
  }
}

export default App
