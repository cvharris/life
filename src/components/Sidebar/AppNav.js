import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import BookIcon from 'material-ui-icons/Book'
import ClearAllIcon from 'material-ui-icons/ClearAll'
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import { Link } from 'react-router-dom'
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck'

export default ({ selectCategoryArea, tasksActive }) => {
  return (
    <List component="nav">
      <Link to="/planner">
        <ListItem button>
          <ListItemIcon>
            <BookIcon />
          </ListItemIcon>
          <ListItemText primary="Planner" />
        </ListItem>
      </Link>
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
      <Link to="/" onClick={() => selectCategoryArea(null, null)}>
        <ListItem
          button
          className={tasksActive ? 'nav-item selected' : 'nav-item'}>
          <ListItemIcon>
            <PlaylistAddCheckIcon />
          </ListItemIcon>
          <ListItemText primary="All Tasks" />
        </ListItem>
      </Link>
    </List>
  )
}
