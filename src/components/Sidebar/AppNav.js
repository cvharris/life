import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import BookIcon from '@material-ui/icons/Book'
import ClearAllIcon from '@material-ui/icons/ClearAll'
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck'
import TrendingUpIcon from '@material-ui/icons/TrendingUp'
import React from 'react'
import { Link } from 'react-router-dom'

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
