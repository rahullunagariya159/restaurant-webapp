import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button';

const Loading = ({content, action}) => {
    return (
        <Dialog onClose={action} aria-labelledby="simple-dialog-title" open={true}>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={action} color="primary" autoFocus>
                    Ok
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default Loading;