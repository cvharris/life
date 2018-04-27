import Todo from '../lib/Todo'
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_CATEGORY,
  MOVE_TODOS
} from '../conf/ActionTypes'

export default (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return new Todo(action.payload)
    case UPDATE_TODO:
      if (state.id !== action.payload.id) {
        return state
      } else {
        return Object.assign({}, state, action.payload)
      }
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories
          ? state.categories.filter(cat => cat.id !== action.payload.id)
          : []
      }
    case MOVE_TODOS:
      return {
        ...state,
        position: action.payload.position
      }
    default:
      return state
  }
}
