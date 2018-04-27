import { createSelector } from 'reselect'
import isNull from 'lodash/isNull'

const getTasks = state => state.tasks
const getCurrentFilter = state => state.currentFilter

export const getFilteredTaskIds = createSelector(
  [getTasks, getCurrentFilter],
  (tasks, filter) => {
    if (Object.values(filter).every(val => isNull(val))) {
      return tasks.allIds
    }

    const allTasks = tasks.allIds.map(tId => tasks.byId[tId])
    return allTasks
      .filter(task => {
        let keep = false
        if (!isNull(filter.isComplete)) {
          keep = task.isComplete === filter.isComplete
        }
        if (!isNull(filter.category)) {
          keep = task.category === filter.category
        }
        if (!isNull(filter.area)) {
          keep = task.area === filter.area
        }
        return keep
      })
      .map(t => t.id)
  }
)
