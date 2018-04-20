import React, { Component } from 'react'
import TextField from 'material-ui/TextField'
import Category from '../lib/Category'
import { addCategory } from '../reducers/categories.reducer'
import { connect } from 'react-redux'

class CategoryForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      categoryLabel: ''
    }
    this.handleKeyup = this.handleKeyup.bind(this)
    this.handleTyping = this.handleTyping.bind(this)
  }

  handleTyping(e) {
    this.setState({
      categoryLabel: e.target.value
    })
  }

  handleKeyup(e) {
    if (e.key === 'Enter') {
      if (!this.state.categoryLabel) {
        return
      } else {
        this.props.addCategory(
          new Category({ label: this.state.categoryLabel })
        )
        this.setState({
          categoryLabel: ''
        })
      }
    }
  }
  render() {
    return (
      <TextField
        placeholder="New category..."
        value={this.state.categoryLabel}
        onChange={this.handleTyping}
        onKeyUp={this.handleKeyup}
      />
    )
  }
}

export default connect(state => ({}), { addCategory })(CategoryForm)
