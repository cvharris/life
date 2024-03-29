import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemText from '@material-ui/core/ListItemText'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import EditIcon from '@material-ui/icons/Edit'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import SidebarContext from './SidebarContext'

class ProjectListItem extends Component {
  constructor(props) {
    super(props)

    this.addTaskToProject = this.addTaskToProject.bind(this)
  }

  addTaskToProject() {
    // TODO: set the selectedProjectId, then open add task form
  }

  render() {
    const { projectId, project } = this.props
    return (
      <SidebarContext.Consumer>
        {({ selectedProjectId, selectProject, toggleProjectForm }) => (
          <ListItem
            button
            dense={true}
            className={
              selectedProjectId === projectId ? 'nav-item selected' : 'nav-item'
            }>
            <div className="sidebar-icon">
              <EditIcon
                style={{
                  cursor: 'pointer',
                  color: 'rgba(0, 0, 0, 0.54)'
                }}
                onClick={() => toggleProjectForm(projectId)}
              />
            </div>
            <ListItemText
              style={{ cursor: 'pointer' }}
              primary={project.description}
              onClick={() => selectProject(projectId, null)}
            />
            <ListItemSecondaryAction className="todo-actions">
              <ListItemIcon onClick={() => this.addTaskToProject()}>
                <AddCircleOutlineIcon />
              </ListItemIcon>
            </ListItemSecondaryAction>
          </ListItem>
        )}
      </SidebarContext.Consumer>
    )
  }
}

export default connect((state, ownProps) => ({
  project: state.projects.byId[ownProps.projectId]
}))(ProjectListItem)
