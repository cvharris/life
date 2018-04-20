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
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import ListSubheader from 'material-ui/List/ListSubheader'
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck'
import BookIcon from 'material-ui-icons/Book'
import ClearAllIcon from 'material-ui-icons/ClearAll'
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import CategoryForm from './CategoryForm'
import { deleteCategory } from '../reducers/categories.reducer'
import { compose } from 'redux'
import { connect } from 'react-redux'

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
      areaFormOpen: false
    }

    this.toggleCategoryForm = this.toggleCategoryForm.bind(this)
  }

  toggleCategoryForm(categoryId) {
    this.setState({
      ...this.state,
      currentCategoryId: categoryId || null,
      categoryFormOpen: !this.state.categoryFormOpen
    })
  }

  render() {
    const { classes, categories, deleteCategory } = this.props

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
          <ListItem button>
            <ListItemIcon>
              <PlaylistAddCheckIcon />
            </ListItemIcon>
            <ListItemText primary="All Tasks" />
          </ListItem>
        </List>
        <Divider />
        <List
          subheader={
            <ListSubheader component="div">
              Areas
              <IconButton onClick={() => this.toggleCategoryForm()}>
                <AddCircleOutlineIcon />
              </IconButton>
            </ListSubheader>
          }>
          {categories.map(category => (
            <ListItem key={category.id}>
              <ListItemText primary={category.label} />
              <ListItemSecondaryAction className="todo-actions">
                <IconButton
                  className="todo-edit"
                  aria-label="Edit"
                  onClick={() => this.toggleCategoryForm(category.id)}>
                  <EditIcon />
                </IconButton>
                <IconButton
                  className="todo-delete"
                  aria-label="Delete"
                  onClick={() => deleteCategory(category)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {/* TODO: Transform this to modal */}
        </List>
        <CategoryForm
          categoryId={this.state.currentCategoryId}
          formOpen={this.state.categoryFormOpen}
          toggleForm={this.toggleCategoryForm}
        />
      </Drawer>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({ categories: state.categories }), { deleteCategory })
)(Sidebar)
