import { moveDown, moveFromBottom, moveFromFirst, moveUp } from './dragHelper'

const list = [1, 2, 3, 4, 5]

test('moving from middle up to near sibling middle', () => {
  const begin = 3
  const end = 2

  expect(moveUp(list, end, begin)).toMatchObject([1, 2, 4, 3, 5])
})

test('moving from middle down to near sibling middle', () => {
  const begin = 2
  const end = 3

  expect(moveDown(list, end, begin)).toMatchObject([1, 2, 4, 3, 5])
})

test('moving from beginning to middle', () => {
  const end = 2

  expect(moveFromFirst(list, end)).toMatchObject([2, 3, 1, 4, 5])
})

test('moving from bottom to middle', () => {
  const begin = 4
  const end = 2

  expect(moveFromBottom(list, end, begin)).toMatchObject([1, 2, 5, 3, 4])
})
