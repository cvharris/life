import v4 from 'uuid/v4'

export default class Todo {
  constructor(properties) {
    this.id = v4()
    this.description = ''
    this.isComplete = false
    this.category = null
    this.area = null
    this.type = null
    this.project = null
    this.dueWhen = null
    this.createdOn = new Date().getTime()
    this.updatedOn = new Date().getTime()
    this.position = null
    Object.assign(this, properties)

    // TODO: temporary cleanup
    this.state = this.isComplete ? 2 : 0
  }
}
