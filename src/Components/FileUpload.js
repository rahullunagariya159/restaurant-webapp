import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
// import Loading from '../components/Loading';
import { createDelivery } from '../graphql/mutations';
import { emitCustomEvent } from 'react-custom-events';
import { API, graphqlOperation, Storage } from 'aws-amplify';
import { toast } from 'react-toastify';
import uuid from 'uuid-random';
import Resizer from 'react-image-file-resizer';
import aws_exports from '../aws-exports';
import slugify from 'slugify';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
// import CloseIcon from '@mui/icons-material/Close';
// import IconButton from '@material-ui/core/IconButton';
import { useDropzone } from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { CF_URL } from "consts";

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  imgUploader: {
    width: '100%',
  },
  submitBtn: {
    marginTop: '20px',
    marginBottom: '20px',
    textAlign: 'end',
  },
  top: {
    marginTop: '25px',
  },
  icon: {
    color: 'white',
  },
  txtSlugname: {
    marginBottom: '20px',
  },
  btnNextPrev: {
    marginLeft: '10px',
    marginRight: '10px',
  },
  row: {
    display: 'flex',
    marginTop: theme.spacing(2),
  },
  btnVideoContainer: {
    textAlign: 'center',
    margin: '0px auto 50px',
  },
  videoPlayer: {
    marginTop: '20px',
  },
  btnChoose: {
    borderRadius: '50px',
    textTransform: 'capitalize',
    backgroundColor: '#3f4257',
    color: '#FFFFFF',
    padding: '0px 15px',
    '&:hover': {
      backgroundColor: '#3f4257',
      color: '#FFFFFF',
    },
  },
  svgIcon: {
    width: '20px !important',
    height: '20px !important',
    color: '#ffffff',
  },
  imageCloseIcon: {
    position: 'absolute',
    right: '0px',
    backgroundColor: '#3f4257',
    padding: '0',
    '&:hover': {
      backgroundColor: '#3f4257',
      color: '#ffffff',
    },
  },
  videoPlayContainer: {
    position: 'relative',
    marginTop: '10px',
  },
  lblError: {
    color: '#ff0000',
  },
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
    width: '35%',
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
  },
  disableForm: {
    pointerEvents: "none"  ,
  }
}));

