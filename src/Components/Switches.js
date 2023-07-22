import { useState } from "react";
import Switch from "@material-ui/core/Switch";
import Grid from "@material-ui/core/Grid";

export default function Switches(props) {
	const [state, setState] = useState({
		checkedA: props.checked
	});

	const handleChange = name => event => {
		setState({ ...state, [name]: event.target.checked });
		if(props.onChange){
			props.onChange(event.target.checked)
		}
	};

	return (
		<div>
			<Grid component="label" container alignItems="center" spacing={1}>
				<Grid item>{props?.offLabel || 'Off'}</Grid>
				<Grid item>
					<Switch
						checked={state.checkedA}
						onChange={handleChange("checkedA")}
						value="checkedA"
						color={props.color || 'primary'}
					/>
				</Grid>
				<Grid item>{props?.onLabel || 'On'}</Grid>
			</Grid>
		</div>
	);
}
