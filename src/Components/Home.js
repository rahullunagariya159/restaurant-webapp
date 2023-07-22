import Container from '@material-ui/core/Container';
import { Divider, Box, Card, CardContent, Grid, CardHeader, Typography } from '@material-ui/core';
import {useRestaurant} from "../Context/RestaurantContext";
import {getDashBoardActiveAndPending} from "../graphql/queries";
import {useQuery} from "@apollo/client";
import Link from "@material-ui/core/Link";
import {CUSTOMER_FACING_APP_URL} from "../consts";
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';

function Dashboard() {
    const { restaurant={}, userdetails } = useRestaurant()
    const results = useQuery(getDashBoardActiveAndPending, {
        fetchPolicy: "cache-and-network",
        variables: {id: userdetails.restaurantContact},
    })
    const items = results?.data?.getRestaurant?.cards?.items || [];
    const disabled = items.filter(item => (!item?.isActive && item?.isActive !== null)).length || 0;
    const pending = items.filter(item => item?.isPendingReview).length || 0;
    const active = items.filter(item => (item?.isActive || item?.isActive === null)).length || 0;

	return (
        <Container maxWidth="xl" style={{marginTop: 20}}>
            <Typography>
                Welcome {restaurant?.name}
            </Typography>
            <Typography>
                Get a quick view of your menus and more.
            </Typography>
            <Button LinkComponent={Link} target='_blank' href={`${CUSTOMER_FACING_APP_URL}${restaurant?.cityNameSlug}/${restaurant?.restaurantUrl}`} startIcon={<VisibilityIcon />}>View restaurant profile</Button>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Grid
                    container
                    spacing={3}
                    sx={{ justifyContent: 'space-between' }}
                >
                    <Grid item sm={4}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Grid item>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="overline"
                                            className='total-active-item'
                                        >
                                            TOTAL ACTIVE ITEM
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            {active}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    pt: 2
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        variant="caption"
                                    >
                                        Menu Item
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Grid item>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="overline"
                                        >
                                            TOTAL NOT ACTIVE ITEM
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            {disabled}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    pt: 2
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        variant="caption"
                                    >
                                        Menu item
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={4}>
                        <Card>
                            <CardContent>
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Grid item>
                                        <Typography
                                            color="textSecondary"
                                            gutterBottom
                                            variant="overline"
                                        >
                                            TOTAL PENDING ITEM
                                        </Typography>
                                        <Typography
                                            color="textPrimary"
                                            variant="h4"
                                        >
                                            {pending}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Box
                                    sx={{
                                    alignItems: 'center',
                                    display: 'flex',
                                    pt: 2
                                    }}
                                >
                                    <Typography
                                        color="textSecondary"
                                        variant="caption"
                                    >
                                        Menu item
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={6}>
                        <Card>
                            <CardHeader title="Notification" />
                                <Divider />
                            <CardContent>
                                <Box sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    pt: 2,
                                    height: 300
                                }}>
                                    <Typography
                                        color="textSecondary"
                                        variant="caption"
                                    >
                                        No New Notification
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </Container>
	);
}

export default Dashboard;
