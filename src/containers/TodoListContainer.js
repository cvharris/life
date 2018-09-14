import Button from '@material-ui/core/Button'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { withStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import AddIcon from '@material-ui/icons/Add'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import TodoForm from '../components/TodoForm'
import TodoList from '../components/TodoList'
import { filterTasks } from '../reducers/currentFilter.reducer'
import { addTodo } from '../reducers/tasks.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'
// import TodoTable from '../components/TodoTable/TodoTable'

const styles = theme => ({
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minWidth: 0 // So the Typography noWrap works
  },
  toolbar: theme.mixins.toolbar
})

class TodoListContainer extends Component {
  addTodo = () => {
    this.props.toggleFormOpen(undefined, true)
  }

  render() {
    // return <TodoTable />
    const { classes, filteringComplete, filterTasks } = this.props

    return (
      <div id="task-container">
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
        <TodoList />
        <TodoForm />
        <Button
          variant="fab"
          id="add-task-button"
          color="primary"
          onClick={this.addTodo}>
          <AddIcon />
        </Button>
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
)(TodoListContainer)
