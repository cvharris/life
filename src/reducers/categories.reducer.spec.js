import categories, { initialState } from './categories.reducer'
import * as types from '../conf/ActionTypes'

describe('categories', () => {
  it('returns an initial state if no state or action is given', () => {
    expect(categories(undefined, { payload: {} })).toBe(initialState)
  })

  it('adds new categories', () => {
    const newCategory = { id: '345', label: 'Derp' }
    const newState = categories(initialState, {
      type: types.ADD_CATEGORY,
      payload: newCategory
    })

    expect(newState.byId).toHaveProperty('345')
    expect(newState.allIds.length).toBe(1)
  })

  it('deletes categories', () => {
    const categoryToDelete = { id: '345' }
    const basicState = {
      byId: { '345': { id: '345', label: 'Derp' } },
      allIds: ['345']
    }
    const newState = categories(basicState, {
      type: types.DELETE_CATEGORY,
      payload: categoryToDelete
    })

    expect(newState.byId).not.toHaveProperty('345')
    expect(newState.allIds.length).toBeLessThan(basicState.allIds.length)
  })

  it('updates category', () => {
    const basicState = {
      byId: { '345': { id: '345', label: 'Derp' } },
      allIds: ['345']
    }
    const newState = categories(basicState, {
      type: types.UPDATE_CATEGORY,
      payload: { id: '345', label: 'yarp' }
    })

    expect(newState.byId['345'].label).toEqual('yarp')
    expect(newState.allIds.length).toBe(basicState.allIds.length)
  })

  it('adds areas to categories', () => {
    const basicState = {
      byId: { '345': { id: '345', areas: [] } },
      allIds: ['345']
    }
    const newArea = { id: '51', label: 'lemmings' }
    const newState = categories(basicState, {
      type: types.ADD_AREA_TO_CATEGORY,
      payload: { area: newArea, categoryId: '345' }
    })

    expect(newState.byId['345'].areas).toHaveLength(1)
    expect(newState.byId['345'].areas).toContain(newArea.id)
  })

  it('deletes areas in categories', () => {
    const basicState = {
      byId: { '345': { id: '345', areas: ['51'] } },
      allIds: ['345']
    }

    const newState = categories(basicState, {
      type: types.DELETE_AREA,
      payload: {
        area: {
          id: '51',
          label: 'lemmings'
        },
        categoryId: '345'
      }
    })

    expect(newState.byId['345'].areas).toHaveLength(0)
  })
})
