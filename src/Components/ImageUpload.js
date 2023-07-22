import React,{useState} from 'react';
import ImageUploading from 'react-images-uploading';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
  uploadImageWrapper: {
    display: 'flex',
    flexDirection: 'column',
    margin: '16px 0',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'
  },
  iconContainer: {
    display: 'flex',
    flexDirection: 'column'
  },
  uploadIcon: {
    margin: 'auto',
  },
  uploadButton: {
    margin: "10px auto",
    padding: '6px 23px',
    backgroundColor: '#3f4257',
    borderRadius: '30px',
    color: 'white',
    fontWeight: '400',
    fontSize: '14px',
    transition: 'all 0.2s ease-in',
    textTransform: 'lowercase',
    cursor: 'pointer',
    outline: 'none',
    border: 'none',
    '&:hover': {
      backgroundColor:'#3f4257'
    }
  },
  disabledButton : {
      backgroundColor:'#E0E0E0 !important',
      pointerEvent:'none'
  },
  uploadText: {
    textAlign: 'center',
    fontSize: '12px',
    margin: "8px 0 4px",
    padding: '10px'
  },
  imageItem: {
    width: '21%',
    minWidth: '180px',
    margin: '2%',
    padding: '10px',
    background: '#edf2f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'inherit',
    boxShadow: '0 0 8px 2px rgb(0 0 0 / 10%)',
    border: '1px solid #d0dbe4',
    position: 'relative',
  },
  imageWrapper: {
    display: 'flex',
    flexFlow: 'row wrap',
    justifyContent: 'center'
  },
  closeIcon: {
    position: 'absolute !important',
    top: '-9px',
    right: '-9px',
    color: '#fff !important',
    backgroundColor: '#ff4081 !important',
    borderRadius: '50% !important',
    textAlign: 'center',
    cursor: 'pointer !important',
    fontSize: '26px !important',
    fontWeight: '700',
    lineHeight: '30px',
    width: '30px',
    height: '30px',
  },
  imageUploadMainContainer : {
    borderRadius: "10px"
  }
}));

const ImageUpload = ({pictures,onDrop,isMultiple=false,maxNumber=10,acceptType=['jpg', 'gif', 'png','jpeg'],maxFileSize,buttonText,name,label,fileTypeError="",disable=false}) => {
    const classes = useStyles();
  const [imageDataList,setImageList] = useState(null)

 const onHandleDrop = (images) => {
  console.log("--->",images)
  setImageList(images);
  const imgArr = [];
      images?.map((image) => {
        imgArr.push(image.file);
      })
  onDrop(imgArr)
 }

  return (
    <div className={classes.imageUploadMainContainer}>
        <ImageUploading
        multiple={isMultiple}
        value={imageDataList}
        onChange={onHandleDrop}
        dataURLKey="data_url"
        maxNumber={maxNumber || 10}
        acceptType={acceptType}
        maxFileSize={maxFileSize || 2242880}
        inputProps={{
          name : name || "newImageUpload",
          disabled :disable
        }}
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          isDragging,
          dragProps
        }) => (
          // write your building UI
          <div className={classes.uploadImageWrapper}>
            <div
              className={classes.iconContainer}
              style={isDragging ? { color: "red" } : null}
              {...dragProps}
              name="test"
            >
              <img
                src="/images/uploadIcon.svg"
                className={classes.uploadIcon}
                alt="Upload Icon"
                width={60}
                height={60}
              />
              <Typography className={classes.uploadText}>{label || "Upload Images (jpg, jpeg and png format only)"}</Typography>
              <Button variant="outlined" className={[classes.uploadButton, disable && classes.disabledButton]} onClick={onImageUpload}>
                {buttonText || "Choose Image"}
              </Button>
            </div>
            <div className={classes.imageWrapper}>
              {imageList?.map((image, index) => (
                <div key={index} className={classes.imageItem}>
                  <img src={image.data_url} alt="uploaded image" style={{width: '100%', maxHeight: '200px'}} />
                  <IconButton className={classes.closeIcon} aria-label="remove image" component="span" onClick={() => onImageRemove(index)}>
                    <CloseIcon />
                  </IconButton>
                </div>
              ))}
            </div>
          </div>
        )}
      </ImageUploading>
      </div>
    )
}

export default ImageUpload;
