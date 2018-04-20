import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import {
  addAreaToCategory,
  updateAreaInCategory,
  deleteArea
} from '../reducers/categories.reducer'
import { connect } from 'react-redux'
import Area from '../lib/Area'

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogTitle: 'Add Area',
      areaLabel: ''
    }

    this.handleTyping = this.handleTyping.bind(this)
    this.submitAreaForm = this.submitAreaForm.bind(this)
    this.handleDeletingArea = this.handleDeletingArea.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.areaId !== this.props.areaId &&
      nextProps.formOpen !== this.props.formOpen
    ) {
      if (nextProps.areaId && nextProps.area.label) {
        this.setState({
          dialogTitle: `Edit ${nextProps.area.label}`,
          areaLabel: nextProps.area.label
        })
      } else {
        this.setState({
          dialogTitle: 'Add Area',
          areaLabel: ''
        })
      }
    }
  }

  handleTyping(val) {
    this.setState({
      ...this.state,
      areaLabel: val
    })
  }

  submitAreaForm() {
    const {
      area,
      areaId,
      toggleForm,
      addAreaToCategory,
      updateAreaInCategory,
      categoryId
    } = this.props

    if (!this.state.areaLabel) {
      toggleForm()
    } else {
      const newArea = { ...area, label: this.state.areaLabel }
      if (areaId) {
        updateAreaInCategory(newArea, categoryId)
      } else {
        addAreaToCategory(newArea, categoryId)
      }
    }
    toggleForm()
  }

  handleDeletingArea() {
    this.props.deleteArea(this.props.area, this.props.categoryId)
    this.props.toggleForm()
  }

  render() {
    const { formOpen, toggleForm, areaId } = this.props
    return (
      <Dialog open={formOpen} onClose={() => toggleForm()}>
        <DialogTitle id="add-category-title">
          {this.state.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder="New area..."
            autoFocus={true}
            value={this.state.areaLabel}
            onChange={e => this.handleTyping(e.target.value)}
            onKeyUp={e => (e.key === 'Enter' ? this.submitAreaForm() : null)}
          />
        </DialogContent>
        <DialogActions>
          {areaId && (
            <Button
              aria-label="Delete"
              color="secondary"
              onClick={this.handleDeletingArea}>
              Delete
            </Button>
          )}
          <Button onClick={() => toggleForm()} color="primary">
            Close
          </Button>
          <Button
            onClick={this.submitAreaForm}
            variant="raised"
            color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export default connect(
  (state, ownProps) => {
    const currentArea =
      ownProps.categoryId && ownProps.areaId
        ? state.categories
            .filter(cat => cat.id === ownProps.categoryId)[0]
            .areas.filter(area => area.id === ownProps.areaId)[0]
        : new Area()
    return {
      area: currentArea,
      categories: state.categories
    }
  },
  { addAreaToCategory, updateAreaInCategory, deleteArea }
)(CategoryForm)
