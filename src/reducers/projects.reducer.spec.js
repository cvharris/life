import projects, { initialState } from './projects.reducer'
import * as types from '../conf/ActionTypes'

describe('projects', () => {
  it('handles undefined actions', () => {
    expect(projects(undefined, { type: '', payload: {} })).toBe(initialState)
  })

  it('adds projects', () => {
    const newState = projects(initialState, {
      type: types.ADD_PROJECT,
      payload: { id: '5467', description: 'Train Nina' }
    })

    expect(newState.byId).toHaveProperty('5467')
    expect(newState.allIds).toContain('5467')
  })

  it('updates projects', () => {
    const basicState = {
      byId: {
        '5467': { id: '5467', description: 'Train Nina' }
      },
      allIds: ['5467']
    }
    const newState = projects(basicState, {
      type: types.UPDATE_PROJECT,
      payload: { id: '5467', description: 'Teach Nina' }
    })

    expect(newState.byId['5467'].description).toBe('Teach Nina')
    expect(newState.allIds).toEqual(basicState.allIds)
  })

  it('deletes projects', () => {
    const basicState = {
      byId: {
        '5467': { id: '5467', description: 'Train Nina' }
      },
      allIds: ['5467']
    }
    const newState = projects(basicState, {
      type: types.DELETE_PROJECT,
      payload: '5467'
    })

    expect(newState.byId).not.toHaveProperty('5467')
    expect(newState.allIds).not.toContain('5467')
    expect(newState.allIds.length).toBeLessThan(basicState.allIds.length)
  })

  it('adds tasks to projects', () => {
    const basicState = {
      byId: {
        '5467': { id: '5467', description: 'Train Nina', tasks: [] }
      },
      allIds: ['5467']
    }
    const newState = projects(basicState, {
      type: types.ADD_TASK_TO_PROJECT,
      payload: { projectId: '5467', taskId: '123' }
    })

    expect(newState.byId['5467'].tasks).toContain('123')
  })

  it('removes tasks from projects', () => {
    const basicState = {
      byId: {
        '5467': { id: '5467', description: 'Train Nina', tasks: ['123'] }
      },
      allIds: ['5467']
    }
    const newState = projects(basicState, {
      type: types.REMOVE_TASK_FROM_PROJECT,
      payload: { projectId: '5467', taskId: '123' }
    })

    expect(newState.byId['5467'].tasks).not.toContain('123')
  })
})
