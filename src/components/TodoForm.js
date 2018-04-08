import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'

export class TodoForm extends Component {
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
    this.props.updateTodo(this.props.todo)
  }

  render() {
    const { todo, handleModalClose, modalOpen } = this.props

    if (!todo) {
      return <div className="todo-form">No todos yet</div>
    }

    return (
      <Dialog
        aria-labelledby="add-todo-title"
        open={modalOpen}
        onClose={handleModalClose}
      >
        <DialogTitle id="add-todo-title">Add Todo</DialogTitle>
        <DialogContent>
          <TextField
            inputRef={this.setDescriptionFieldRef}
            placeholder="Have to do..."
            value={todo.description}
            onChange={this.updateText}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleModalClose} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
