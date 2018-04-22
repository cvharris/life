import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'
import { saveState } from './localStorage'
import todoList from '../reducers/todoList.reducer'
import categories from '../reducers/categories.reducer'
import todoForm from '../reducers/todoForm.reducer'
import Todo from '../lib/Todo'

const configureStore = persistedState => {
  const store = createStore(
    combineReducers({
      todoList,
      todoForm,
      categories
    }),
    persistedState,
    composeWithDevTools()
  )

  store.subscribe(
    throttle(() => {
      const state = store.getState()
      // TODO: this is quick and easy data cleansing. Remove this later
      // state.todoList.todos = state.todoList.todos.map(todo => new Todo(todo))
      saveState(state)
    }, 1000)
  )

  return store
}

export default configureStore
