// import { CATEGORIZE_TODO, REMOVE_TODO_CATEGORY } from './categories.reducer'
import todo from './todo.reducer'

export const ADD_TODO = 'ADD_TODO'
export const UPDATE_TODO = 'UPDATE_TODO'
export const DELETE_TODO = 'DELETE_TODO'
export const MOVE_TODOS = 'MOVE_TODOS'

export const updateTodo = todo => ({ type: UPDATE_TODO, payload: todo })
export const addTodo = todo => ({ type: ADD_TODO, payload: todo })
export const deleteTodo = todo => ({ type: DELETE_TODO, payload: todo })
export const moveTodos = todos => ({ type: MOVE_TODOS, payload: todos })

// Initial State
export const initialState = {
  todos: [],
  category: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, todo(undefined, action)]
      }
    case UPDATE_TODO:
      return {
        ...state,
        todos: state.todos.map(t => todo(t, action))
      }
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter(t => t.id !== action.payload.id)
      }
    case MOVE_TODOS:
      return {
        ...state,
        todos: [...action.payload]
      }
    default:
      return state
  }
}
