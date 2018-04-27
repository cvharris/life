import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import AreaForm from '../AreaForm'
import CategoryForm from '../CategoryForm'
import { deleteCategory } from '../../reducers/categories.reducer'
import { filterTasks } from '../../reducers/currentFilter.reducer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AppNav from './AppNav'
import CategoryList from './CategoryList'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  toolbar: theme.mixins.toolbar
})

class Sidebar extends Component {
  constructor(props) {
    super(props)

    // TODO: rewrite this using React 16.3 Context API
    this.state = {
      currentCategoryId: null,
      categoryFormOpen: false,
      currentAreaId: null,
      areaFormOpen: false,
      areasOpen: true
    }

    this.toggleCategoryForm = this.toggleCategoryForm.bind(this)
    this.toggleAreaForm = this.toggleAreaForm.bind(this)
    this.selectCategoryArea = this.selectCategoryArea.bind(this)
  }

  toggleCategoryForm(categoryId) {
    this.setState({
      ...this.state,
      currentCategoryId: categoryId || null,
      categoryFormOpen: !this.state.categoryFormOpen
    })
  }

  toggleAreaForm(areaId, categoryId) {
    this.setState({
      ...this.state,
      currentCategoryId: categoryId || null,
      currentAreaId: areaId || null,
      areaFormOpen: !this.state.areaFormOpen
    })
  }

  selectCategoryArea(categoryId, areaId) {
    if (!categoryId && !areaId) {
      this.props.filterTasks({ category: null, area: null })
    } else {
      this.props.filterTasks({
        category: categoryId,
        area: areaId
      })
    }
  }

  render() {
    const { classes, categoryIds } = this.props
    const {
      category: selectedCategoryId,
      area: selectedAreaId
    } = this.props.currentFilter

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}>
        <div className={classes.toolbar} />
        <AppNav
          tasksActive={!selectedCategoryId && !selectedAreaId}
          selectCategoryArea={this.selectCategoryArea}
        />
        <Divider />
        <CategoryList
          categoryIds={categoryIds}
          selectCategoryArea={this.selectCategoryArea}
          toggleCategoryForm={this.toggleCategoryForm}
          toggleAreaForm={this.toggleAreaForm}
        />
        <CategoryForm
          categoryId={this.state.currentCategoryId}
          formOpen={this.state.categoryFormOpen}
          toggleForm={this.toggleCategoryForm}
        />
        <AreaForm
          areaId={this.state.currentAreaId}
          categoryId={this.state.currentCategoryId}
          formOpen={this.state.areaFormOpen}
          toggleForm={this.toggleAreaForm}
        />
      </Drawer>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      categoryIds: state.categories.allIds,
      currentFilter: state.currentFilter
    }),
    {
      deleteCategory,
      filterTasks
    }
  )
)(Sidebar)
