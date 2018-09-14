import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Area from '../../lib/Area'
import { updateAreaInCategory } from '../../reducers/areas.reducer'
import {
  addAreaToCategory,
  deleteArea
} from '../../reducers/categories.reducer'
import SidebarContext from './SidebarContext'

class AreaForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogTitle: 'Add Area',
      areaLabel: ''
    }
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

  handleTyping = val => {
    this.setState({
      ...this.state,
      areaLabel: val
    })
  }

  submitAreaForm = () => {
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

  handleDeletingArea = () => {
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

export const ContextualizedAreaForm = props => (
  <SidebarContext.Consumer>
    {({ areaFormOpen, toggleAreaForm, currentCategoryId }) => (
      <AreaForm
        {...props}
        formOpen={areaFormOpen}
        toggleForm={toggleAreaForm}
        categoryId={currentCategoryId}
      />
    )}
  </SidebarContext.Consumer>
)

export default connect(
  (state, ownProps) => {
    const currentArea = ownProps.areaId
      ? state.areas[ownProps.areaId]
      : new Area()
    return {
      area: currentArea
    }
  },
  { addAreaToCategory, updateAreaInCategory, deleteArea }
)(ContextualizedAreaForm)
