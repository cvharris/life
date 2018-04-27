import tasks, { initialState } from './tasks.reducer'
import * as types from '../conf/ActionTypes'

describe('tasks', () => {
  it('should return the initial state when no state is given', () => {
    expect(tasks(undefined, { payload: undefined })).toEqual(initialState)
  })

  it('should add tasks', () => {
    const newTask = { id: '5678', description: 'derp' }
    const newState = tasks(initialState, {
      type: types.ADD_TODO,
      payload: newTask
    })

    expect(newState.allIds).toContain(newTask.id)
    expect(newState.byId).toHaveProperty(newTask.id)
  })

  it('should update an individual task', () => {
    const basicState = {
      allIds: ['5678'],
      byId: { '5678': { id: '5678', description: 'derp' } }
    }
    const newState = tasks(basicState, {
      type: types.UPDATE_TODO,
      payload: { id: '5678', description: 'yarp' }
    })
    expect(newState.byId['5678'].description).toBe('yarp')
    expect(newState.allIds).toEqual(basicState.allIds)
  })

  it('should delete tasks, with extreme prejudice', () => {
    const basicState = {
      allIds: ['5678', '3456'],
      byId: {
        '5678': { id: '5678', description: 'derp', position: 0 },
        '3456': { id: '3456', description: 'yarp', position: 1 }
      }
    }
    const newState = tasks(basicState, {
      type: types.DELETE_TODO,
      payload: '5678'
    })
    expect(newState.byId).not.toHaveProperty('5678')
    expect(newState.allIds.length).toBe(1)
    expect(newState.byId['3456'].position).toBe(0)
    // TODO: could be more robust by looping through whole state and comparing index to position
  })

  describe('moving tasks', () => {
    let basicState

    beforeEach(() => {
      basicState = {
        allIds: [1, 2, 3, 4, 5],
        byId: {
          1: { id: 1, position: 0 },
          2: { id: 2, position: 1 },
          3: { id: 3, position: 2 },
          4: { id: 4, position: 3 },
          5: { id: 5, position: 4 }
        }
      }
    })

    test('moving from middle up to near sibling middle', () => {
      const dragId = 3
      const hoverId = 2

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 3, 2, 4, 5])
      expect(newState.byId[dragId].position).toBe(1)
      expect(newState.byId[hoverId].position).toBe(2)
    })

    test('moving from middle down to near sibling middle', () => {
      const dragId = 2
      const hoverId = 3

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 3, 2, 4, 5])
      expect(newState.byId[dragId].position).toBe(2)
      expect(newState.byId[hoverId].position).toBe(1)
    })

    test('moving from middle up to far middle', () => {
      const dragId = 4
      const hoverId = 2

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 4, 2, 3, 5])
      expect(newState.byId[dragId].position).toBe(1)
      expect(newState.byId[hoverId].position).toBe(2)
    })

    test('moving from middle down to far middle', () => {
      const dragId = 2
      const hoverId = 4

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 3, 4, 2, 5])
      expect(newState.byId[dragId].position).toBe(3)
      expect(newState.byId[hoverId].position).toBe(2)
    })

    test('moving from top to middle', () => {
      const dragId = 1
      const hoverId = 3

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([2, 3, 1, 4, 5])
      expect(newState.byId[dragId].position).toBe(2)
      expect(newState.byId[hoverId].position).toBe(1)
    })

    test('moving from bottom up middle', () => {
      const dragId = 5
      const hoverId = 3

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 2, 5, 3, 4])
      expect(newState.byId[dragId].position).toBe(2)
      expect(newState.byId[hoverId].position).toBe(3)
    })

    test('moving from bottom up middle', () => {
      const dragId = 5
      const hoverId = 3

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 2, 5, 3, 4])
      expect(newState.byId[dragId].position).toBe(2)
      expect(newState.byId[hoverId].position).toBe(3)
    })

    test('moving from bottom up middle', () => {
      const dragId = 5
      const hoverId = 3

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 2, 5, 3, 4])
      expect(newState.byId[dragId].position).toBe(2)
      expect(newState.byId[hoverId].position).toBe(3)
    })

    test('moving from middle up to top', () => {
      const dragId = 3
      const hoverId = 1

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([3, 1, 2, 4, 5])
      expect(newState.byId[dragId].position).toBe(0)
      expect(newState.byId[hoverId].position).toBe(1)
    })

    test('moving from middle down to bottom', () => {
      const dragId = 3
      const hoverId = 5

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([1, 2, 4, 5, 3])
      expect(newState.byId[dragId].position).toBe(4)
      expect(newState.byId[hoverId].position).toBe(3)
    })

    test('moving from top to bottom', () => {
      const dragId = 1
      const hoverId = 5

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([2, 3, 4, 5, 1])
      expect(newState.byId[dragId].position).toBe(4)
      expect(newState.byId[hoverId].position).toBe(3)
    })

    test('moving from bottom to top', () => {
      const dragId = 5
      const hoverId = 1

      const newState = tasks(basicState, {
        type: types.MOVE_TODOS,
        payload: { dragId, hoverId }
      })

      expect(newState.allIds).toMatchObject([5, 1, 2, 3, 4])
      expect(newState.byId[dragId].position).toBe(0)
      expect(newState.byId[hoverId].position).toBe(1)
    })
  })
})
