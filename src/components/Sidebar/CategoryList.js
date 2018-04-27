import React from 'react'
import List, { ListSubheader } from 'material-ui/List'
import IconButton from 'material-ui/IconButton'
import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline'
import CategoryListItem from './CategoryListItem'

export default ({
  categoryIds,
  toggleCategoryForm,
  toggleAreaForm,
  selectCategoryArea
}) => {
  return (
    <List
      dense={true}
      disablePadding={true}
      subheader={
        <ListSubheader component="div">
          Categories & Areas
          <IconButton onClick={() => this.toggleCategoryForm()}>
            <AddCircleOutlineIcon />
          </IconButton>
        </ListSubheader>
      }>
      {categoryIds.map(categoryId => {
        return (
          <div key={categoryId}>
            <CategoryListItem
              categoryId={categoryId}
              toggleAreaForm={toggleAreaForm}
              toggleCategoryForm={toggleCategoryForm}
              selectCategoryArea={selectCategoryArea}
            />
          </div>
        )
      })}
    </List>
  )
}
