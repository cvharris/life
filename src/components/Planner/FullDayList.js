import moment from 'moment'
import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { connect } from 'react-redux'
import { getTodaysEvents } from '../../selectors/todaysEvents'
import './Planner.css'

BigCalendar.momentLocalizer(moment)

class FullDayList extends Component {
  getHourLabel(hour) {
    return hour === 0
      ? 'Midnight'
      : hour === 12 ? 'Noon' : `${hour.toString().padStart(2, '0')}:00`
  }

  render() {
    return (
      <BigCalendar
        events={this.props.sessions}
        startAccessor={session => new Date(session.dtStart)}
        endAccessor={session => new Date(session.dtEnd)}
        titleAccessor="summary"
      />
      // <div className="calendar-view">
      //   <div className="calendar-time-column">
      //     {Hours.allIds.map((hour, i) => {
      //       const hourInfo = Hours.byId[hour]
      //       return (
      //         <div className="hour-label" key={i}>
      //           <div className="hour-half">{hourInfo.hourLabel}</div>
      //           <div className="hour-half" />
      //         </div>
      //       )
      //     })}
      //   </div>
      //   <div className="calendar-day-column">
      //     {Hours.allIds.map((hour, i) => {
      //       return (
      //         <div className="hour-cell" key={i}>
      //           <div className="hour-half" />
      //           <div className="hour-half" />
      //         </div>
      //       )
      //     })}
      //   </div>
      // </div>
    )
  }
}

export default connect(state => ({
  sessions: getTodaysEvents(state)
}))(FullDayList)
