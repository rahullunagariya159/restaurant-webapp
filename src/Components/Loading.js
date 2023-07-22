import Dialog from '@material-ui/core/Dialog';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';

const useStyles = makeStyles((theme) => ({
    loaderWrap: {
        minWidth: '300px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    }
}))

const LoaderWrapper = styled('div')({
    position: 'fixed',
    top: props => props?.style?.top || 0,
    left: 0,
    zIndex: 1301,
    width: '100%'
});

const Loading = ({title, onClose, isLinearProgress,style}) => {
    const classes = useStyles();
    return (
        <>
        {isLinearProgress ?
            <LoaderWrapper style={style}>
                <LinearProgress color="primary" />
            </LoaderWrapper>
        :
        <Dialog onClose={onClose} aria-labelledby="simple-dialog-title" open={true}>
            <div className={classes.loaderWrap}>
                <h3>{title}</h3>
                <CircularProgress />
            </div>
        </Dialog>
        }
        </>
    )
}

export default Loading;
