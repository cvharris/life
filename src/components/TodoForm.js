import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { connect } from 'react-redux'
import { addTodo, updateTodo } from '../reducers/todoList.reducer'
import { closeModal, toggleFormOpen } from '../reducers/todoForm.reducer'
import { MenuItem } from 'material-ui/Menu'
import Select from 'material-ui/Select'
import Todo from '../lib/Todo'
import { getAreas } from '../selectors/area.selectors'

class TodoForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      oldId: ''
    }
    this.descriptionField = null

    this.setDescriptionFieldRef = element => {
      this.descriptionField = element
    }
    this.focusDescriptionField = this.focusDescriptionField.bind(this)
    this.updateText = this.updateText.bind(this)
    this.addAnotherTodo = this.addAnotherTodo.bind(this)
    this.handleAreaUpdate = this.handleAreaUpdate.bind(this)
  }

  componentDidUpdate() {
    if (this.props.todo && this.props.todo.id !== this.state.oldId) {
      this.setState({
        oldId: this.props.todo.id
      })
      setTimeout(() => {
        this.focusDescriptionField()
      }, 100)
    }
  }

  focusDescriptionField() {
    // Focus the text input using the raw DOM API
    if (this.descriptionField) this.descriptionField.focus()
  }

  updateText(evt) {
    this.props.updateTodo({ ...this.props.todo, description: evt.target.value })
  }

  handleAreaUpdate(evt) {
    const value = evt.target.value
    let mappedArea
    const category = this.props.categories.filter(cat => {
      if (mappedArea) {
        return false
      }
      mappedArea = cat.areas.find(area => area.label === value)
      return !!mappedArea
    })[0]
    this.props.updateTodo({
      ...this.props.todo,
      area: { ...mappedArea, category }
    })
  }

  addAnotherTodo() {
    const newTodo = new Todo()
    this.props.toggleFormOpen(newTodo, true)
    this.props.addTodo(newTodo)
  }

  render() {
    const { todo, formOpen, closeModal, categories } = this.props

    return (
      <Dialog
        aria-labelledby="add-todo-title"
        open={formOpen}
        onClose={closeModal}>
        <DialogTitle id="add-todo-title">Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={this.setDescriptionFieldRef}
            placeholder="Have to do..."
            value={todo.description}
            fullWidth
            onChange={this.updateText}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                if (!todo.description) {
                  closeModal()
                } else {
                  this.addAnotherTodo()
                }
              }
            }}
            margin="normal"
          />
          <Select
            native
            onChange={this.handleAreaUpdate}
            value={todo.area ? todo.area.label : ''}>
            <option value="">-- Pick an Area --</option>
            {categories.map(category => (
              <optgroup key={category.id} label={category.label}>
                {category.areas.map(area => (
                  <option key={area.id} value={area.label}>
                    {area.label}
                  </option>
                ))}
              </optgroup>
            ))}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
          <Button
            onClick={this.addAnotherTodo}
            variant="raised"
            color="primary">
            Add Another
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  state => ({
    todo: state.todoForm.todo,
    formOpen: state.todoForm.formOpen,
    categories: state.categories
  }),
  { closeModal, updateTodo, addTodo, toggleFormOpen }
)(TodoForm)
