export function moveUp(todos, newPosition, firstIndex) {
  return [...todos.slice(0, newPosition), todos[firstIndex], todos[newPosition], ...todos.slice(firstIndex + 1)]
}

export function moveDown(todos, newPosition, firstIndex) {
  return [...todos.slice(0, firstIndex), todos[newPosition], todos[firstIndex], ...todos.slice(newPosition + 1)]
}
