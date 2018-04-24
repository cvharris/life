import {
  ADD_AREA_TO_CATEGORY,
  UPDATE_AREA,
  DELETE_AREA
} from '../conf/ActionTypes'

export const updateAreaInCategory = (area, categoryId) => ({
  type: UPDATE_AREA,
  payload: { area, categoryId }
})

export const initialState = {}

export default (state = initialState, { type = '', payload }) => {
  switch (type) {
    case ADD_AREA_TO_CATEGORY:
      return {
        ...state,
        [payload.area.id]: { ...payload.area, category: payload.categoryId }
      }
    case UPDATE_AREA:
      return {
        ...state,
        [payload.area.id]: { ...state[payload.area.id], ...payload.area }
      }
    case DELETE_AREA:
      const { [payload.area.id]: deletedArea, ...newState } = state
      return newState
    default:
      return state
  }
}
