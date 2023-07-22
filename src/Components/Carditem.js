import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CF_URL } from 'consts';

const useStyles = makeStyles({
  root: {
    width: 'auto',
    maxWidth: '300px',
    marginTop: '25px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },

  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SimpleCard(props) {
  const classes = useStyles();
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
          {props.card.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
            {props.card.description}
        </Typography>
        {
            props.card.picture && props.card.picture[0] ? (
                <img src={`${CF_URL}/${props.card.picture[0]?.key}`}
                    style={{ maxWidth: '175px', maxHeight: '175px' }}
                />
            ) : <img src="https://bitsofco.de/content/images/2018/12/broken-1.png" style={{ maxWidth: '175px', maxHeight: '175px' }}/>
        }
      </CardContent>
      <CardActions>
        <Button size="small" onClick={props.action}>{props.actionTitle}</Button>
      </CardActions>
    </Card>
  );
}
