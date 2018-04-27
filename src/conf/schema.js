import { schema } from 'normalizr'

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
const task = new schema.Entity('tasks', {
  area: area,
  category: category
})

export default { tasks: [task], categories: [category] }
