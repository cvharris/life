import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import AreaForm from './AreaForm'
import CategoryForm from './CategoryForm'
import { deleteCategory } from '../../reducers/categories.reducer'
import { filterTasks } from '../../reducers/currentFilter.reducer'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AppNav from './AppNav'
import CategoryList from './CategoryList'
import ProjectsList from './ProjectsList'
import ProjectForm from './ProjectForm'
import SidebarContext from './SidebarContext'

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

    this.state = {
      currentCategoryId: null,
      categoryFormOpen: false,
      currentAreaId: null,
      areaFormOpen: false,
      currentProjectId: null,
      projectFormOpen: false,
      toggleCategoryForm: this.toggleCategoryForm,
      toggleAreaForm: this.toggleAreaForm,
      toggleProjectForm: this.toggleProjectForm,
      selectCategoryArea: this.selectCategoryArea,
      selectProject: this.selectProject
    }
  }

  toggleCategoryForm = categoryId => {
    this.setState(state => ({
      currentCategoryId: categoryId || null,
      categoryFormOpen: !this.state.categoryFormOpen
    }))
  }

  toggleAreaForm = (areaId, categoryId) => {
    this.setState({
      ...this.state,
      currentCategoryId: categoryId || null,
      currentAreaId: areaId || null,
      areaFormOpen: !this.state.areaFormOpen
    })
  }

  selectCategoryArea = (categoryId, areaId) => {
    if (!categoryId && !areaId) {
      this.props.filterTasks({ category: null, area: null })
    } else {
      this.props.filterTasks({
        category: categoryId,
        area: areaId
      })
    }
  }

  toggleProjectForm = projectId => {
    this.setState(state => ({
      currentProjectId: projectId,
      projectFormOpen: !state.projectFormOpen
    }))
  }

  selectProject = projectId => {
    if (!projectId) {
      // TODO: filter tasks by project
    }
  }

  render() {
    const { classes, categoryIds } = this.props
    const {
      category: selectedCategoryId,
      area: selectedAreaId
    } = this.props.currentFilter

    return (
      <SidebarContext.Provider value={this.state}>
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
          <CategoryList categoryIds={categoryIds} />
          <Divider />
          <ProjectsList />
          <CategoryForm categoryId={this.state.currentCategoryId} />
          <AreaForm
            areaId={this.state.currentAreaId}
            categoryId={this.state.currentCategoryId}
          />
          <ProjectForm projectId={this.state.currentProjectId} />
        </Drawer>
      </SidebarContext.Provider>
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
