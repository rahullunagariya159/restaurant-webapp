import { makeStyles } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
	closeImg: {
		cursor:'pointer',
		float:'right',
		marginTop: 0,
		width: '20px'
	},
}));

const DialogClose = ({onClose}) => {
	const classes = useStyles();
	return (
	 <CloseIcon onClick={onClose} className={classes.closeImg}/>
	);
};

export default DialogClose;
