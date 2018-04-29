import React from 'react'
import List, { ListSubheader } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline'
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
