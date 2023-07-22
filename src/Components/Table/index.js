/* eslint-disable */
import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableFooter from '@material-ui/core/TableFooter'
import TableHead from '@material-ui/core/TableHead'
// import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './TablePaginationActions'
import TableRow from '@material-ui/core/TableRow'
import CircularProgress from '@material-ui/core/CircularProgress';
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableToolbar from './TableToolbar'
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
} from 'react-table'

const IndeterminateCheckbox = React.forwardRef(
  ({indeterminate, ...rest}, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    )
  }
)

// Create an editable cell renderer
const EditableCell = ({
                        value: initialValue,
                        row: {index},
                        column: {id},
                        updateMyData = () => {
                        }, // This is a custom function that we supplied to our table instance
                      }) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <p style={{minWidth: 150, maxWidth: 350}}>
      {value}
    </p>
  )
  // return (
  //   <input
  //     style={inputStyle}
  //     value={value}
  //     onChange={onChange}
  //     onBlur={onBlur}
  //   />
  // )
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

const EnhancedTable = ({
                         columns,
                         data,
                         setData,
                         updateMyData,
                         skipPageReset,
                         statusFilter,
                         setStatusFilter,
                         showDropDownFilter,
                         loading,
                         AddItem,
                         deleteMultipleItemHandler,
                         buttonLabel,
                        handleClose,
                        handlePageChange,
                        Currentpage,
                        nextPage,
                         id
}) => {

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: {pageIndex, pageSize, selectedRowIds, globalFilter},
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect,
    hooks => {
      hooks.allColumns.push(columns => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox.  Pagination is a problem since this will select all
          // rows even though not all rows are on the current page.  The solution should
          // be server side pagination.  For one, the clients should not download all
          // rows in most cases.  The client should only download data for the current page.
          // In that case, getToggleAllRowsSelectedProps works fine.
          Header: ({getToggleAllRowsSelectedProps}) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({row}) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ])
    }
  )

  const handleChangePage = (event, newPage, buttonclick) => {
    gotoPage(newPage)
    handlePageChange(buttonclick);
  }

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value))
  }

  const removeByIndexs = (array, indexs) => array.filter((_, i) => !indexs.includes(i))
  const getByIndexs = (array, indexs) => array.filter((_, i) => indexs.includes(i))

  const deleteItemHandler = event => {
    const newData = removeByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10))
    )
    setData && setData(newData)
    const deletedIds =  getByIndexs(
      data,
      Object.keys(selectedRowIds).map(x => parseInt(x, 10))
    ).map(x => x.id)
    deleteMultipleItemHandler && deleteMultipleItemHandler(deletedIds)
  }

  const addItemHandler = user => {
    const newData = data.concat([user])
    setData && setData(newData)
  }

  const totalColumn = headerGroups[0].headers.length;

  // Render the UI for your table
  return (
    <>
    <TableContainer>
      <TableToolbar
        numSelected={Object.keys(selectedRowIds).length}
        deleteItemHandler={deleteItemHandler}
        deleteMultipleItemHandler={deleteMultipleItemHandler}
        addItemHandler={addItemHandler}
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        setStatusFilter={setStatusFilter}
        statusFilter={statusFilter}
        showDropDownFilter={showDropDownFilter}
        AddItem={AddItem}
        buttonLabel={buttonLabel}
        handleClose={handleClose}
      />
      <MaUTable {...getTableProps()} id={id || ""}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                  style={{minWidth: column.id === 'selection'? 20 : 150, cursor: 'pointer'}}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody >
          {
            loading || data.length <= 0 ?
              <TableRow>
                <TableCell colspan={totalColumn} style={{textAlign: 'center'}}>
                  <div style={{
                    display: 'flex',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    {
                      loading ? <> <CircularProgress style={{marginRight: 15}}/> Loading</> : 'No Record Found'
                    }
                  </div>
                </TableCell>
              </TableRow> :
              <>
                {page.map((row, i) => {
                  prepareRow(row)
                  return (
                    <TableRow {...row.getRowProps()}>
                      {row.cells.map(cell => {
                        return (
                          <TableCell {...cell.getCellProps()}>
                            {cell.render('Cell')}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  )
                })}
              </>
          }
        </TableBody>

        {/* <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                {label: 'All', value: data.length},
              ]}
              colSpan={headerGroups[0].length}
              count={data.length}
              // count = {NextButton}
              rowsPerPage={pageSize}
              page={Currentpage}
              SelectProps={{
                inputProps: {'aria-label': 'rows per page'},
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter> */}
      </MaUTable>
      </TableContainer>
              <TablePaginationActions
                count={data.length}
                page={Currentpage}
                onChangePage={handleChangePage}
                nextPage={nextPage}
              />
    </>
  )
}

export default EnhancedTable
