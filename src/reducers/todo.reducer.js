import Todo from '../lib/Todo'
import { ADD_TODO, UPDATE_TODO } from './todoList.reducer'

export default (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return new Todo(action.payload)
    case UPDATE_TODO:
      if (state.id !== action.payload.id) {
        return state
      } else {
        if (!action.payload.position) {
          action.payload.position = state.position
        }
        return {
          ...Object.assign(state, action.payload),
          updatedOn: new Date().getTime()
        }
      }
    default:
      return state
  }
}
