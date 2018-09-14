import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import TodoRow from './TodoRow'
import TodoTableHead from './TodoTableHead'
import TodoTableToolbar from './TodoTableToolbar'

const styles = theme => ({
  root: {
    width: '100%',
    maxHeight: 'calc(100vh - 136px)',
    overflow: 'auto',
    marginTop: theme.spacing.unit * 3
  },
  table: {
    minWidth: 1020
  },
  tableWrapper: {
    overflowX: 'auto'
  }
})

class TodoTable extends Component {
  constructor(props, context) {
    super(props, context)

    this.state = {
      order: 'asc',
      orderBy: 'position',
      columnData: [
        { id: 'type', label: '' },
        {
          id: 'description',
          label: 'Description'
        },
        { id: 'area', label: 'Area' },
        {
          id: 'project',
          label: 'Project'
        },
        // { id: 'state', label: 'State' },
        {
          id: 'dueWhen',
          label: 'Due'
        },
        {
          id: 'delete',
          label: ''
        }
      ],
      selected: [],
      page: 0,
      rowsPerPage: 30
    }
  }

  handleRequestSort = (event, property) => {
    const orderBy = property ? property : 'position'
    let order = 'desc'

    if (this.state.orderBy === property && this.state.order === 'desc') {
      order = 'asc'
    }

    this.setState({ order, orderBy })
  }

  handleSelectAllClick = (event, checked) => {
    if (checked) {
      this.setState({ selected: this.props.todos.map(n => n.id) })
      return
    }
    this.setState({ selected: [] })
  }

  handleClick = (event, id) => {
    const { selected } = this.state
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    this.setState({ selected: newSelected })
  }

  handleChangePage = (event, page) => {
    this.setState({ page })
  }

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value })
  }

  isSelected = id => this.state.selected.indexOf(id) !== -1

  render() {
    const { todoIds, classes } = this.props
    const {
      order,
      orderBy,
      selected,
      rowsPerPage,
      page,
      columnData
    } = this.state
    const emptyRows =
      rowsPerPage - Math.min(rowsPerPage, todoIds.length - page * rowsPerPage)

    return (
      <Paper className={classes.root}>
        <TodoTableToolbar numSelected={selected.length} />
        <div className={classes.tableWrapper}>
          <Table className={classes.table}>
            <TodoTableHead
              numSelected={selected.length}
              columnData={columnData}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={this.handleSelectAllClick}
              onRequestSort={this.handleRequestSort}
              rowCount={todoIds.length}
            />
            <TableBody>
              {todoIds.map(n => {
                return <TodoRow key={n} todoId={n} />
              })}
            </TableBody>
          </Table>
        </div>
        {/* <TablePagination
          component="div"
          count={todoIds.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            'aria-label': 'Previous Page'
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page'
          }}
          onChangePage={this.handleChangePage}
          onChangeRowsPerPage={this.handleChangeRowsPerPage}
        /> */}
      </Paper>
    )
  }
}

export default compose(
  withStyles(styles),
  connect(state => ({
    todos: state.todoList.todos,
    todoIds: state.todoList.todos.map(t => t.id)
  }))
)(TodoTable)
