import v4 from 'uuid/v4'

export default class Session {
  constructor(properties) {
    this.id = v4()
    this.summary = ''
    this.description = ''
    this.dtCompleted = null
    this.dtStart = null
    this.dtEnd = null
    this.dtDue = null
    this.duration = null
    this.isBusy = true
    this.area = null
    this.tasks = []
    Object.assign(this, properties)
  }
}
