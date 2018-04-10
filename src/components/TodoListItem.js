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
      id: props.todo.id,
      originalIndex: props.getTodo(props.todo.id).index
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
    const { todo } = props

    if (draggedId !== todo.id) {
      const { index: overIndex } = props.getTodo(todo.id)
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
    const { todo, todoChecked, todoEdited, todoDeleted, isDragging, connectDragSource, connectDropTarget } = this.props
    const opacity = isDragging ? 0 : 1
    return connectDragSource(
      connectDropTarget(
        <div key={todo.id} className={todo.isComplete ? 'todo-list-item is-completed' : 'todo-list-item'}>
          <ListItem style={{ opacity }}>
            <Checkbox checked={todo.isComplete} onChange={() => todoChecked(todo)} />
            <ListItemText className="todo-description" primary={todo.description} />
            <ListItemSecondaryAction className="todo-actions">
              <IconButton className="todo-edit" aria-label="Edit" onClick={() => todoEdited(todo)}>
                <EditIcon />
              </IconButton>
              <IconButton className="todo-delete" aria-label="Delete" onClick={() => todoDeleted(todo)}>
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
