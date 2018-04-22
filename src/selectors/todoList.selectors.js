import { createSelector } from 'reselect'

const getTodos = state => state.todoList.todos

export const getTodoList = createSelector([getTodos], todos => todos)
