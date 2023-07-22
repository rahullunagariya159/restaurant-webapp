import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Button from "@material-ui/core/Button";
import {Auth} from "aws-amplify";
import {useHistory} from "react-router-dom";

const PermissionDenied = () => {
	const history = useHistory()
	const logout = async () => {
		await Auth.signOut();
		history.push('/login')
	};

	return (
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
							Permission Denied
						</Typography>
						<Typography
							align="center"
							color="textPrimary"
							variant="subtitle2"
						>
							You either tried some shady route or you came here by mistake.
							Whichever it is, try using the navigation

						</Typography>
						<Button variant="contained" color="secondary" onClick={logout} style={{marginTop: 10}}>
							Logout
						</Button>
					</Box>
				</Container>
			</Box>
		</>
	)
};

export default PermissionDenied;