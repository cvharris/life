import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import TextField from '@material-ui/core/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Category from '../../lib/Category'
import {
  addCategory,
  deleteCategory,
  updateCategory
} from '../../reducers/categories.reducer'
import SidebarContext from './SidebarContext'

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogTitle: 'Add Category',
      categoryLabel: ''
    }
  }

  componentWillReceiveProps(nextProps) {
    if (
      nextProps.categoryId !== this.props.categoryId &&
      nextProps.formOpen !== this.props.formOpen
    ) {
      if (nextProps.categoryId && nextProps.category.label) {
        this.setState({
          dialogTitle: `Edit ${nextProps.category.label}`,
          categoryLabel: nextProps.category.label
        })
      } else {
        this.setState({
          dialogTitle: 'Add Category',
          categoryLabel: ''
        })
      }
    }
  }

  handleTyping = val => {
    this.setState({
      ...this.state,
      categoryLabel: val
    })
  }

  submitCategoryForm = () => {
    const {
      category,
      toggleForm,
      addCategory,
      updateCategory,
      categoryId
    } = this.props

    if (!this.state.categoryLabel) {
      toggleForm()
    } else {
      const newCategory = { ...category, label: this.state.categoryLabel }
      if (categoryId) {
        updateCategory(newCategory)
      } else {
        addCategory(newCategory)
      }
    }
    toggleForm()
  }

  handleDeletingCategory = () => {
    this.props.deleteCategory(this.props.category)
    this.props.toggleForm()
  }

  render() {
    const { formOpen, toggleForm, categoryId } = this.props
    return (
      <Dialog open={formOpen} onClose={() => toggleForm()}>
        <DialogTitle id="add-category-title">
          {this.state.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <TextField
            placeholder="New category..."
            autoFocus={true}
            value={this.state.categoryLabel}
            onChange={e => this.handleTyping(e.target.value)}
            onKeyUp={e =>
              e.key === 'Enter' ? this.submitCategoryForm() : null
            }
          />
        </DialogContent>
        <DialogActions>
          {categoryId && (
            <Button
              aria-label="Delete"
              color="secondary"
              onClick={this.handleDeletingCategory}>
              Delete
            </Button>
          )}
          <Button onClick={() => toggleForm()} color="primary">
            Close
          </Button>
          <Button
            onClick={this.submitCategoryForm}
            variant="raised"
            color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export const ContextualizedCategoryForm = props => (
  <SidebarContext.Consumer>
    {({ categoryFormOpen, toggleCategoryForm }) => (
      <CategoryForm
        {...props}
        formOpen={categoryFormOpen}
        toggleForm={toggleCategoryForm}
      />
    )}
  </SidebarContext.Consumer>
)

export default connect(
  (state, ownProps) => {
    const currentCategory = ownProps.categoryId
      ? state.categories.byId[ownProps.categoryId]
      : new Category()
    return {
      category: currentCategory
    }
  },
  { addCategory, updateCategory, deleteCategory }
)(ContextualizedCategoryForm)
