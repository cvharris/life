import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import ProjectListItem from './ProjectListItem'
import SidebarContext from './SidebarContext'

class ProjectList extends Component {
  render() {
    const { projectIds } = this.props

    return (
      <SidebarContext.Consumer>
        {({ toggleProjectForm }) => (
          <List
            dense={true}
            className="category-list"
            disablePadding={true}
            subheader={
              <ListSubheader component="div">
                Projects
                <IconButton onClick={() => toggleProjectForm()}>
                  <AddCircleOutlineIcon />
                </IconButton>
              </ListSubheader>
            }>
            {projectIds.map(projectId => {
              return (
                <div key={projectId}>
                  <ProjectListItem projectId={projectId} />
                </div>
              )
            })}
          </List>
        )}
      </SidebarContext.Consumer>
    )
  }
}

export default connect(state => ({
  projectIds: state.projects.allIds
}))(ProjectList)
