import { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { CF_URL } from 'consts';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import ImageListItemBar from '@material-ui/core/ImageListItemBar';
import {getFileName} from "../../utils";

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	imageList: {
		// height: 450,
	},
	imgUploader: {
		maxWidth: '500px',
	},
	submitBtn: {
		marginTop: '20px',
		marginBottom: '20px',
	},
	icon: {
		color: 'white',
	},
	top: {
		marginTop: '25px',
	},
}));

const ImageListWrapper = (props) => {
	const classes = useStyles();
	const { images = []} = props;
	const breakpoints = {
		xs: 0,
		sm: 600,
		md: 960,
		lg: 1280,
		xl: 1920
	}

	const getColumns = (width) => {
		if (width < breakpoints.sm) {
			return 2
		} else if (width < breakpoints.md) {
			return 3
		} else if (width < breakpoints.lg) {
			return 4
		} else if (width < breakpoints.xl) {
			return 6
		} else {
			return 6
		}
	}

	const [columns, setColumns] = useState(getColumns(window.innerWidth))
	const updateDimensions = () => {
		setColumns(getColumns(window.innerWidth))
	}

	useEffect(() => {
		window.addEventListener("resize", updateDimensions);
		return () => window.removeEventListener("resize", updateDimensions);
	}, []);

	const deleteImages = async (item) => {
		props.deleteImages && props.deleteImages(item)
	}
	return (
		<ImageList id="uploadedImgList" rowHeight={180} className={classes.imageList} cols={columns}>
			{images && images.map((item) => <ImageListItem key={item?.key}>
				<img src={`${CF_URL}/${item?.key}`} alt={getFileName(item?.key)} />
				<ImageListItemBar
					title={getFileName(item?.key || 'Hello')}
					actionIcon={
						props.deleteImages ? <IconButton id="btnDeleteUploadedImg" aria-label={`info about ${getFileName(item?.key)}`} className={classes.icon} onClick={() => deleteImages(item)}>
							<DeleteIcon />
						</IconButton> : null
					}
				/>
			</ImageListItem>)}
		</ImageList>
	);
};

export default ImageListWrapper;
