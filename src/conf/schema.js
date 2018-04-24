import { schema } from 'normalizr'

const task = new schema.Entity('tasks')
const area = new schema.Entity(
  'areas',
  {},
  {
    processStrategy: (value, parent) => ({
      ...value,
      category: parent.id
    })
  }
)
const category = new schema.Entity('categories', {
  areas: [area]
})

export default { tasks: [task], categories: [category] }
