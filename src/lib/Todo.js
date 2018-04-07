import v4 from 'uuid/v4'

export class Todo {
  constructor(properties) {
    this.id = v4()
    this.description = ''
    this.isComplete = false
  }
}
