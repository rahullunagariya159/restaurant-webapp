import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const NotFound = () => (
	<>
		<Box
			component="main"
			sx={{
				alignItems: 'center',
				display: 'flex',
				flexGrow: 1,
				minHeight: '100vh'
			}}
		>
			<Container maxWidth="md">
				<Box
					sx={{
						alignItems: 'center',
						display: 'flex',
						flexDirection: 'column'
					}}
				>
					<Typography
						align="center"
						color="textPrimary"
						variant="h3"
						sx={{
							fontWeight: 700,
							fontSize: '3.5rem',
							lineHeight: 1.375
						}}
					>
						404: The page you are looking for isn’t here
					</Typography>
					<Typography
						align="center"
						color="textPrimary"
						variant="subtitle2"
					>
						You either tried some shady route or you came here by mistake.
						Whichever it is, try using the navigation
					</Typography>
				</Box>
			</Container>
		</Box>
	</>
);

export default NotFound;