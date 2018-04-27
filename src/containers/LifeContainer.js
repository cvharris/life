import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import TodoForm from '../components/TodoForm'
import TodoListContainer from '../containers/TodoListContainer'
import Sidebar from '../components/Sidebar'
import { addTodo } from '../reducers/tasks.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'
import { filterTasks } from '../reducers/currentFilter.reducer'

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    overflow: 'hidden',
    position: 'relative',
    display: 'flex',
    height: '100vh'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
})

class LifeContainer extends Component {
  constructor(props) {
    super(props)

    this.addTodo = this.addTodo.bind(this)
  }

  addTodo() {
    this.props.toggleFormOpen(undefined, true)
  }

  render() {
    const { classes, filteringComplete, filterTasks } = this.props
    return (
      <div className={classes.root}>
        <AppBar position="absolute" className={classes.appBar} color="primary">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Life<small className="app-subtitle">
                <em>"Oh my life!"</em>
              </small>
            </Typography>
          </Toolbar>
        </AppBar>
        <Sidebar />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <div className={classes.toolbar}>
            <FormControlLabel
              control={
                <Switch
                  checked={filteringComplete === null}
                  onChange={e =>
                    filterTasks({
                      isComplete: e.target.checked === true ? null : false
                    })
                  }
                  value="filteringComplete"
                  color="primary"
                />
              }
              label="Show Completed"
            />
          </div>
          <TodoListContainer />
          <TodoForm />
          <Button
            variant="fab"
            id="add-task-button"
            color="primary"
            onClick={this.addTodo}>
            <AddIcon />
          </Button>
        </main>
      </div>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(
    state => ({
      filteringComplete: state.currentFilter.isComplete
    }),
    { toggleFormOpen, addTodo, filterTasks }
  )
)(LifeContainer)
