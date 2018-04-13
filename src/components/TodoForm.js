import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { connect } from 'react-redux'
import { addTodo } from '../reducers/todoList.reducer'
import { closeModal } from '../reducers/todoForm.reducer'
import Select from 'react-select'

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
    this.props.todo.description = evt.target.value
    this.props.updateTodoDescription(
      this.props.todo.id,
      this.props.todo.description
    )
  }

  handleTagUpdate(value) {
    console.log(value)
  }

  render() {
    const { todo, formOpen, closeModal, addTodo } = this.props
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
            onChange={this.updateText}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                if (!todo.description) {
                  closeModal()
                } else {
                  addTodo()
                }
              }
            }}
            margin="normal"
          />
          <Select.Creatable
            multi={true}
            options={categories}
            onChange={v => this.handleTagUpdate(v)}
            value={todo.categories}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeModal} color="primary">
            Close
          </Button>
          <Button onClick={closeModal} variant="raised" color="primary">
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
  { closeModal, addTodo }
)(TodoForm)
