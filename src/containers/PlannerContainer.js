import React, { Component } from 'react'
import FullDayList from '../components/Planner/FullDayList'

export default class PlannerContainer extends Component {
  render() {
    return (
      <div id="planner-container">
        <FullDayList />
      </div>
    )
  }
}
