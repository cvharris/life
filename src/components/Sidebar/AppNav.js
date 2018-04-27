import React from 'react'
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List'
import BookIcon from 'material-ui-icons/Book'
import ClearAllIcon from 'material-ui-icons/ClearAll'
import TrendingUpIcon from 'material-ui-icons/TrendingUp'
import PlaylistAddCheckIcon from 'material-ui-icons/PlaylistAddCheck'

export default ({ selectCategoryArea, tasksActive }) => {
  return (
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
        className={tasksActive ? 'nav-item selected' : 'nav-item'}
        onClick={() => selectCategoryArea(null, null)}>
        <ListItemIcon>
          <PlaylistAddCheckIcon />
        </ListItemIcon>
        <ListItemText primary="All Tasks" />
      </ListItem>
    </List>
  )
}
