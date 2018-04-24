import update from 'immutability-helper'
import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  MOVE_TODOS,
  UPDATE_TODO_POSITIONS,
  FILTER_TODOS
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
export const filterTodos = (categoryId, areaId) => ({
  type: FILTER_TODOS,
  payload: { categoryId, areaId }
})

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
          [dragId]: { ...state.byId[dragId], position: newDragPosition },
          [hoverId]: { ...state.byId[hoverId], position: newHoverPosition }
        }
      }
    case 'MAP_TASKS':
      return {
        allIds: payload.map(t => t.id),
        byId: payload.reduce((map, t) => {
          map[t.id] = t
          return map
        }, {})
      }
    // TODO: must transform a list of todos by category/area
    // case DELETE_CATEGORY:
    //   return {
    //     ...state,
    //     todos: state.todos.map(t => todo(t, { type, payload }))
    //   }
    // TODO: move this action to different reducer
    // case FILTER_TODOS:
    //   return {
    //     ...state,
    //     filteredTodos: state.todos.filter(t => {
    //       if (!payload.categoryId && !payload.areaId) {
    //         return true
    //       } else if (!payload.areaId) {
    //         return t.area.category.id === payload.categoryId
    //       } else {
    //         return (
    //           t.area.id === payload.areaId &&
    //           t.area.category.id === payload.categoryId
    //         )
    //       }
    //     })
    //   }
    default:
      return state
  }
}
