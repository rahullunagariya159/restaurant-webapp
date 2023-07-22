import { useEffect, useState } from 'react';
import { Storage } from 'aws-amplify';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ImageUpload from '../ImageUpload';
import aws_exports from '../../aws-exports';
import uuid from 'uuid-random';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogClose from "./DialogClose";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from "@material-ui/core/Dialog";
import slugify from 'slugify';
import SuccessButton from './../SuccessButton';
import Loading from "../Loading";
import {toast} from "react-toastify";
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1),
		},
	},
	imgUploader: {
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
	uploadImageError: {
		color: "#f44336",
		fontSize: "0.75rem",
		fontWeight: "400",
		textAlign: "center",
	  }
}));

const BulkUploadImages = (props) => {
	const classes = useStyles();
	const { restaurant={} } = props;
	const { bulkImages = []} = restaurant || {};
	const [existingBulkPictures, setExistingBulkPictures] = useState(bulkImages);

	const [pictures, setPictures] = useState([]);

	const [error, setError] = useState(false);

	// Loading State
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		if(restaurant && restaurant.bulkImages){
			setExistingBulkPictures(restaurant.bulkImages)
		}
	}, [restaurant]);

	const onDrop = (picture) => {
		setPictures(picture);
		setError(false);
	};

	const fileNameSlugify = (name) => {
		return slugify(name.replace(/\.[^/.]+$/, ""), '_')
	}

	const updateImages = async () => {
      if(!pictures?.length)
	  {
		setError(true);
        toast.error('Please upload image');
        return false;
      }

		// Uplaod all the images first
		setLoading(true);

		const promises = [];

		if (pictures.length > 0) {
			pictures.forEach((pic) => {
				const filename = `${fileNameSlugify(pic.name || '')}__${uuid()}${Date.now()}`;
				promises.push(
					Storage.put(filename, pic, {
						contentType: pic.type,
					})
				);
			});
		}

		let files = [];

		let uploads = await Promise.all(promises);

		if (uploads.length > 0) {
			uploads.forEach((u) => {
				files.push({
					key: u.key,
					bucket: aws_exports.aws_user_files_s3_bucket,
					region: aws_exports.aws_project_region,
				});
			});
		}

		let input = {
			id: restaurant.id,
			bulkImages: [].concat(existingBulkPictures, files).filter((item) => item),
		};
		try {
			console.log({
				existingBulkPictures,
				bulkImages: input.bulkImages
			});
			await props.updateRestaurantDetails(input, files);
      toast.success('Image uploaded successfully');
			setLoading(false);
			handleClose()
		} catch (error) {
			console.log('Encountered Error', error);
			setLoading(false);
		}
	};

	const [open, setOpen] = useState(false)


	const handleClose = () => {
		setOpen(false)
		props.onClose && props.onClose();
	}

	return (
		<>
			<SuccessButton id="btnUploadImages" variant="contained" color="success" onClick={() => setOpen(true)}>
				 + Upload images
			</SuccessButton>
			{
				loading && <Loading title={'Uploading..Please wait'} />
			}

			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="form-dialog-title"
				fullWidth
				maxWidth={'md'}
			>
				<DialogTitle id="form-dialog-title">
					Upload Multiple Images
					<DialogClose onClose={handleClose}/>
				</DialogTitle>
				<DialogContent>
					<div className={classes.imgUploader}>
            <ImageUpload
                  onDrop={onDrop}
                  acceptType={["jpg", "png", "jpeg","gif"]}
                  buttonText="Choose image"
                  label={'Upload Bulk Images'}
                  maxFileSize={10242880}
                  name="uploadBulkImages"
                  isMultiple={true}
              />
					</div>
				{error ? (<Typography className={classes.uploadImageError}>{"Please Upload image"}</Typography>): null}
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose} color="secondary">
						Cancel
					</Button>
					<Button id="saveBulkImages" onClick={updateImages} color='primary'>
						Save Bulk Images
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
};

export default BulkUploadImages;
