import React from 'react'
// import FirstPageIcon from '@material-ui/icons/FirstPage'
import IconButton from '@material-ui/core/IconButton'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
// import LastPageIcon from '@material-ui/icons/LastPage'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    flexShrink: 0,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center',
    borderBottom: '1px solid #dfdfdf',
  },
  container: {
    display: 'flex',
    alignItems: 'center',
    margin:'15px 0'
  }
}))

const TablePaginationActions = props => {
  const classes = useStyles()
  const theme = useTheme()
  const { count, page, rowsPerPage, onChangePage, nextPage } = props
  // const handleFirstPageButtonClick = (event) => {
  //   onChangePage(event, 0)
  // }

  const handleBackButtonClick =(event,prev) => {
    onChangePage(event, page - 1,prev)
  }

  const handleNextButtonClick = (event,next) => {
    onChangePage(event, page + 1,next)
  }

  // const handleLastPageButtonClick = (event) => {
  //   onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1))
  // }

  return (
    <div className={classes.root}>
      {/* <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton> */}
      <div className={classes.container}>
      <Typography variant="body2">
              {`Total Number of Records : ${count} of ${count}`}
      </Typography>
      <IconButton
        onClick={(e) => { handleBackButtonClick(e,'prevButton') }}
        disabled={page === 0}
        aria-label="previous page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowRight />
        ) : (
          <KeyboardArrowLeft />
        )}
      </IconButton>
      <IconButton
        onClick={(e) => { handleNextButtonClick(e,'nextButton') }}
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          disabled={nextPage}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? (
          <KeyboardArrowLeft />
        ) : (
          <KeyboardArrowRight />
        )}
      </IconButton>
      </div>
      {/* <IconButton
        onClick={handleLastPageButtonClick}
        // disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        disabled={!count}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton> */}
    </div>
  )
}

export default TablePaginationActions
