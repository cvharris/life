import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { loadState } from './conf/localStorage'
import configureStore from './conf/store'
import LifeContainer from './containers/LifeContainer'
import lifeSchema from './conf/schema'
// import data from './data' // NOTE: Use this instead of persisted state for testing
import { normalize } from 'normalizr'
import { BrowserRouter as Router } from 'react-router-dom'

export default class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isStoreLoading: true,
      state: null
    }
  }

  componentWillMount() {
    const persistedState = loadState()
    const normalized = normalize(persistedState, lifeSchema)
    const mappedState = {
      tasks: {
        byId: normalized.entities.tasks,
        allIds: normalized.result.tasks
      },
      categories: {
        byId: normalized.entities.categories,
        allIds: normalized.result.categories
      },
      projects: {
        byId: normalized.entities.projects,
        allIds: normalized.result.projects
      },
      areas: normalized.entities.areas,
      currentFilter: persistedState.currentFilter
    }
    this.setState({
      store: configureStore(mappedState),
      isStoreLoading: false
    })
  }

  render() {
    if (this.state.storeLoading) {
      return <h1>Loading...</h1>
    }

    return (
      <Provider store={this.state.store}>
        <Router>
          <LifeContainer />
        </Router>
      </Provider>
    )
  }
}