const FileUpload = ({ modeOfOperation, handleClose ,onHandleDrop,disable=false,onVideoLoadMetaData,urls = [],inputName}) => {
  const classes = useStyles();
  const [name, setName] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('');
  const [fontColor, setFontColor] = useState('');
  const [loading, setLoading] = useState(false);
  const [didMount, setDidMount] = useState(true);
  const [pictures, setPictures] = React.useState([]);
  const inputRef = useRef();
  const [existingBulkPictures, setExistingBulkPictures] = useState([]);
  const [source, setSource] = useState('');
  const [error, setError] = useState('');
 const videoPlayerRef = useRef();
  const fileNameSlugify = (name) => {
    return slugify(name.replace(/\.[^/.]+$/, ''), '_');
  };

  function gcd(a, b) {
    return b == 0 ? a : gcd(b, a % b);
  }

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    onDropFile(file);
    const fileUrl = window?.URL?.createObjectURL(file);
    setSource([fileUrl]);
    if (file?.type?.split('/')[0] === 'video') {
      // setError('Please upload video file');
      // return false;
    }
    // setError('');
    // const url = URL.createObjectURL(file);
    // let videoId = 'videoMain';
    // const video = document.createElement('video');
    // const body = document.getElementsByTagName('body');

    // video.setAttribute('src', url);
    // video.setAttribute('videoId', videoId);
    // body[0]?.append(video);
    // let videoTagRef = document.querySelector("[videoId='videoMain']");

    // videoTagRef.addEventListener('loadedmetadata', function (e) {
    //   // console.log(videoTagRef.videoWidth, videoTagRef.videoHeight);
    //   let w = videoTagRef.videoWidth;
    //   let h = videoTagRef.videoHeight;

    //   //find the greatest common divisor (GCD)
    //   var r = gcd(w, h);

    //   console.log('Aspect     = ', w / r, ':', h / r);
    //   console.log('Gcd     = ', r);

    //   if (w / r <= 9 && h / r <= 16) {

    //   } else {
    //     setError(
    //       'Video is not under valid aspect ratio please upload video under 9:16 aspect ratio',
    //     );
    //   }
    //   video.remove();
    // });
  }, []);

  const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    // borderWidth: 2,
    // borderRadius: 2,
    // borderColor: '#808080',
    // borderStyle: 'dashed',
    backgroundColor: '#ffffff',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out',
  };

  const focusedStyle = {
    borderColor: '#2196f3',
  };

  const { getRootProps, getInputProps, isDragActive, isFocused } = useDropzone({
    onDrop,
    accept: {
      'video/*': [],
      'image/*': [],
    },
    type: 'file',
  });

  const updateDetails = async (inputVal, files) => {
    try {
      let input = {
        videoFile: {
          bucket: inputVal?.bulkVideos[0].bucket,
          key: inputVal?.bulkVideos[0].key,
          region: inputVal?.bulkVideos[0].region,
        },
        title: inputVal?.fileName,
        isActive: false,
      };
      // const result = await API.graphql(
      //   graphqlOperation(createHomePageVideo, { input }),
      // );
    } catch (error) {
      console.log({ error });
    }
  };

  // const handleFileChange = (event) => {
  //   const file = event?.target?.files[0];
  //   onDropFile(file);
  //   const url = window?.URL?.createObjectURL(file);
  //   setSource([url]);
  // };

  const handleCancelVideo = () => {
    setPictures([]);
    setSource('');
    onHandleDrop([]);
  };

  const uploadVideo = async () => {
    if (!pictures?.length) {
      toast.error('Please upload video');
      return false;
    }

    // Uplaod the video first
    setLoading(true);
    let videoTitle = fileNameSlugify(pictures[0].name || '');
    const promises = [];
    if (pictures.length > 0) {
      pictures.forEach((pic) => {
        const filename = `${fileNameSlugify(
          pic.name || '',
        )}__${uuid()}${Date.now()}`;
        promises.push(
          Storage.put(filename, pic, {
            contentType: pic.type,
          }),
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
      id: '',
      bulkVideos: [].concat(existingBulkPictures, files).filter((item) => item),
      fileName: videoTitle,
    };
    try {
      console.log({
        existingBulkPictures,
        bulkVideos: input.bulkVideos,
      });
      await updateDetails(input, files);
      toast.success('Video uploaded successfully');
      emitCustomEvent('video-uploaded', { data: input });
      setLoading(false);
      // handleClose && handleClose();
    } catch (error) {
      console.log('Encountered Error', error);
      setLoading(false);
    }
  };

  const addOrUpdateItems = () => {
    // createItem();
  };

  useEffect(() => {
    setDidMount(false);
  }, []);

  const createItem = async () => {
    setLoading(true);

    try {
      const promises = [];

      if (pictures.length > 0) {
        pictures.forEach((pic) => {
          const filename = `${uuid()}${Date.now()}`;
          promises.push(
            new Promise(async function (res, rej) {
              await Resizer.imageFileResizer(
                pic,
                1500,
                1500,
                'JPEG',
                100,
                0,
                async (uri) => {
                  Storage.put(filename, uri, {
                    contentType: pic.type,
                  })
                    .then((result) => {
                      //return result;
                      res(result);
                    })
                    .catch((err) => console.log(err));
                },
                'blob',
              );
            }),
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

      const input = {
        name: name,
        file: files[0] ? files[0] : null,
        backgroundColor: backgroundColor,
        fontColor: fontColor,
      };
      setLoading(true);
      const result = await API.graphql(
        graphqlOperation(createDelivery, { input }),
      );
    } catch (error) {
      console.log('Encountered Error', error);
      setLoading(false);
      toast.error('Error while adding item');
    }
  };

  const onDropFile = (picture) => {
    onHandleDrop([picture]);
    setPictures([picture]);
  };

  const onVideoLoadedMetadata = (e) => {
    onVideoLoadMetaData(e,videoPlayerRef)
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
    }),
    [isFocused],
  );

  return (
    <Container maxWidth="md">
      {/* {loading && <Loading title={'Loading..Please wait'} />} */}
      <form className={[classes.root, disable && classes.disableForm]} noValidate autoComplete="off">
        <div className={[classes.btnVideoContainer, disable && classes.disableForm]}>
          <Card sx={{ minWidth: 275 }}>
            <CardContent>
              {(!source && urls?.length === 0) ? (
                <div {...getRootProps({ style,onClick:e => e.preventDefault() })}>
                  <img
                    src="/images/uploadIcon.svg"
                    class="uploadIcon"
                    alt="Upload Icon"
                  />
                  <p>Upload image or video (jpg, png, mp3, mp4 and gif format only and video only portrait mode)</p>
                  <label htmlFor="upload-photo" align="center">
                    <input
                      style={{ display: 'none'}}
                      id={inputName || "upload-photo"}
                      name={inputName ||"upload-photo"}
                      type="file"
                      ref={inputRef}
                      accept="video/*,image/*"
                      {...getInputProps()}
                    />
                    <Button
                      color="primary"
                      variant="outlined"
                      component="span"
                      align="center"
                      className={[classes.btnChoose,disable && classes.disabledButton]}
                      disabled={disable}
                      >
                      Choose image/video
                    </Button>
                  </label>
                  <p className={classes.lblError}>{error}</p>
                </div>
              ) : (
                <div className={classes.imageWrapper}>
                    {source?.length > 0 && source?.map((url, index) => (
                      <div key={index} className={classes.imageItem}>
                       {pictures[0]?.type?.split('/')[0] === 'video' ?
                          <video
                            className={classes.videoPlayer}
                            width="100%"
                            height={300}
                            controls
                            src={[url]}
                            ref={videoPlayerRef}
                            onLoadedMetadata={(e) => onVideoLoadedMetadata(e)}
                          />
                       :  <img src={url} alt="uploaded image" style={{width: '100%', maxHeight: '200px'}} /> }
                        <IconButton id="btnCancelFile" className={classes.closeIcon} aria-label="remove image" component="span" onClick={() => handleCancelVideo()}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    ))}


                    {urls?.length > 0 &&
                      <div  className={classes.imageItem}>
                          <video
                            className={classes.videoPlayer}
                            width="100%"
                            height={300}
                            controls
                            src={`${CF_URL}/${urls[0]}`}
                          />
                        <IconButton id="btnCancelFile" className={classes.closeIcon} aria-label="remove image" component="span" onClick={() => handleCancelVideo()}>
                          <CloseIcon />
                        </IconButton>
                      </div>
                    }
                  </div>



                // <div className={classes.videoPlayContainer}>
                //   <video
                //     className={classes.videoPlayer}
                //     width="100%"
                //     height={300}
                //     controls
                //     src={source}
                //   />
                //   <IconButton
                //     onClick={() => handleCancelVideo()}
                //     className={classes.imageCloseIcon}>
                //     <CloseIcon className={classes.svgIcon} />
                //   </IconButton>
                // </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* <div className={classes.submitBtn}>
          <Button
            variant="contained"
            id="btnCMSave"
            onClick={uploadVideo}
            className={classes.btnNextPrev}>
            Save Video
          </Button>
        </div> */}
      </form>
      {/* END */}
    </Container>
  );
};

export default FileUpload;
