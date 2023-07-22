import { useEffect, useState } from 'react'
import { Container, Box, Card, CardContent, Grid,  Button, TextField, CircularProgress, Divider } from '@material-ui/core'
import {useLazyQuery} from "@apollo/react-hooks"
import {getRestaurantUnapproved} from "../../graphql/queries"
import {CF_URL} from "../../consts"
import Typography from "@material-ui/core/Typography"
import {useParams} from "react-router-dom"
import ApprovedRestaurantDialog from "../CustomerSupport/ApprovedRestaurantDialog"

function RestaurantApproveProcess() {
	const {restaurantId} = useParams()
	const [values, setValues] = useState({
		restaurantId: restaurantId,
		loading: false,
	})
	const [hasError, setHasError] = useState(false)
	const [loading, setLoading] = useState(false)
	const [isValidRestaurantId, setIsValidRestaurantId] = useState(false)
	const [getRestaurantById] = useLazyQuery(getRestaurantUnapproved)
	const [restaurant, setRestaurant] = useState(null)

	useEffect(() => {
		if(restaurantId){
			setValues({
				...values,
				restaurantId: restaurantId
			})
			onValidate()
		}
	}, [restaurantId])

	const handleChange = (event) => {
		setValues({
			...values,
			[event.target.name]: event.target.value.trim()
		})
		setHasError(false)
		setIsValidRestaurantId(false)
		setRestaurant(null)
	}

	const fetchRecords = async() => {
		try{
			const { data} = await getRestaurantById({variables: { id: values.restaurantId }})
			const restaurant = data.getRestaurantUnapproved || {}
			// setExistingBulkPictures(sortByName(restaurant.bulkImages))
			if(restaurant && !restaurant.id){
				setIsValidRestaurantId(true)
			} else {
				setRestaurant(restaurant)
			}
		} catch (e){
		}
	}

	const onValidate = async () => {
		try{
			setLoading(true)
			setIsValidRestaurantId(false)
			if(!values.restaurantId){
				setHasError(true)
			} else {
				await fetchRecords()
			}
		} catch (e) {
			console.log({e})
		} finally {
			setLoading(false)
		}
	}

	let restaurantImage = '/images/placeholder-image.jpeg'
	if(restaurant && restaurant.file && restaurant.file.length > 0) {
		restaurantImage = `${CF_URL}/${restaurant.file[0].key}`
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
			{
				restaurant && restaurant.id ?
					<div>
						<Grid container spacing={3} style={{marginBottom: 5}}>
							<Grid item xs={12}>
								<Grid container spacing={3} style={{marginBottom: 5}}>
									<Grid item xs={3}>
										<img src={restaurantImage} style={{width: '100%',maxHeight:'150px',objectFit:'contain'	}} alt='' />
									</Grid>
									<Grid item xs={9}>
										<Typography variant="h5" component="h2">
											{restaurant?.name}
										</Typography>
										<Typography color="textSecondary">
											{restaurant?.description}
										</Typography>
										<Typography color="textSecondary">
											{restaurant?.address}&nbsp;{restaurant?.city},&nbsp;{restaurant?.zip}
										</Typography>
										<br />
										<Divider />
										<br />
										<ApprovedRestaurantDialog restaurant={restaurant} />
									</Grid>
								</Grid>
								<Divider />
							</Grid>
						</Grid>
					</div> : null
			}
		</Container>
	)
}

export default RestaurantApproveProcess
