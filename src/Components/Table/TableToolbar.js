import React from 'react'
import AddUserDialog from './AddUserDialog'
import clsx from 'clsx'
import DeleteIcon from '@material-ui/icons/Delete'
import GlobalFilter from './GlobalFilter'
import IconButton from '@material-ui/core/IconButton'
import { lighten, makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Tooltip from '@material-ui/core/Tooltip'

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}))

const TableToolbar = props => {
  const classes = useToolbarStyles()
  const {
    numSelected,
    deleteItemHandler,
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter,
    setStatusFilter,
    statusFilter,
    showDropDownFilter,
    AddItem,
    buttonLabel,
    handleClose,
    deleteMultipleItemHandler
  } = props
  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
      style={{"justify-content" : AddItem? '' : 'end'}}
    >

      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
        >
          {numSelected} item selected
        </Typography>
      ) :  AddItem ? (
        <Typography className={classes.title} variant="h6" id="tableTitle">
          <AddUserDialog AddItem={AddItem} label={buttonLabel} handleClose={handleClose}  />
        </Typography>
      ): ''}

      {numSelected > 0 && deleteMultipleItemHandler ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={deleteItemHandler}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <GlobalFilter
          preGlobalFilteredRows={preGlobalFilteredRows}
          globalFilter={globalFilter}
          setGlobalFilter={setGlobalFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          showDropDownFilter={showDropDownFilter}
        />
      )}
    </Toolbar>
  )
}

export default TableToolbar
