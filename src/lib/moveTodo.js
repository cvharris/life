import { moveDown, moveFromBottom, moveFromFirst, moveUp } from './dragHelper'

export default (todos, newPosition, firstIndex) => {
  if (firstIndex === 0) {
    return moveFromFirst(todos, newPosition)
  } else if (firstIndex === todos.length - 1) {
    return moveFromBottom(todos, newPosition, firstIndex)
  } else if (firstIndex < newPosition) {
    return moveDown(todos, newPosition, firstIndex)
  } else if (firstIndex > newPosition) {
    return moveUp(todos, newPosition, firstIndex)
  }
}
