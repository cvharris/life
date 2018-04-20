import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Category from '../lib/Category'
import Button from 'material-ui/Button'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { addCategory, updateCategory } from '../reducers/categories.reducer'
import { connect } from 'react-redux'

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      dialogTitle: 'Add Category',
      categoryLabel: ''
    }

    this.handleTyping = this.handleTyping.bind(this)
    this.submitCategoryForm = this.submitCategoryForm.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.categoryId !== this.props.categoryId) {
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

  handleTyping(val) {
    this.setState({
      ...this.state,
      categoryLabel: val
    })
  }

  submitCategoryForm() {
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

  render() {
    const { formOpen, toggleForm } = this.props
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

export default connect(
  (state, ownProps) => {
    const currentCategory = ownProps.categoryId
      ? state.categories.filter(cat => cat.id === ownProps.categoryId)[0]
      : new Category()
    return {
      category: currentCategory,
      categories: state.categories
    }
  },
  { addCategory, updateCategory }
)(CategoryForm)
