import { UPDATE_TODO } from './todoList.reducer'
import todo from './todo.reducer'

export const TOGGLE_TODO_FORM = 'TOGGLE_TODO_FORM'
export const CLOSE_MODAL = 'CLOSE_MODAL'

export const toggleFormOpen = (todo, formOpen) => ({
  type: TOGGLE_TODO_FORM,
  payload: { todo, formOpen }
})

export const closeModal = () => ({ type: CLOSE_MODAL, payload: false })

// Initial State
export const initialState = {
  todo: undefined,
  formOpen: false
}

export default (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_TODO_FORM:
      return {
        todo: action.payload.todo,
        formOpen: action.payload.formOpen
      }
    case UPDATE_TODO:
      if (state.todo.id === action.payload.id) {
        return {
          ...state,
          todo: todo(state.todo, action)
        }
      } else {
        return state
      }
    case CLOSE_MODAL:
      return {
        ...state,
        formOpen: action.payload
      }
    default:
      return state
  }
}
