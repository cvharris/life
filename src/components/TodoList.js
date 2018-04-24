import React, { Component } from 'react'
import List from 'material-ui/List'
import HTML5Backend from 'react-dnd-html5-backend'
import { DragDropContext } from 'react-dnd'
import TodoListItem from './TodoListItem'
import { connect } from 'react-redux'

class TodoList extends Component {
  render() {
    const { taskIds } = this.props

    if (taskIds.length === 0) {
      return <h1 style={{ textAlign: 'center' }}>No tasks yet! Go add some!</h1>
    }

    return (
      <div className="task-list">
        <List dense={true}>
          {taskIds.map((taskId, i) => (
            <TodoListItem key={taskId} taskId={taskId} />
          ))}
        </List>
      </div>
    )
  }
}

export default DragDropContext(HTML5Backend)(
  connect(state => {
    return {
      taskIds: state.tasks.allIds
    }
  })(TodoList)
)
