import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import Drawer from 'material-ui/Drawer'
import Divider from 'material-ui/Divider'
import List, {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline'
import IconButton from 'material-ui/IconButton'
import EditIcon from 'material-ui-icons/Edit'
import AreaForm from './AreaForm'
import ListSubheader from 'material-ui/List/ListSubheader'
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck'
import BookIcon from 'material-ui-icons/Book'
import ClearAllIcon from 'material-ui-icons/ClearAll'
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import CategoryForm from './CategoryForm'
import { deleteCategory } from '../reducers/categories.reducer'
// import { filterTodos } from '../reducers/todoList.reducer'
import { compose } from 'redux'
import { connect } from 'react-redux'

const drawerWidth = 240

const styles = theme => ({
  drawerPaper: {
    position: 'relative',
    width: drawerWidth
  },
  nested: {
    paddingLeft: theme.spacing.unit * 2
  },
  toolbar: theme.mixins.toolbar
})

class Sidebar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      selectedCategoryId: null,
      selectedAreaId: null,
      currentCategoryId: null,
      categoryFormOpen: false,
      currentAreaId: null,
      areaFormOpen: false,
      areasOpen: true
    }

    this.toggleCategoryForm = this.toggleCategoryForm.bind(this)
    this.toggleAreaForm = this.toggleAreaForm.bind(this)
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

  selectedCategoryArea(categoryId, areaId) {
    this.setState({
      ...this.state,
      selectedCategoryId: categoryId,
      selectedAreaId: areaId
    })
    // this.props.filterTodos(categoryId, areaId)
  }

  render() {
    const { classes, areas, categories, categoryIds } = this.props
    const { selectedCategoryId, selectedAreaId } = this.state

    return (
      <Drawer
        variant="permanent"
        classes={{
          paper: classes.drawerPaper
        }}>
        <div className={classes.toolbar} />
        <List component="nav">
          <ListItem button>
            <ListItemIcon>
              <BookIcon />
            </ListItemIcon>
            <ListItemText primary="Planner" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ClearAllIcon />
            </ListItemIcon>
            <ListItemText primary="Workflows" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <TrendingUpIcon />
            </ListItemIcon>
            <ListItemText primary="Analytics" />
          </ListItem>
          <ListItem
            button
            className={
              !selectedCategoryId && !selectedAreaId
                ? 'nav-item selected'
                : 'nav-item'
            }
            onClick={() => this.selectedCategoryArea(null, null)}>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="All Tasks" />
          </ListItem>
        </List>
        <Divider />
        <List
          dense={true}
          disablePadding={true}
          subheader={
            <ListSubheader component="div">
              Categories & Areas
              <IconButton onClick={() => this.toggleCategoryForm()}>
                <AddCircleOutlineIcon />
              </IconButton>
            </ListSubheader>
          }>
          {categoryIds.map(categoryId => {
            const category = categories[categoryId]
            return (
              <div key={categoryId}>
                <ListItem
                  button
                  dense={true}
                  className={
                    selectedCategoryId === categoryId && !selectedAreaId
                      ? 'nav-item selected'
                      : 'nav-item'
                  }
                  onClick={() => this.selectedCategoryArea(categoryId, null)}>
                  <EditIcon
                    style={{ cursor: 'pointer' }}
                    onClick={() => this.toggleCategoryForm(categoryId)}
                  />
                  <ListItemText primary={category.label} />
                  <ListItemSecondaryAction className="todo-actions">
                    <ListItemIcon
                      onClick={() => this.toggleAreaForm(null, categoryId)}>
                      <AddCircleOutlineIcon />
                    </ListItemIcon>
                  </ListItemSecondaryAction>
                </ListItem>
                <List
                  dense={true}
                  disablePadding={true}
                  component="div"
                  className={classes.nested}>
                  {category.areas.map(areaId => {
                    const area = areas[areaId]
                    return (
                      <ListItem
                        button
                        key={areaId}
                        dense={true}
                        className={
                          selectedCategoryId === categoryId &&
                          selectedAreaId === areaId
                            ? 'nav-item selected'
                            : 'nav-item'
                        }
                        onClick={() =>
                          this.selectedCategoryArea(categoryId, areaId)
                        }>
                        <EditIcon
                          style={{ cursor: 'pointer' }}
                          onClick={() =>
                            this.toggleAreaForm(areaId, categoryId)
                          }
                        />
                        <ListItemText inset primary={area.label} />
                      </ListItem>
                    )
                  })}
                </List>
              </div>
            )
          })}
        </List>
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
      areas: state.areas,
      categoryIds: state.categories.allIds,
      categories: state.categories.byId
    }),
    {
      deleteCategory
    }
  )
)(Sidebar)
