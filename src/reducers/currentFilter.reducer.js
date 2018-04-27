import { FILTER_TASKS } from '../conf/ActionTypes'

export const filterTasks = filterObj => ({
  type: FILTER_TASKS,
  payload: filterObj
})

export const initialState = {
  isComplete: null,
  category: null,
  area: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_TASKS:
      return Object.assign({}, state, payload)
    default:
      return state
  }
}
