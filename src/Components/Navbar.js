import { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import Container from '@material-ui/core/Container';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import MenuItem from '@material-ui/core/MenuItem';
import {Link, useHistory, useLocation} from "react-router-dom";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import {Auth} from "aws-amplify";
import { Helmet } from 'react-helmet';
import {makeStyles} from '@material-ui/core/styles';

import logo from "./logo1.png";
import {useAuth} from "../Context/AuthContext";
import {useRestaurant} from "../Context/RestaurantContext";
import { CF_URL } from 'consts';

const useStyles = makeStyles((theme) => ({
	menuItem: {
		'@media(max-width: 1200px)' : {
			minWidth:'90px'
	  },
	},
  container :{
    '@media(max-width: 1200px)' : {
			padding: '0 12px'
	  },
  }
}));
const ResponsiveAppBar = () => {
	const classes = useStyles();
	const [anchorElNav, setAnchorElNav] = useState(null)
	const [anchorElUser, setAnchorElUser] = useState(null)
	const history = useHistory()
	const location = useLocation()
	const { userdetails, isRestaurantOwner, isPhotographer, isCustomerSupport } = useAuth()
	const { restaurant={} } = useRestaurant()
	const { file=[] } = restaurant || {};
	let url = '';
	if( file && file.length > 0){
		url = `${CF_URL}/${file[0].key}`;
	}

	let restaurantImage = '/static/images/avatar/2.jpg';
	if(restaurant && restaurant.file && restaurant.file.length > 0 && isRestaurantOwner) {
		restaurantImage = `${CF_URL}/${restaurant.file[0].key}`
	}

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	const logout = async () => {
		await Auth.signOut();
		handleCloseUserMenu();
    window.location.replace(isCustomerSupport? '/cs-login': isPhotographer ? '/photographer-login' :'/login')
	};

	const menus = [
		{
			'to': '/items',
			'label': 'Menu Items'
		},
    {
			'to': '/custom-menu',
			'label': 'Custom Menu'
		},
		// {
		// 	'to': '/pending-items',
		// 	'label': 'Pending Menu Items'
		// },
		{
			'to': '/bulk-uploads',
			'label': 'Upload Bulk Images'
		},
		{
			'to': '/story',
			'label': "Story"
		},
    {
      'to': '/rewards',
			'label': "Rewards"
    },
    {
      'to': '/followers',
			'label': "Followers"
    }
	];

	const customerSupport = [
		{
			'to': '/cs/approved-restaurant',
			'label': 'Approved Restaurant'
		}
	];

	const photographers = [
		{
			'to': '/ph/restaurant',
			'label': 'Restaurants'
		}
	];

	return (
		<AppBar position="sticky" color={'inherit'}>
		{
			restaurant &&
			<Helmet>
				<title>{restaurant?.name}</title>
				<meta name="description" content={restaurant?.description} />
			  <link rel="icon" href={logo}/>
				<link rel="apple-touch-icon" href={logo} />
			</Helmet>
		}

			<Container maxWidth="xl" className={classes.container}>
				<Toolbar disableGutters style={{justifyContent: 'space-between'}}>
					<Box sx={{  display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size="large"
							aria-label="account of current user"
							aria-controls="menu-appbar"
							aria-haspopup="true"
							onClick={handleOpenNavMenu}
							color="inherit"
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
							style={{
								top: 50
							}}
						>

							{userdetails?.id ? <MenuItem onClick={handleCloseNavMenu} component={Link} to={'/'} selected={ location.pathname === '/'}>
								<Typography textAlign="center">Home</Typography>
							</MenuItem> : null}
							{
								userdetails?.restaurantContact && isRestaurantOwner ? menus.map((menu) => {
                  return (
											<MenuItem onClick={handleCloseNavMenu} component={Link} to={menu.to} selected={ location.pathname.indexOf(menu.to) > -1}><Typography textAlign="center">{menu.label}</Typography></MenuItem>
										)
								} ) : null
							}
							{
								userdetails?.id && isCustomerSupport ? customerSupport.map((menu) => {
										return (
											<MenuItem onClick={handleCloseNavMenu} component={Link} to={menu.to} selected={ location.pathname.indexOf(menu.to) > -1}><Typography textAlign="center">{menu.label}</Typography></MenuItem>
										)
								} ) : null
							}
							{
								userdetails?.id && isPhotographer ? photographers.map((menu) => {
										return (
											<MenuItem onClick={handleCloseNavMenu} component={Link} to={menu.to} selected={ location.pathname.indexOf(menu.to) > -1}><Typography textAlign="center">{menu.label}</Typography></MenuItem>
										)
								} ) : null
							}
							{!userdetails?.restaurantContact && isRestaurantOwner ? <MenuItem onClick={handleCloseNavMenu} component={Link} to={'/add-restaurant'} selected={ location.pathname === '/add-restaurant'}><Typography textAlign="center">Add Restaurant</Typography> </MenuItem> : null}
							</Menu>
					</Box>
					<Link to='/'>
						<img
							src={logo}
							alt="Logo"
							style={{ height: '45px', marginBottom: '10px', marginTop: '10px' }}
						/>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 5 }}>
						<Tabs
							value={location.pathname}
							indicatorColor="primary"
							textColor="primary"
							centered
						>
							{userdetails?.id ? <Tab className={classes.menuItem} label="Home" value="/" to="/" component={Link} /> : null}
							{!userdetails?.restaurantContact && isRestaurantOwner ? <Tab label="Add Restaurant" value="/add-restaurant" to="/add-restaurant" component={Link} /> : null}

							{
								userdetails?.restaurantContact && isRestaurantOwner ? menus.map((menu) => {
									return (
										<Tab className={classes.menuItem} label={menu.label} value={menu.to} to={menu.to} component={Link} />
									)
								} ) : null
							}
							{
								userdetails?.id && isCustomerSupport ? customerSupport.map((menu) => {
									return (
										<Tab className={classes.menuItem} label={menu.label} value={menu.to} to={menu.to} component={Link} />
									)
								} ) : null
							}
							{
								userdetails?.id && isPhotographer ? photographers.map((menu) => {
									return (
										<Tab className={classes.menuItem} label={menu.label} value={menu.to} to={menu.to} component={Link} />
									)
								} ) : null
							}
						</Tabs>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt={(restaurant?.name || userdetails?.firstname) || ""} src={restaurantImage} />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: '45px' }}
							id="right-menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'right',
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
							style={{
								top: 45
							}}
						>
              <MenuItem onClick={handleCloseUserMenu}>{userdetails?.email}</MenuItem>
							<MenuItem onClick={handleCloseUserMenu}>
								<Button id="logout" variant="contained" color="secondary" onClick={logout}>
									Logout
								</Button>
							</MenuItem>
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default ResponsiveAppBar;
