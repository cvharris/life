import v4 from 'uuid/v4'

export default class Project {
  constructor(properties) {
    this.id = v4()
    this.description = ''
    this.category = null
    this.area = null
    this.type = null
    this.tasks = []
    this.createdOn = new Date().getTime()
    this.updatedOn = new Date().getTime()
    this.position = null
    Object.assign(this, properties)
  }
}
