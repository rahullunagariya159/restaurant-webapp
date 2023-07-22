import React, { useState } from "react";
import LightBox from './../LightBox';
import {CF_URL} from "../../consts";
import Typography from '@material-ui/core/Typography';

const LightBoxCell = ({value=[], row}) => {
	const [isOpen, setIsOpen] = useState(false);
	const img = value?.length > 0 ? value[0]?.key : ''
	const images = value?.map(img => img && `${CF_URL}/${img?.key}`)
	return (
		<div>
			<img
				src={`${CF_URL}/${img}`}
				srcSet={`${CF_URL}/${img}`}
				alt={row?.values?.name}
				loading="lazy"
				width={50}
				onClick={()=> setIsOpen(true)}
				style={{cursor: 'pointer'}}
			/>
			<Typography variant="subtitle1" style={{cursor: 'pointer', fontSize: 12}} onClick={()=> setIsOpen(true)}>View All</Typography>
			{
				img && <LightBox images={images} imageDetails={row} isOpen={isOpen} onCloseLightbox={()=> setIsOpen(false)} />
			}
		</div>
	);
}
export default LightBoxCell;
