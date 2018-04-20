import React from 'react'
import classNames from 'classnames'
import Typography from 'material-ui/Typography'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import FilterListIcon from 'material-ui-icons/FilterList'
import Toolbar from 'material-ui/Toolbar'
import { withStyles } from 'material-ui/styles'
import { lighten } from 'material-ui/styles/colorManipulator'

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  spacer: {
    flex: '1 1 100%'
  },
  actions: {
    color: theme.palette.text.secondary
  },
  title: {
    flex: '0 0 auto'
  }
})

const TodoTableToolbar = props => {
  const { numSelected, classes } = props
  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0
      })}>
      <div className={classes.title}>
        {numSelected > 0 ? (
          <Typography color="inherit" variant="subheading">
            {numSelected} selected
          </Typography>
        ) : (
          <Typography variant="title">All Todos</Typography> // TODO: Change this to route title (Area, Type, Project)
        )}
      </div>
      <div className={classes.spacer} />
      <div className={classes.actions}>
        {numSelected > 0 ? (
          <IconButton aria-label="Delete">
            <DeleteIcon />
          </IconButton>
        ) : (
          <IconButton aria-label="Filter list">
            <FilterListIcon />
          </IconButton>
        )}
      </div>
    </Toolbar>
  )
}

export default withStyles(toolbarStyles)(TodoTableToolbar)
