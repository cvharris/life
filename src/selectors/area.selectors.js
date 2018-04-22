import { createSelector } from 'reselect'

const getCategories = state => state.categories

export const getAreas = createSelector([getCategories], categories =>
  [].concat.apply([], categories.map(cat => cat.areas))
)
