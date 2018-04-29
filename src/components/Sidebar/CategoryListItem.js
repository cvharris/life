import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  ListItemIcon
} from 'material-ui/List'
import Collapse from 'material-ui/transitions/Collapse'
import EditIcon from 'material-ui-icons/Edit'
import AddCircleOutlineIcon from 'material-ui-icons/AddCircleOutline'
import ExpandLessIcon from 'material-ui-icons/ExpandLess'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import { compose } from 'redux'
import { connect } from 'react-redux'
import AreaListItem from './AreaListItem'
import SidebarContext from './SidebarContext'

const styles = theme => ({
  nested: {
    paddingLeft: theme.spacing.unit * 2
  }
})

class CategoryListItem extends Component {
  constructor(props) {
    super(props)

    this.state = {
      areaListOpen: this.props.category.areas.includes(
        this.props.currentFilter.area
      )
    }
    this.toggleAreaList = this.toggleAreaList.bind(this)
  }

  toggleAreaList() {
    this.setState({ areaListOpen: !this.state.areaListOpen })
  }

  render() {
    const { classes, categoryId, currentFilter, category } = this.props
    const { category: selectedCategoryId, area: selectedAreaId } = currentFilter

    return (
      <SidebarContext.Consumer>
        {({ toggleCategoryForm, selectCategoryArea, toggleAreaForm }) => (
          <div className="sidebar-list-icon">
            <ListItem
              button
              dense={true}
              className={
                selectedCategoryId === categoryId && !selectedAreaId
                  ? 'nav-item selected'
                  : 'nav-item'
              }>
              <div className="sidebar-icon">
                <EditIcon
                  style={{
                    cursor: 'pointer',
                    color: 'rgba(0, 0, 0, 0.54)'
                  }}
                  onClick={() => toggleCategoryForm(categoryId)}
                />
              </div>
              <ListItemText
                style={{ cursor: 'pointer' }}
                primary={category.label}
                onClick={() => selectCategoryArea(categoryId, null)}
              />
              <ListItemSecondaryAction className="todo-actions">
                <ListItemIcon onClick={() => toggleAreaForm(null, categoryId)}>
                  <AddCircleOutlineIcon />
                </ListItemIcon>
                {this.state.areaListOpen ? (
                  <ExpandLessIcon
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggleAreaList}
                  />
                ) : (
                  <ExpandMoreIcon
                    style={{ cursor: 'pointer' }}
                    onClick={this.toggleAreaList}
                  />
                )}
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={this.state.areaListOpen} timeout="auto" unmountOnExit>
              <List
                dense={true}
                disablePadding={true}
                component="div"
                className={classes.nested}>
                {category.areas.map(areaId => {
                  return (
                    <AreaListItem
                      key={areaId}
                      categoryId={categoryId}
                      areaId={areaId}
                    />
                  )
                })}
              </List>
            </Collapse>
          </div>
        )}
      </SidebarContext.Consumer>
    )
  }
}

export default compose(
  withStyles(styles),
  connect((state, ownProps) => ({
    currentFilter: state.currentFilter,
    category: state.categories.byId[ownProps.categoryId]
  }))
)(CategoryListItem)
