import { useState } from "react";
import Button from "@material-ui/core/Button";
import { CUSTOMER_FACING_APP_URL } from "../../consts";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import IconButton from "@material-ui/core/IconButton";
import Popover from "@mui/material/Popover";
import { makeStyles } from "@material-ui/core/styles";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ListItemText from "@mui/material/ListItemText";

const useStyles = makeStyles((theme) => ({
    root: {
        '&.MuiListItem-dense': {
            paddingLeft: 5,
            paddingRight: 5,
        }
    },
    btnActionContainer: {
    "& > *": {
      margin: theme.spacing(0.5),
    },
    "@media (max-width:991px)": {
      display: "none",
    },
    },
  buttonActionContainer: {
    display: "none",
    "@media (max-width: 991px)": {
      display: "block",
    },
    },
    listItemIcon: {
        minWidth:'40px !important',
    }
}));

const ActionCell = ({ row, value, performOperation, addRewardsbutton, viewRewardsbutton }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [popOverOpen, setpopOverOpen] = useState(false);

  const handlePopOverClose = () => {
    setAnchorEl(null);
    setpopOverOpen(!popOverOpen);
  };

  const handlePopOverOpen = (event) => {
    setAnchorEl(event.currentTarget);
    setpopOverOpen(!popOverOpen);
  };

  return (
    <>
      <div className={classes.btnActionContainer}>
        <Button
          variant="outlined"
          id="btnCsAddCard"
          onClick={() => {
            performOperation(row);
          }}
          startIcon={<AddIcon />}
        >
          Add Card
        </Button>
        <Button
          variant="outlined"
          id="btnCsAddReward"
          onClick={() => {
            addRewardsbutton(row);
          }}
          startIcon={<AddIcon />}
        >
          Add Rewards
        </Button>
        <Button
          variant="outlined"
          id="btnCsViewReward"
          startIcon={<VisibilityIcon />}
          onClick={() => {
            viewRewardsbutton(row);
          }}
        >
          View Rewards
        </Button>
        <Button
          id="btnCsPublicLink"
          variant="outlined"
          underline="none"
          color="black"
          href={`${CUSTOMER_FACING_APP_URL}${row?.original?.cityNameSlug}/${row?.original?.restaurantUrl}`}
          target="_blank"
          startIcon={<VisibilityIcon />}
        >
          View restaurant
        </Button>
      </div>
      <div className={classes.buttonActionContainer}>
        <IconButton onClick={handlePopOverOpen}>
          <MoreHorizIcon />
        </IconButton>
        <Popover
          open={popOverOpen}
          anchorEl={anchorEl}
          onClose={handlePopOverClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <List dense={true}>
            <ListItem disablePadding className={classes.root}>
              <ListItemButton
                onClick={() => {
                  performOperation(row);
                }}
              >
                <ListItemIcon className={classes.listItemIcon}>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Card" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding  className={classes.root}>
              <ListItemButton
                onClick={() => {
                  addRewardsbutton(row);
                }}
              >
                <ListItemIcon  className={classes.listItemIcon}>
                  <AddIcon />
                </ListItemIcon>
                <ListItemText primary="Add Rewards" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className={classes.root}>
              <ListItemButton
                onClick={() => {
                  viewRewardsbutton(row);
                }}
              >
                <ListItemIcon  className={classes.listItemIcon}>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View Rewards" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding className={classes.root}>
              <ListItemButton
                href={`${CUSTOMER_FACING_APP_URL}${row?.original?.cityNameSlug}/${row?.original?.restaurantUrl}`}
                target="_blank"
              >
                <ListItemIcon  className={classes.listItemIcon}>
                  <VisibilityIcon />
                </ListItemIcon>
                <ListItemText primary="View restaurant" />
              </ListItemButton>
            </ListItem>
          </List>
        </Popover>
      </div>
    </>
  );
};
export default ActionCell;