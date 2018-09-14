import IconButton from '@material-ui/core/IconButton'
import List from '@material-ui/core/List'
import ListSubheader from '@material-ui/core/ListSubheader'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'
import React from 'react'
import CategoryListItem from './CategoryListItem'
import SidebarContext from './SidebarContext'

export default ({ categoryIds }) => {
  return (
    <SidebarContext.Consumer>
      {({ toggleAreaForm, toggleCategoryForm, selectCategoryArea }) => (
        <List
          dense={true}
          className="category-list"
          disablePadding={true}
          subheader={
            <ListSubheader component="div">
              Categories & Areas
              <IconButton onClick={() => toggleCategoryForm()}>
                <AddCircleOutlineIcon />
              </IconButton>
            </ListSubheader>
          }>
          {categoryIds.map(categoryId => {
            return (
              <div key={categoryId}>
                <CategoryListItem categoryId={categoryId} />
              </div>
            )
          })}
        </List>
      )}
    </SidebarContext.Consumer>
  )
}
