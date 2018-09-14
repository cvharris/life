import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Select from '@material-ui/core/Select'
import TextField from '@material-ui/core/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Project from '../../lib/Project'
import { addProject, updateProject } from '../../reducers/projects.reducer'
import SidebarContext from './SidebarContext'

class ProjectForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      project: this.setupForm()
    }
    this.descriptionField = null
  }

  componentWillReceiveProps(newProps) {
    const projectToSet = newProps.projectId
      ? this.props.projects[newProps.projectId]
      : this.setupForm()
    this.setState({
      project: projectToSet
    })
  }

  updateText = evt => {
    this.setState({
      project: { ...this.state.project, description: evt.target.value }
    })
  }

  handleAreaUpdate = evt => {
    const areaId = evt.target.value
    const area = this.props.areas[areaId]
    const category = this.props.categories[area.category]

    this.setState({
      project: {
        ...this.state.project,
        area: areaId,
        category: category.id
      }
    })
  }

  setupForm = () => {
    const { currentFilter } = this.props
    const properties = {}
    properties.area = currentFilter.area
    properties.category = currentFilter.category
    return new Project(properties)
  }

  submitForm = () => {
    if (this.props.projectId) {
      this.props.updateProject(this.state.project)
      this.props.closeModal()
    } else {
      this.props.addProject(this.state.project)
    }
    this.setState({
      project: this.setupForm()
    })
  }

  render() {
    const {
      projectId,
      formOpen,
      closeModal,
      areas,
      categories,
      categoryIds
    } = this.props
    const { project } = this.state
    const submitText = projectId ? 'Save' : 'Save & Add Another'

    return (
      <Dialog
        aria-labelledby="add-todo-title"
        open={formOpen}
        onClose={() => closeModal(null)}>
        <DialogTitle id="add-todo-title">Add Project</DialogTitle>
        <DialogContent>
          <TextField
            placeholder="Have to do..."
            value={project.description}
            fullWidth
            autoFocus={true}
            onChange={this.updateText}
            onKeyUp={e => {
              if (e.key === 'Enter') {
                if (!project.description) {
                  closeModal()
                } else {
                  this.submitForm()
                }
              }
            }}
            margin="normal"
          />
          <Select
            native
            onChange={this.handleAreaUpdate}
            value={project.area ? project.area : ''}>
            <option value="">-- Pick an Area --</option>
            {categoryIds.map(categoryId => {
              const category = categories[categoryId]
              return (
                <optgroup key={categoryId} label={category.label}>
                  {category.areas.map(areaId => {
                    const area = areas[areaId]
                    return (
                      <option key={areaId} value={areaId}>
                        {area.label}
                      </option>
                    )
                  })}
                </optgroup>
              )
            })}
          </Select>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => closeModal(null)} color="primary">
            Close
          </Button>
          <Button onClick={this.submitForm} variant="raised" color="primary">
            {submitText}
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
}

export const ContextualizedProjectForm = props => (
  <SidebarContext.Consumer>
    {({ projectFormOpen, toggleProjectForm }) => (
      <ProjectForm
        {...props}
        formOpen={projectFormOpen}
        closeModal={toggleProjectForm}
      />
    )}
  </SidebarContext.Consumer>
)

export default connect(
  state => ({
    projects: state.projects.byId,
    areas: state.areas,
    categories: state.categories.byId,
    categoryIds: state.categories.allIds,
    currentFilter: state.currentFilter
  }),
  { addProject, updateProject }
)(ContextualizedProjectForm)
