import moveTodo from './moveTodo'
import * as dragHelpers from './dragHelper'
jest.mock('./dragHelper', () => ({
  moveUp: jest.fn(),
  moveDown: jest.fn(),
  moveFromFirst: jest.fn(),
  moveFromBottom: jest.fn()
}))

const list = [1, 2, 3, 4, 5]

test('calls moveUp when newIndex is greater than firstIndex', () => {
  moveTodo(list, 2, 3)

  expect(dragHelpers.moveUp).toHaveBeenCalledWith(list, 2, 3)
})

test('calls moveDown when newIndex is greater than firstIndex', () => {
  moveTodo(list, 3, 2)

  expect(dragHelpers.moveDown).toHaveBeenCalledWith(list, 3, 2)
})

test('calls moveFromFirst when firstIndex is 0', () => {
  moveTodo(list, 3, 0)

  expect(dragHelpers.moveFromFirst).toHaveBeenCalledWith(list, 3)
})

test('calls moveFromBottom when firstIndex is the length of the list', () => {
  moveTodo(list, 2, 4)

  expect(dragHelpers.moveFromBottom).toHaveBeenCalledWith(list, 2, 4)
})
