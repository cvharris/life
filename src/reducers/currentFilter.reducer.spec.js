import filter, { initialState } from './currentFilter.reducer'
import * as types from '../conf/ActionTypes'

describe('filter reducer', () => {
  it('returns initial state if type is undefined', () => {
    expect(filter(undefined, { type: '', payload: {} })).toBe(initialState)
  })

  it('sets the filter', () => {
    const filterAction = {
      type: types.FILTER_TASKS,
      payload: { type: 'AREAS', val: '51' }
    }
    const newState = filter(initialState, filterAction)

    expect(newState.type).toBe('AREAS')
    expect(newState.val).toBe('51')
  })
})
