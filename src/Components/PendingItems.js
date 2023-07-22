import {useEffect, useState} from 'react';
import {API, graphqlOperation} from 'aws-amplify';
import { getItemsByResturantId } from '../graphql/queries';
import { deleteUnapprovedItem } from '../graphql/mutations';
import SimpleCard from './Carditem';
import { makeStyles } from '@material-ui/core/styles';
import MessageBox from './MessageBox';
import {useAuth} from "../Context/AuthContext";


const useStyles = makeStyles({
    wrap: {
      display: 'flex',
      flexDirection: 'column',
      padding: '10px'
    },
    wrapper: {
        display: 'grid',
        gridTemplateColumns: 'auto auto auto'
    }
});

const PendingItems = () => {
    const classes = useStyles();
    const { userdetails } = useAuth();

    const [items, setItems] = useState([])
    const [showmessage, setShowmessage] = useState(false);

    useEffect(() => {
        getPendingItems()
    }, [])

    const deleteThisItem = async (id) => {
        try {
            const result = await API.graphql(graphqlOperation(deleteUnapprovedItem,
                { input: {id} }));
            setShowmessage(true);
            setItems(items.filter((i) => i.id !== id));

        } catch (error) {
            console.log('Encountered Error', error)
        }
    }

    const getPendingItems = async () => {
        let id = userdetails.restaurantContact;
        try {
            const result = await API.graphql(graphqlOperation(getItemsByResturantId, { restaurantID: id, filter: { isApproved: { eq: 'PENDING' } } }));
            setItems(result.data.getItemsByResturantId.items)
        } catch (error) {
            console.log('Encountered Error', error)
        }
    }

    if(showmessage) {
        return <MessageBox content={"Item Deleted"}
            action={() => setShowmessage(false)}
    />
    }

    return (
        <div className={classes.wrap}>
            <h3>Pending Items</h3>
            <div className={classes.wrapper}>
                {items.map((card) =>
                <SimpleCard
                    card={card}
                    key={card.id}
                    actionTitle={'Remove'}
                    action={() => {deleteThisItem(card.id)}}
                />)}
            </div>
        </div>
    )
}

export default PendingItems;
