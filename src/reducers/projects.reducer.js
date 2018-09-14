import {
  ADD_PROJECT,
  ADD_TASK_TO_PROJECT,
  DELETE_PROJECT,
  REMOVE_TASK_FROM_PROJECT,
  UPDATE_PROJECT
} from '../conf/ActionTypes'

export const addProject = project => ({ type: ADD_PROJECT, payload: project })
export const updateProject = project => ({
  type: UPDATE_PROJECT,
  payload: project
})
export const deleteProject = projectId => ({
  type: DELETE_PROJECT,
  payload: projectId
})
export const addTaskToProject = (projectId, taskId) => ({
  type: ADD_TASK_TO_PROJECT,
  payload: { projectId, taskId }
})
export const removeTaskFromProject = (projectId, taskId) => ({
  type: REMOVE_TASK_FROM_PROJECT,
  payload: { projectId, taskId }
})

export const initialState = {
  byId: {},
  allIds: []
}

export default (state = initialState, { type = '', payload }) => {
  switch (type) {
    case ADD_PROJECT:
      return {
        byId: { ...state.byId, [payload.id]: payload },
        allIds: [...state.allIds, payload.id]
      }
    case UPDATE_PROJECT:
      return {
        ...state,
        byId: { ...state.byId, [payload.id]: payload }
      }
    case DELETE_PROJECT:
      const { [payload]: deletedProjectId, ...newState } = state.byId
      return {
        byId: newState,
        allIds: state.allIds.filter(pId => pId !== payload)
      }
    case ADD_TASK_TO_PROJECT:
      const projectToAddTo = state.byId[payload.projectId]
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.projectId]: {
            ...projectToAddTo,
            tasks: [...projectToAddTo.tasks, payload.taskId]
          }
        }
      }
    case REMOVE_TASK_FROM_PROJECT:
      const projectToRemoveFrom = state.byId[payload.projectId]
      return {
        ...state,
        byId: {
          ...state.byId,
          [payload.projectId]: {
            ...projectToRemoveFrom,
            tasks: projectToRemoveFrom.tasks.filter(
              tId => tId !== payload.taskId
            )
          }
        }
      }
    default:
      return state
  }
}
