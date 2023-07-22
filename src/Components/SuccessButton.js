import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { fade } from "@material-ui/core/styles/colorManipulator";
import Button from "@material-ui/core/Button";
import purple from "@material-ui/core/colors/green";

// Defining custom button colors using withStyles.
// You can replace purple with any Material UI color.
const styles = theme => ({
	/**
	 * Color styles for text (aka flat) buttons
	 * NOTE: these styles are also applied to the outlined varaint.
	 * @see https://github.com/mui-org/material-ui/blob/8995f085904eb55bcb5861fb6d8a32fbd38d72eb/packages/material-ui/src/Button/Button.js#L50-L59
	 */
	textPurple: {
		color: 'white',
		"&:hover": {
			backgroundColor: fade(purple[500], theme.palette.action.hoverOpacity),
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				backgroundColor: "transparent"
			}
		}
	},

	/**
	 * Color styles for outlined buttons.
	 * Note: These styles are combined with the text button styles (.textPurple)
	 * @see https://github.com/mui-org/material-ui/blob/8995f085904eb55bcb5861fb6d8a32fbd38d72eb/packages/material-ui/src/Button/Button.js#L84-L92
	 */
	outlinedPurple: {
		border: `1px solid ${fade(purple[500], 0.5)}`,
		"&:hover": {
			border: `1px solid ${purple[500]}`
		},
		// Disabled styles for outlined button...
		// NOTE: You need to pass `classes={{disabled: classes.diabled}}` to
		// the Button component for these styles to work. You also need have
		// a .disabled class in your style rules.
		"&$disabled": {
			border: `1px solid ${theme.palette.action.disabled}`
		}
	},

	/**
	 * Color styles for contained (aka raised) buttons
	 * @see https://github.com/mui-org/material-ui/blob/8995f085904eb55bcb5861fb6d8a32fbd38d72eb/packages/material-ui/src/Button/Button.js#L131-L141
	 */
	containedPurple: {
		color: 'white',
		backgroundColor: purple[500],
		"&:hover": {
			backgroundColor: purple[700],
			// Reset on touch devices, it doesn't add specificity
			"@media (hover: none)": {
				backgroundColor: purple[500]
			}
		}
	},

	// This is required for the '&$disabled' selector to work
	disabled: {}
});

function SuccessButton(props) {
	const { classes, children } = props;
	return [
		<Button variant="contained" {...props} className={classes.containedPurple}>
			{children}
		</Button>
	];
}
export default withStyles(styles)(SuccessButton);
