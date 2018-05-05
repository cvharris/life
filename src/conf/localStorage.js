import data from '../data'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('lifeStorage')
    if (serializedState === null) {
      return data
    }
    return JSON.parse(serializedState)
  } catch (err) {
    return undefined
  }
}

export const saveState = state => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('lifeStorage', serializedState)
  } catch (err) {
    console.error('could not save state!')
  }
}
