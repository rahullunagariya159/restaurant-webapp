import React, { useContext, useEffect, useState } from 'react';
import { getApolloContext } from '@apollo/react-hooks';
import AWSAppSyncClient from 'aws-appsync';

const Rehydrated = ({ children }) => {
	const { client } = useContext(getApolloContext());
	const [rehydrated, setState] = useState(false);

	useEffect(() => {
		if (client instanceof AWSAppSyncClient) {
			(async () => {
				await client.hydrated();
				setState(true);
			})();
		}
	}, [client]);
	return rehydrated ? <>{children}</> : null;
};

export default Rehydrated;