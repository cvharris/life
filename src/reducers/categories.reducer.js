export const CATEGORIZE_TODO = 'CATEGORIZE_TODO'
export const REMOVE_TODO_CATEGORY = 'REMOVE_TODO_CATEGORY'

export const categorizeTodo = (todoId, category) => ({
  type: CATEGORIZE_TODO,
  payload: { todoId, category }
})
export const removeCategoryFromTodo = (todoId, category) => ({
  type: REMOVE_TODO_CATEGORY,
  payload: { todoId, category }
})

// Initial State
export const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state
  }
}