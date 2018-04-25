import { FILTER_TASKS } from '../conf/ActionTypes'

export const filterTasks = (type, val) => ({
  type: FILTER_TASKS,
  payload: { type, val }
})

export const initialState = {
  type: '',
  val: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_TASKS:
      return { type: payload.type, val: payload.val }
    default:
      return state
  }
}
