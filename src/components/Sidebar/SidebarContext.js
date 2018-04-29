import { createContext } from 'react'

export default createContext({
  currentCategoryId: null,
  categoryFormOpen: false,
  currentAreaId: null,
  areaFormOpen: false,
  currentProjectId: null,
  projectFormOpen: false,
  toggleCategoryForm: () => {},
  toggleAreaForm: () => {},
  toggleProjectForm: () => {},
  selectCategoryArea: () => {},
  selectProject: () => {}
})
