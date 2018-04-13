import Todo from '../lib/Todo'
import { ADD_TODO, UPDATE_TODO } from './todoList.reducer'

export default (state, action) => {
  switch (action.type) {
    case ADD_TODO:
      return new Todo(action)
    case UPDATE_TODO:
      if (state.id !== action.payload.id) {
        return state
      } else {
        return {
          ...Object.assign(state, action.payload),
          updatedOn: new Date().getTime()
        }
      }
    default:
      return state
  }
}
