import List from '@material-ui/core/List';
import React, { Component } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { connect } from 'react-redux';
import { getFilteredTaskIds } from '../selectors/filteredTasks.selectors';
import TodoListItem from './TodoListItem';

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
      taskIds: getFilteredTaskIds(state)
    }
  })(TodoList)
)
