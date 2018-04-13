import v4 from 'uuid/v4'

export default class Todo {
  constructor(properties) {
    this.id = v4()
    this.description = ''
    this.isComplete = false
    this.categories = []
    this.createdOn = new Date().getTime()
    this.updatedOn = new Date().getTime()
    this.position = null
    Object.assign(this, properties)
  }
}
