import v4 from 'uuid/v4'

export default class Category {
  constructor(properties) {
    this.id = v4()
    this.label = ''
    this.areas = []
    Object.assign(this, properties)
  }
}
