import areas, { initialState } from './areas.reducer'
import * as types from '../conf/ActionTypes'

describe('areas reducer', () => {
  it('returns initial state when no type or payload passed', () => {
    expect(areas(undefined, { payload: {} })).toBe(initialState)
  })

  it('adds areas', () => {
    const newState = areas(initialState, {
      type: types.ADD_AREA_TO_CATEGORY,
      payload: { categoryId: '3456', area: { id: '51', label: 'Derp' } }
    })

    expect(newState).toHaveProperty('51')
  })

  it('udpates an area', () => {
    const basicState = { '51': { id: '51', label: 'Derp', category: '3456' } }
    const newState = areas(basicState, {
      type: types.UPDATE_AREA,
      payload: { area: { id: '51', label: 'yarp' } }
    })

    expect(newState['51'].label).toBe('yarp')
  })

  it('deletes an area', () => {
    const basicState = { '51': { id: '51', label: 'Derp', category: '3456' } }
    const newState = areas(basicState, {
      type: types.DELETE_AREA,
      payload: { area: { id: '51' } }
    })

    expect(newState).not.toHaveProperty('51')
  })
})
