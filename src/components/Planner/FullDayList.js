import React, { Component } from 'react'
import Hours from '../../lib/Hours'
import './Planner.css'

export default class FullDayList extends Component {
  getHourLabel(hour) {
    return hour === 0
      ? 'Midnight'
      : hour === 12 ? 'Noon' : `${hour.toString().padStart(2, '0')}:00`
  }

  render() {
    return (
      <div className="calendar-view">
        <div className="calendar-time-column">
          {Hours.allIds.map((hour, i) => {
            const hourInfo = Hours.byId[hour]
            return (
              <div className="hour-label" key={i}>
                <div className="hour-half">{hourInfo.hourLabel}</div>
                <div className="hour-half" />
              </div>
            )
          })}
        </div>
        <div className="calendar-day-column">
          {Hours.allIds.map((hour, i) => {
            return (
              <div className="hour-cell" key={i}>
                <div className="hour-half" />
                <div className="hour-half" />
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}
