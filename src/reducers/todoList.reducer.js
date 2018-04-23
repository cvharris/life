import update from 'immutability-helper'
import { DELETE_CATEGORY } from './categories.reducer'
import todo from './todo.reducer'

export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const MOVE_TODOS = 'MOVE_TODOS'
export const UPDATE_TODO_POSITIONS = 'UPDATE_TODO_POSITIONS'
export const FILTER_TODOS = 'FILTER_TODOS'

export const updateTodo = todo => ({ type: UPDATE_TODO, payload: todo })
export const addTodo = todo => ({ type: ADD_TODO, payload: todo })
export const deleteTodo = todo => ({ type: DELETE_TODO, payload: todo })
export const moveTodos = (dragIndex, hoverIndex) => ({
  type: MOVE_TODOS,
  payload: { dragIndex, hoverIndex }
})
export const updateTodoPositions = () => ({ type: UPDATE_TODO_POSITIONS })
export const filterTodos = (categoryId, areaId) => ({
  type: FILTER_TODOS,
  payload: { categoryId, areaId }
})

// Initial State
export const initialState = {
  todos: [],
  filteredTodos: [],
  todoIds: [],
  todosById: {},
  category: null,
  area: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_TODO:
      payload.position = state.todos.length
      const addedList = [...state.todos, todo(undefined, { type, payload })]
      return {
        ...state,
        todos: addedList,
        todoIds: addedList.map(t => t.id)
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(
          t => (t.id === payload.id ? todo(t, { type, payload }) : t)
        )
      }
    case DELETE_TODO:
      const filteredTodos = state.todos.filter(t => t.id !== payload.id)
      return {
        ...state,
        todos: filteredTodos,
        todoIds: filteredTodos.map(t => t.id)
      }
    case MOVE_TODOS:
      const { dragIndex, hoverIndex } = payload
      const draggedTodo = state.todos[dragIndex]
      return update(state, {
        todos: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, draggedTodo]]
        },
        todoIds: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, draggedTodo.id]]
        }
      })
    case DELETE_CATEGORY:
      return {
        ...state,
        todos: state.todos.map(t => todo(t, { type, payload }))
      }
    case UPDATE_TODO_POSITIONS:
      return {
        ...state,
        todos: state.todos.map((t, i) =>
          todo(t, { type: UPDATE_TODO, payload: { ...t, position: i } })
        )
      }
    case FILTER_TODOS:
      return {
        ...state,
        filteredTodos: state.todos.filter(t => {
          if (!payload.categoryId && !payload.areaId) {
            return true
          } else if (!payload.areaId) {
            return t.area.category.id === payload.categoryId
          } else {
            return (
              t.area.id === payload.areaId &&
              t.area.category.id === payload.categoryId
            )
          }
        })
      }
    default:
      return state
  }
}
