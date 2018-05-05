import {
  ADD_SESSION,
  UPDATE_SESSION,
  DELETE_SESSION
} from '../conf/ActionTypes'

export const addSession = session => ({ type: ADD_SESSION, payload: session })
export const updateSession = session => ({
  type: UPDATE_SESSION,
  payload: session
})
export const deleteSession = sessionId => ({
  type: DELETE_SESSION,
  payload: sessionId
})

export const initialState = {
  byId: {},
  allIds: []
}

export default (state = initialState, { type = '', payload }) => {
  switch (type) {
    case ADD_SESSION:
      return {
        byId: { ...state.byId, [payload.id]: payload },
        allIds: [...state.allIds, payload.id]
      }
    case UPDATE_SESSION:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    case DELETE_SESSION:
      const { [payload]: deletedSession, ...newState } = state.byId
      return {
        byId: newState,
        allIds: state.allIds.filter(sId => sId !== payload)
      }
    default:
      return state
  }
}
