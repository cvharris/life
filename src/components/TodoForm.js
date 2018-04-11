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
    this.props.updateTodoDescription(
      this.props.todo.id,
      this.props.todo.description
    )
  }

  render() {
    const { todo, handleModalClose, modalOpen, addAnotherTodo } = this.props

    if (!todo) {
      return <div className="todo-form">No todos yet</div>
    }

    return (
      <Dialog
        aria-labelledby="add-todo-title"
        open={modalOpen}
        onClose={handleModalClose}>
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
                  handleModalClose()
                } else {
                  addAnotherTodo()
                }
              }
            }}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color="primary">
            Close
          </Button>
          <Button onClick={handleModalClose} variant="raised" color="primary">
            Add Another
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}
