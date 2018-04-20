import v4 from 'uuid/v4'

export default class Area {
  constructor(properties) {
    this.id = v4()
    this.label = ''
    Object.assign(this, properties)
  }
}
