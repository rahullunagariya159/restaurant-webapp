import React, { useState } from "react";
import {CF_URL} from "../../consts";
import FsLightbox from 'fslightbox-react';
import { IconButton } from "@material-ui/core";
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import Typography from '@material-ui/core/Typography';

const VideoLightBoxCell = ({value=[], row}) => {
	const [isOpen, setIsOpen] = useState(false);
	const vid = value?.length > 0 ? value[0]?.key : ''
	const videos = value?.map(video => vid && `${CF_URL}/${video?.key}`)
	return (
		<div>
      <IconButton style={{cursor: 'pointer'}} onClick={()=> setIsOpen(!isOpen)}>
        <PlayCircleIcon fontSize="large"/>
      </IconButton>
      <Typography variant="subtitle1" style={{cursor: 'pointer', fontSize: 12,}} onClick={()=> setIsOpen(!isOpen)}>Play Video</Typography>
			{
			vid &&
      <FsLightbox
        toggler={isOpen}
        sources={videos}
        type="video"
        types={['video']}
      /> }
		</div>
	);
}
export default VideoLightBoxCell;
