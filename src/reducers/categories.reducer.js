export const CATEGORIZE_TODO = 'CATEGORIZE_TODO'
export const REMOVE_TODO_CATEGORY = 'REMOVE_TODO_CATEGORY'
export const ADD_CATEGORY = 'ADD_CATEGORY'
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY'
export const DELETE_CATEGORY = 'DELETE_CATEGORY'
export const ADD_AREA_TO_CATEGORY = 'ADD_AREA_TO_CATEGORY'
export const UPDATE_AREA = 'UPDATE_AREA'
export const DELETE_AREA = 'DELETE_AREA'

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
export const addAreaToCategory = (area, categoryId) => ({
  type: ADD_AREA_TO_CATEGORY,
  payload: { area, categoryId }
})
export const updateAreaInCategory = (area, categoryId) => ({
  type: UPDATE_AREA,
  payload: { area, categoryId }
})
export const deleteArea = (area, categoryId) => ({
  type: DELETE_AREA,
  payload: { area, categoryId }
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
    case ADD_AREA_TO_CATEGORY:
      return state.map(
        cat =>
          cat.id === payload.categoryId
            ? { ...cat, areas: [...cat.areas, payload.area] }
            : cat
      )
    case UPDATE_AREA:
      return state.map(
        cat =>
          cat.id === payload.categoryId
            ? {
                ...cat,
                areas: cat.areas.map(
                  area => (area.id === payload.area.id ? payload.area : area)
                )
              }
            : cat
      )
    case DELETE_AREA:
      return state.map(
        cat =>
          cat.id === payload.categoryId
            ? {
                ...cat,
                areas: cat.areas.filter(area => area.id !== payload.area.id)
              }
            : cat
      )
    default:
      return state
  }
}
