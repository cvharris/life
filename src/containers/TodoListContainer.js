import React, { Component } from 'react'
import Grid from 'material-ui/Grid'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import Typography from 'material-ui/Typography'
import TodoList from '../components/TodoList'

export default class TodoListContainer extends Component {
  render() {
    return (
      <Grid container className="todo-app" spacing={16}>
        <AppBar position="static" color="default">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Life<small className="app-subtitle">
                <em>"Oh my life!"</em>
              </small>
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container className="todo-app" spacing={16}>
          <Grid item xs={6}>
            <TodoList />
          </Grid>
        </Grid>
      </Grid>
    )
  }
}
