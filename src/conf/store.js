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
import sessions from '../reducers/sessions.reducer'
import projects from '../reducers/projects.reducer'

const configureStore = persistedState => {
  const store = createStore(
    combineReducers({
      tasks,
      areas,
      categories,
      todoForm,
      currentFilter,
      sessions,
      projects
    }),
    persistedState,
    composeWithDevTools()
  )

  store.subscribe(
    throttle(() => {
      const state = store.getState()
      const normalizedResult = {
        tasks: state.tasks.allIds,
        categories: state.categories.allIds,
        sessions: state.sessions.allIds,
        projects: state.projects.allIds
      }
      const normalizedEntities = {
        tasks: state.tasks.byId,
        categories: state.categories.byId,
        areas: state.areas,
        sessions: state.sessions.byId,
        projects: state.projects.byId
      }
      const denormalized = denormalize(
        normalizedResult,
        lifeSchema,
        normalizedEntities
      )
      denormalized.currentFilter = state.currentFilter
      saveState(denormalized)
    }, 1000)
  )

  return store
}

export default configureStore
