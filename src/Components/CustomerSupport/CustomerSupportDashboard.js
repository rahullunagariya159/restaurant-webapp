import { useState } from 'react';
import { Container, Box, Card, CardContent, Grid,  Button, TextField, CircularProgress } from '@material-ui/core';
import {useHistory} from "react-router-dom";

function Dashboard() {
	const history = useHistory()
	const [values, setValues] = useState({
		restaurantId: '',
		loading: false,
	});
	const [hasError, setHasError] = useState(false);
	const [loading, setLoading] = useState(false);
	const [isValidRestaurantId, setIsValidRestaurantId] = useState(false);

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value
		});
		setHasError(false)
		setIsValidRestaurantId(false);
	};


	const onValidate = async () => {
		try{
			setLoading(true)
			setIsValidRestaurantId(false);
			if(!values.restaurantId){
				setHasError(true)
			} else {
				history.push(`/cs/restaurant/${values.restaurantId}`)
			}
		} catch (e) {
			console.log({e});
		} finally {
			setLoading(false)
		}
	}

	return (
		<Container maxWidth="lg">
			<Box
				component="main"
				sx={{
					flexGrow: 1,
					py: 8
				}}
			>
				<form
					autoComplete="off"
					noValidate
				>
					<Card>
						<CardContent>
							<Grid
								container
								spacing={3}
							>
								<Grid item lg={10} md={10} sm={12} xs={12}>
									<TextField
										fullWidth
										helperText={ isValidRestaurantId? "Please specify the correct restaurant Id " : "Please specify the restaurant Id"}
										label="Restaurant ID"
										name="restaurantId"
										onChange={handleChange}
										required
										value={values.restaurantId}
										variant="outlined"
										error={hasError || isValidRestaurantId}
									/>
								</Grid>
								<Grid item >
									<Box
										sx={{
											display: 'flex',
											justifyContent: 'flex-end',
											p: 2
										}}
									>
										<Button
                      id="btnValidateRestaurantCs"
											color={loading? "" :"primary"}
											variant="contained"
											disabled={loading}
											onClick={onValidate}
										>
											{
												loading ? <CircularProgress size={18} /> : ''
											}
											Validate
										</Button>
									</Box>
								</Grid>
							</Grid>
						</CardContent>
					</Card>
				</form>
			</Box>
		</Container>
	);
}

export default Dashboard;
