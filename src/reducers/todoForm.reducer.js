import { TOGGLE_TODO_FORM, CLOSE_MODAL } from '../conf/ActionTypes'

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
    case CLOSE_MODAL:
      return {
        ...state,
        formOpen: action.payload
      }
    default:
      return state
  }
}
