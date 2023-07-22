import React, { useState, useEffect } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import Typography from '@material-ui/core/Typography';

const LightBox = (props) => {
	const [photoIndex, setPhotoIndex] = useState(0);
	const [isOpen, setIsOpen] = useState(props.isOpen);
	const { images=[], onCloseLightbox} = props;

	useEffect(() => {
		if(props.isOpen)
			setIsOpen(props.isOpen)
	}, [props.isOpen]);

	const onClose = () => {
		setIsOpen(false)
		if(onCloseLightbox){
			onCloseLightbox()
		}
	}
  const customStyles = {
    content: {
		  top: '70px',
	  },
	  overlay: {
		  zIndex:1500,
	  }
  };

  const imageCaption = () => {
    if(props?.imageDetails[photoIndex]?.description){
      return (
        <div><Typography>{props?.imageDetails[photoIndex]?.description}</Typography> <Typography>Price: ${props?.imageDetails[photoIndex]?.price} </Typography> </div>
      )
    }
  }
	return (
		<div>
			{isOpen && images.length && (
				<Lightbox
					mainSrc={images[photoIndex]}
					nextSrc={images[(photoIndex + 1) % images.length]}
					prevSrc={images[(photoIndex + images.length - 1) % images.length]}
					onCloseRequest={() => onClose()}
					onMovePrevRequest={() =>
						setPhotoIndex((photoIndex + images.length - 1) % images.length)
					}
					onMoveNextRequest={() =>
						setPhotoIndex((photoIndex + 1) % images.length)
					}
          imageTitle={props?.imageDetails[photoIndex]?.name}
          imageCaption={imageCaption()}
          reactModalStyle={customStyles}
				/>
			)}
		</div>
	);
}
export default LightBox;
