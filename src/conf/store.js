import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'
import { saveState } from './localStorage'
import todoList from '../reducers/todoList.reducer'
import categories from '../reducers/categories.reducer'
import todoForm from '../reducers/todoForm.reducer'

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
      saveState(store.getState())
    }, 1000)
  )

  return store
}

export default configureStore
