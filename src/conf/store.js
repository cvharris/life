import { combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import throttle from 'lodash/throttle'
import { denormalize } from 'normalizr'
import { saveState } from './localStorage'
import lifeSchema from '../conf/schema'
import tasks from '../reducers/tasks.reducer'
import categories from '../reducers/categories.reducer'
import areas from '../reducers/areas.reducer'
import todoForm from '../reducers/todoForm.reducer'
import currentFilter from '../reducers/currentFilter.reducer'

const configureStore = persistedState => {
  const store = createStore(
    combineReducers({
      tasks,
      areas,
      categories,
      todoForm,
      currentFilter
    }),
    persistedState,
    composeWithDevTools()
  )

  store.subscribe(
    throttle(() => {
      const state = store.getState()
      const normalizedResult = {
        tasks: state.tasks.allIds,
        categories: state.categories.allIds
      }
      const normalizedEntities = {
        tasks: state.tasks.byId,
        categories: state.categories.byId,
        areas: state.areas
      }
      const denormalized = denormalize(
        normalizedResult,
        lifeSchema,
        normalizedEntities
      )
      // TODO: this is quick and easy data cleansing. Remove this later
      // state.todoList.todos = state.todoList.todos.map(todo => new Todo(todo))
      saveState(denormalized)
    }, 1000)
  )

  return store
}

export default configureStore
