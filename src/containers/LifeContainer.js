import AppBar from '@material-ui/core/AppBar';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import PlannerContainer from '../containers/PlannerContainer';
import TodoListContainer from '../containers/TodoListContainer';


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
          <Route path="/" exact component={TodoListContainer} />
          <Route path="/planner" component={PlannerContainer} />
        </main>
      </div>
    )
  }
}

export default withStyles(styles)(LifeContainer)
