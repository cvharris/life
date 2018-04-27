import { createSelector } from 'reselect'
import isNull from 'lodash/isNull'

const getTasks = state => state.tasks
const getCurrentFilter = state => state.currentFilter

export const getFilteredTaskIds = createSelector(
  [getTasks, getCurrentFilter],
  (tasks, filter) => {
    if (Object.values(filter).every(val => isNull(val))) {
      return [...tasks.allIds]
    }

    const allTasks = tasks.allIds.map(tId => tasks.byId[tId])
    const filterGroup1 =
      isNull(filter.category) && isNull(filter.area)
        ? allTasks
        : allTasks.filter(task => {
            let keep = false
            if (!isNull(filter.category)) {
              keep = task.category === filter.category
            }
            if (!isNull(filter.area)) {
              keep = task.area === filter.area
            }
            return keep
          })
    return filterGroup1
      .filter(task => {
        if (!isNull(filter.isComplete)) {
          return task.isComplete === filter.isComplete
        }
        return true
      })
      .map(t => t.id)
  }
)
