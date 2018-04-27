import { createSelector } from 'reselect'

const getTasks = state => state.tasks
const getCurrentFilter = state => state.currentFilter

export const getFilteredTaskIds = createSelector(
  [getTasks, getCurrentFilter],
  (tasks, filter) => {
    const allTasks = tasks.allIds.map(tId => tasks.byId[tId])
    switch (filter.type) {
      case 'CATEGORY':
        return allTasks
          .filter(task => task.category === filter.val)
          .map(t => t.id)
      case 'AREA':
        return allTasks.filter(task => task.area === filter.val).map(t => t.id)
      default:
        return allTasks.map(t => t.id)
    }
  }
)
