import {
  CATEGORIZE_TODO,
  REMOVE_TODO_CATEGORY,
  ADD_CATEGORY,
  ADD_AREA_TO_CATEGORY,
  DELETE_AREA,
  UPDATE_CATEGORY,
  DELETE_CATEGORY
} from '../conf/ActionTypes'

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
export const initialState = {
  byId: {},
  allIds: []
}

export default (state = initialState, { type = '', payload }) => {
  switch (type) {
    case ADD_CATEGORY:
      return {
        byId: { ...state.byId, [payload.id]: payload },
        allIds: [...state.allIds, payload.id]
      }
    case DELETE_CATEGORY:
      const { [payload.id]: deletedCategory, ...newState } = state.byId
      return {
        byId: newState,
        allIds: state.allIds.filter(cId => cId !== payload.id)
      }
    case UPDATE_CATEGORY:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    case ADD_AREA_TO_CATEGORY:
      const categoryToAddTo = state.byId[payload.categoryId]
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.categoryId]: {
            ...categoryToAddTo,
            areas: [...categoryToAddTo.areas, payload.area.id]
          }
        }
      }
    case DELETE_AREA:
      const categoryToDeleteFrom = state.byId[payload.categoryId]
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.categoryId]: {
            ...categoryToDeleteFrom,
            areas: categoryToDeleteFrom.areas.filter(
              areaId => areaId !== payload.area.id
            )
          }
        }
      }
    default:
      return state
  }
}
