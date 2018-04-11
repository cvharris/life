import React, { Component } from 'react'
import flow from 'lodash/flow'
import { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List'
import Checkbox from 'material-ui/Checkbox'
import IconButton from 'material-ui/IconButton'
import DeleteIcon from 'material-ui-icons/Delete'
import EditIcon from 'material-ui-icons/Edit'
import { DropTarget, DragSource } from 'react-dnd'

const todoListItemSource = {
  beginDrag(props) {
    return {
      id: props.todoId,
      originalIndex: props.getTodo(props.todoId).index
    }
  },
  endDrag(props, monitor) {
    // const { id: droppedId, originalIndex } = monitor.getItem()
    // const didDrop = monitor.didDrop()
    // if (!didDrop) {
    //   props.moveTodo(droppedId, originalIndex)
    // }
  }
}

const todoTarget = {
  canDrop() {
    return false
  },

  hover(props, monitor) {
    const { id: draggedId } = monitor.getItem()
    const { todoId } = props

    if (draggedId !== todoId) {
      const { index: overIndex } = props.getTodo(todoId)
      props.moveTodo(draggedId, overIndex)
    }
  }
}

class TodoListItem extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  render() {
    const {
      todoId,
      description,
      isComplete,
      todoChecked,
      todoEdited,
      todoDeleted,
      isDragging,
      connectDragSource,
      connectDropTarget
    } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(
        <div key={todoId} className={isComplete ? 'todo-list-item is-completed' : 'todo-list-item'}>
          <ListItem style={{ opacity }}>
            <Checkbox checked={isComplete} onChange={() => todoChecked(todoId)} />
            <ListItemText className="todo-description" primary={description} />
            <ListItemSecondaryAction className="todo-actions">
              <IconButton className="todo-edit" aria-label="Edit" onClick={() => todoEdited(todoId)}>
                <EditIcon />
              </IconButton>
              <IconButton className="todo-delete" aria-label="Delete" onClick={() => todoDeleted(todoId)}>
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      )
    )
  }
}

export default flow(
  DropTarget('todoItem', todoTarget, connect => ({
    connectDropTarget: connect.dropTarget()
  })),
  DragSource('todoItem', todoListItemSource, (connect, monitor) => {
    return {
      connectDragSource: connect.dragSource(),
      isDragging: monitor.isDragging()
    }
  })
)(TodoListItem)
