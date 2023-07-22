import React, { useState } from 'react'

import AddIcon from '@material-ui/icons/Add'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Tooltip from '@material-ui/core/Tooltip'
import SuccessButton from "../SuccessButton";
import DialogClose from "../Dialog/DialogClose";

const AddUserDialog = ({AddItem, handleClose, label}) => {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false);
    handleClose && handleClose();
  }

  return (
    <div>
      <Tooltip title="Add">
        <SuccessButton variant="contained" color="success" aria-label="add" onClick={handleClickOpen}>
          <AddIcon /> {label || 'Add Item'}
        </SuccessButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleCloseDialog}
        aria-labelledby="form-dialog-title"
        fullWidth
        maxWidth={'md'}
      >
        <DialogTitle id="form-dialog-title">
          {label || 'Add Item'}
          <DialogClose onClose={handleCloseDialog}/>
        </DialogTitle>
        <DialogContent>
          <AddItem handleClose={handleCloseDialog} />
        </DialogContent>
      </Dialog>
    </div>
  )
}


export default AddUserDialog
