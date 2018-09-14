import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Todo from '../lib/Todo'
import { addTodo, updateTodo } from '../reducers/tasks.reducer'
import { closeModal, toggleFormOpen } from '../reducers/todoForm.reducer'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      task: this.setupForm()
    }
    this.descriptionField = null

    this.updateText = this.updateText.bind(this)
    this.submitForm = this.submitForm.bind(this)
    this.handleAreaUpdate = this.handleAreaUpdate.bind(this)
    this.setupForm = this.setupForm.bind(this)
  }

  componentWillReceiveProps(newProps) {
    const taskToSet = newProps.taskId
      ? this.props.tasks[newProps.taskId]
      : this.setupForm()
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
        area: areaId,
        category: category.id
      }
    })
  }

  setupForm() {
    const { currentFilter } = this.props
    const properties = {}
    properties.area = currentFilter.area
    properties.category = currentFilter.category
    return new Todo(properties)
  }

  submitForm() {
    if (this.props.taskId) {
      this.props.updateTodo(this.state.task)
      this.props.closeModal()
    } else {
      this.props.addTodo(this.state.task)
    }
    this.setState({
      task: this.setupForm()
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
            value={task.area ? task.area : ''}>
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
    categoryIds: state.categories.allIds,
    currentFilter: state.currentFilter
  }),
  { closeModal, updateTodo, addTodo, toggleFormOpen }
)(TodoForm)
