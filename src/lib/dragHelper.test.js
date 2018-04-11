import { moveDown, moveFromBottom, moveFromFirst, moveUp } from './dragHelper'

const list = [1, 2, 3, 4, 5, 6]

test('moving from middle up to middle', () => {
  const firstIndex = 3
  const newPosition = 2

  expect(moveUp(list, newPosition, firstIndex)).toMatchObject([1, 2, 4, 3, 5, 6])
})

test('moving from middle down to middle', () => {
  const firstIndex = 2
  const newPosition = 3

  expect(moveDown(list, newPosition, firstIndex)).toMatchObject([1, 2, 4, 3, 5, 6])
})

test('moving from beginning to middle', () => {
  const newPosition = 2

  expect(moveFromFirst(list, newPosition)).toMatchObject([2, 3, 1, 4, 5, 6])
})

test('moving from bottom to middle', () => {
  const firstIndex = 5
  const newPosition = 2

  expect(moveFromBottom(list, newPosition, firstIndex)).toMatchObject([1, 2, 6, 3, 4, 5])
})
