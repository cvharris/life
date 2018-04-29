import React, { Component } from 'react'
import EditIcon from 'material-ui-icons/Edit'
import { ListItem, ListItemText } from 'material-ui/List'
import { connect } from 'react-redux'
import SidebarContext from './SidebarContext'

class AreaListItem extends Component {
  render() {
    const { categoryId, areaId, area } = this.props
    return (
      <SidebarContext.Consumer>
        {({
          selectedCategoryId,
          selectedAreaId,
          toggleAreaForm,
          selectCategoryArea
        }) => (
          <ListItem
            key={areaId}
            dense={true}
            className={
              selectedCategoryId === categoryId && selectedAreaId === areaId
                ? 'nav-item selected'
                : 'nav-item'
            }>
            <div className="sidebar-icon">
              <EditIcon
                style={{
                  cursor: 'pointer',
                  color: 'rgba(0, 0, 0, 0.54)'
                }}
                onClick={() => toggleAreaForm(areaId, categoryId)}
              />
            </div>
            <ListItemText
              inset
              primary={area.label}
              style={{ cursor: 'pointer' }}
              onClick={() => selectCategoryArea(categoryId, areaId)}
            />
          </ListItem>
        )}
      </SidebarContext.Consumer>
    )
  }
}

export default connect((state, ownProps) => ({
  area: state.areas[ownProps.areaId]
}))(AreaListItem)
