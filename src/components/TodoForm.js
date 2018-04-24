import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { connect } from 'react-redux'
import { addTodo, updateTodo } from '../reducers/tasks.reducer'
import { closeModal, toggleFormOpen } from '../reducers/todoForm.reducer'
import Select from 'material-ui/Select'
import Todo from '../lib/Todo'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: new Todo()
    }
    this.descriptionField = null

    this.updateText = this.updateText.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleAreaUpdate = this.handleAreaUpdate.bind(this)
  }

  componentWillReceiveProps(newProps) {
    const taskToSet = newProps.taskId
      ? this.props.tasks[newProps.taskId]
      : new Todo()
    this.setState({
      task: taskToSet
    })
  }

  updateText(evt) {
    this.setState({
      task: { ...this.state.task, description: evt.target.value }
    })
  }

  handleAreaUpdate(evt) {
    const areaId = evt.target.value
    const area = this.props.areas[areaId]
    const category = this.props.categories[area.category]

    this.setState({
      task: {
        ...this.state.task,
        area: { id: area.id, label: area.label },
        category: { id: category.id, label: category.label }
      }
    })
  }

  submitForm() {
    if (this.props.taskId) {
      this.props.updateTodo(this.state.task)
      this.props.closeModal()
    } else {
      this.props.addTodo(this.state.task)
    }
    this.setState({
      task: new Todo()
    })
  }

  render() {
    const {
      taskId,
      formOpen,
      closeModal,
      areas,
      categories,
      categoryIds
    } = this.props
    const { task } = this.state
    const submitText = taskId ? 'Save' : 'Save & Add Another'

    return (
      <Dialog
        aria-labelledby="add-todo-title"
        open={formOpen}
        onClose={closeModal}>
        <DialogTitle id="add-todo-title">Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Have to do..."
            value={task.description}
            fullWidth
            autoFocus={true}
            onChange={this.updateText}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                if (!task.description) {
                  closeModal()
                } else {
                  this.submitForm()
                }
              }
            }}
            margin="normal"
          />
          <Select
            native
            onChange={this.handleAreaUpdate}
            value={task.area ? task.area.id : ''}>
            <option value="">-- Pick an Area --</option>
            {categoryIds.map(categoryId => {
              const category = categories[categoryId]
              return (
                <optgroup key={categoryId} label={category.label}>
                  {category.areas.map(areaId => {
                    const area = areas[areaId]
                    return (
                      <option key={areaId} value={areaId}>
                        {area.label}
                      </option>
                    )
                  })}
                </optgroup>
              )
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
          <Button onClick={this.submitForm} variant="raised" color="primary">
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  state => ({
    taskId: state.todoForm.todo,
    tasks: state.tasks.byId,
    formOpen: state.todoForm.formOpen,
    areas: state.areas,
    categories: state.categories.byId,
    categoryIds: state.categories.allIds
  }),
  { closeModal, updateTodo, addTodo, toggleFormOpen }
)(TodoForm)
