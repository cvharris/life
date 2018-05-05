import sessions, { initialState } from './sessions.reducer'
import * as types from '../conf/ActionTypes'

describe('sessions', () => {
  it('handles an unknow action', () => {
    expect(sessions(undefined, { type: '', payload: {} })).toBe(initialState)
  })

  it('handles adding sessions', () => {
    const newSession = {
      id: '999',
      summary: 'Nina sensitivity awareness class'
    }
    const newState = sessions(initialState, {
      type: types.ADD_SESSION,
      payload: newSession
    })

    expect(newState.byId).toHaveProperty('999')
    expect(newState.allIds).toContain('999')
  })

  it('handles updating sessions', () => {
    const updatedSession = {
      id: '999',
      summary: 'Wild Wizards Conference'
    }
    const baseState = {
      byId: {
        '999': {
          id: '999',
          summary: 'Nina sensitivity awareness class'
        }
      },
      allIds: ['999']
    }
    const newState = sessions(baseState, {
      type: types.UPDATE_SESSION,
      payload: updatedSession
    })

    expect(newState.byId['999'].summary).toBe('Wild Wizards Conference')
  })

  it('deletes sessions', () => {
    const baseState = {
      byId: {
        '999': {
          id: '999',
          summary: 'Nina sensitivity awareness class'
        }
      },
      allIds: ['999']
    }
    const newState = sessions(baseState, {
      type: types.DELETE_SESSION,
      payload: '999'
    })

    expect(newState.byId).not.toHaveProperty('999')
    expect(newState.allIds).not.toContain('999')
  })
})
