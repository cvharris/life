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
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
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
        <List subheader={<ListSubheader component="div">Areas</ListSubheader>}>
          {categories.map(category => (
            <ListItem key={category.id}>
              <ListItemText primary={category.label} />
              <ListItemSecondaryAction className="todo-actions">
                {/* TODO: add edit categories */}
                {/* <IconButton
                  className="todo-edit"
                  aria-label="Edit"
                  onClick={() => toggleFormOpen(todo)}>
                  <EditIcon />
                </IconButton> */}
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
          <ListItem key="category-form">
            <CategoryForm />
          </ListItem>
        </List>
      </Drawer>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({ categories: state.categories }), { deleteCategory })
)(Sidebar)
