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
    this.handleCategoryUpdate = this.handleCategoryUpdate.bind(this)
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

  handleCategoryUpdate(evt) {
    const value = evt.target.value
    const mappedCategories = value.map(val =>
      this.props.categories.find(cat => cat.label === val)
    )
    this.props.updateTodo({ ...this.props.todo, categories: mappedCategories })
  }

  addAnotherTodo() {
    const newTodo = new Todo()
    this.props.toggleFormOpen(newTodo, true)
    this.props.addTodo(newTodo)
  }

  render() {
    const { todo, formOpen, closeModal } = this.props
    const categories = this.props.categories ? this.props.categories : []

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
            multiple={true}
            onChange={this.handleCategoryUpdate}
            value={
              todo.categories ? todo.categories.map(cat => cat.label) : []
            }>
            {categories.map((category, i) => (
              <MenuItem key={i} value={category.label}>
                {category.label}
              </MenuItem>
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
