import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import ChipInput from './ChipInput';

const useStyles = makeStyles((theme) => ({
    btn: {
        textTransform: 'none',
        width: '190px'
    },
    wrap: {
        marginTop: theme.spacing(2)
    },
    chip: {
        maxWidth:'425px'
    }
}))

function Chip(props) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [stateChips, setStateChips] = React.useState([])
    const [text, setText] = React.useState()
    const {title, items, selectedItems, selectedText} = props

    React.useEffect(() => {
        if(selectedItems) {
            setStateChips(selectedItems);
        }
        if(selectedText) {
            setText(selectedText)
        }
    }, [items, selectedText])

    const handleClickOpen = () => {
        if(!props.disabled) {
            setOpen(true);
        }
    };

    const handleClose = () => {
        if(props.hasText) {
            props.currentText(text)
        }
        setOpen(false);
    };
    const handleChange = val => {
        if(stateChips.includes(val)) {
            let newChips = stateChips.filter(i => i !== val)
            setStateChips(newChips)
            props.currentval(newChips);
        } else {
            const newChips = [...stateChips, val];
            setStateChips(newChips);
            props.currentval(newChips);
        }
    }

    const onOrdersChange = orders => {
        setStateChips(orders);
        props.currentval(orders);
    }

    let chipThemeConfig = {};
    if(props.disabled){
        chipThemeConfig = {
            chipRemove: {
                display: 'none'
            }
        }
    }

    return (
        <div className={classes.wrap}>
            <Button id={props?.id} variant="outlined" color="primary" onClick={handleClickOpen} className={classes.btn} disabled={props.disabled}>
                {title}
            </Button>
            {
                stateChips.length > 0 ? (
                    <div className={classes.chip}>
                      <ChipInput disabled={props?.disabled} options={stateChips || ["Delivery", "Pickup", "Dine in"]} placeholder="" selectedItems={stateChips} onOptionChange={onOrdersChange}/>
                      {/* <Chips
                            value={stateChips}
                            onChange={onOrdersChange}
                            suggestions={["Delivery", "Pickup", "Dine in"]}
                            chipTheme={chipThemeConfig}
                            disabled={true}
                        /> */}
                    </div>
                ) : null
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
            {
                items && items.map(i => (
                <div key={i}>
                    <Checkbox
                        checked={stateChips.includes(i)}
                        onChange={() => {handleChange(i)}}
                        value={i}
                        disabled={props.disableSelect}
                        id={props.id + "Checkbox"}
                    />
                    <span>{i}</span>
                    { props.hasText && stateChips.includes(i) ? (
                        <div>
                            <input
                                disabled={props.disabled}
                                value={text[i]}
                                placeholder="Url"
                                onChange={event => {
                                    setText({
                                        ...text,
                                        [i]:  event.target.value
                                    })
                                }
                            }/>
                        </div>
                    ) : null }
                </div>
                ))
            }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
                    Done
                </Button>
            </DialogActions>
            </Dialog>
        </div>
    );
}

export default Chip;
