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
  area: area
})
const session = new schema.Entity('sessions', {
  area: area,
  tasks: [task]
})
const project = new schema.Entity('projects', {
  tasks: [task]
})

export default {
  tasks: [task],
  categories: [category],
  projects: [project],
  sessions: [session]
}
