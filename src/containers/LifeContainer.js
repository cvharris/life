import React, { Component } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import Todo from '../lib/Todo'
import { withStyles } from 'material-ui/styles'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import Button from 'material-ui/Button'
import AddIcon from 'material-ui-icons/Add'
import TodoForm from '../components/TodoForm'
import TodoListContainer from '../containers/TodoListContainer'
import Sidebar from '../components/Sidebar'
import { toggleFormOpen } from '../reducers/todoForm.reducer'

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
    const newTodo = new Todo()

    this.props.toggleFormOpen(newTodo, true)
  }

  render() {
    const { classes } = this.props
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
          <TodoListContainer />
          <TodoForm />
          <Button
            variant="fab"
            id="add-todo-button"
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
  connect(state => ({}), { toggleFormOpen })
)(LifeContainer)
