import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { compose } from 'redux'
import { connect } from 'react-redux'
import TodoList from '../components/TodoList'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import { FormControlLabel } from 'material-ui/Form'
import Switch from 'material-ui/Switch'
import TodoForm from '../components/TodoForm'
import { addTodo } from '../reducers/tasks.reducer'
import { toggleFormOpen } from '../reducers/todoForm.reducer'
import { filterTasks } from '../reducers/currentFilter.reducer'
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
