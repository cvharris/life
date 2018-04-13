import React, { Component } from 'react'
import './App.css'
import { Provider } from 'react-redux'
import { loadState } from './conf/localStorage'
import configureStore from './conf/store'
import LifeContainer from './containers/LifeContainer'

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
    this.setState({
      store: configureStore(persistedState),
      isStoreLoading: false
    })
  }

  render() {
    if (this.state.storeLoading) {
      return <h1>Loading...</h1>
    }

    return (
      <Provider store={this.state.store}>
        <LifeContainer />
      </Provider>
    )
  }
}
