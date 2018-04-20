export const CATEGORIZE_TODO = 'CATEGORIZE_TODO'
export const REMOVE_TODO_CATEGORY = 'REMOVE_TODO_CATEGORY'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'

export const categorizeTodo = (todoId, category) => ({
  type: CATEGORIZE_TODO,
  payload: { todoId, category }
})
export const removeCategoryFromTodo = (todo, category) => ({
  type: REMOVE_TODO_CATEGORY,
  payload: { todo, category }
})
export const addCategory = category => ({
  type: ADD_CATEGORY,
  payload: category
})
export const updateCategory = category => ({
  type: UPDATE_CATEGORY,
  payload: category
})
export const deleteCategory = category => ({
  type: DELETE_CATEGORY,
  payload: category
})

// Initial State
export const initialState = []

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_CATEGORY:
      return [...state, payload]
    case DELETE_CATEGORY:
      return state.filter(cat => cat.id !== payload.id)
    case UPDATE_CATEGORY:
      return state.map(
        cat =>
          cat.id === payload.id ? Object.assign({}, cat, { ...payload }) : cat
      )
    default:
      return state
  }
}
