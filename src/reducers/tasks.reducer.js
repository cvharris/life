import update from 'immutability-helper'
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  MOVE_TODOS,
  UPDATE_TODO_POSITIONS
} from '../conf/ActionTypes'
import todo from './todo.reducer'

export const updateTodo = todo => ({ type: UPDATE_TODO, payload: todo })
export const addTodo = todo => ({ type: ADD_TODO, payload: todo })
export const deleteTodo = todo => ({ type: DELETE_TODO, payload: todo })
export const moveTodos = (dragId, hoverId) => ({
  type: MOVE_TODOS,
  payload: { dragId, hoverId }
})
export const updateTodoPositions = () => ({ type: UPDATE_TODO_POSITIONS })

// Initial State
export const initialState = {
  allIds: [],
  byId: {}
}

export default (state = initialState, { type = '', payload }) => {
  switch (type) {
    case ADD_TODO:
      payload.position = state.allIds.length
      return {
        allIds: [...state.allIds, payload.id],
        byId: {
          ...state.byId,
          [payload.id]: todo(undefined, { type, payload })
        }
      }
    case UPDATE_TODO:
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.id]: todo(state.byId[payload.id], { type, payload })
        }
      }
    case DELETE_TODO:
      const { [payload.id]: deletedTodo, ...newState } = state.byId
      return {
        byId: newState,
        allIds: state.allIds.filter(tId => tId !== payload.id)
      }
    case MOVE_TODOS:
      const { dragId, hoverId } = payload
      const dragIndex = state.byId[dragId].position
      const hoverIndex = state.byId[hoverId].position
      const newIdsList = update(state.allIds, {
        $splice: [[dragIndex, 1], [hoverIndex, 0, dragId]]
      })
      const newDragPosition = newIdsList.indexOf(dragId)
      const newHoverPosition = newIdsList.indexOf(hoverId)

      return {
        allIds: newIdsList,
        byId: {
          ...state.byId,
          [dragId]: todo(state.byId[dragId], {
            type,
            payload: { ...payload, position: newDragPosition }
          }),
          [hoverId]: todo(state.byId[hoverId], {
            type,
            payload: { ...payload, position: newHoverPosition }
          })
        }
      }
    // TODO: must transform a list of todos by category/area
    // case DELETE_CATEGORY:
    //   return {
    //     ...state,
    //     todos: state.todos.map(t => todo(t, { type, payload }))
    //   }
    default:
      return state
  }
}
