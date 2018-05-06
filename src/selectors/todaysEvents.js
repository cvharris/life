import moment from 'moment'
import { createSelector } from 'reselect'

const getSessions = state => state.sessions

export const getTodaysEvents = createSelector([getSessions], sessions => {
  const allSessions = sessions.allIds.map(sId => sessions.byId[sId])

  return allSessions.filter(session => {
    const today = new Date()
    console.log(moment(session.dtStart).format())
    console.log(moment(session.dtEnd).format())
    return (
      moment(session.dtStart).isSame(today, 'day') ||
      moment(session.dtEnd).isSame(today, 'day')
    )
  })
})
