/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_EMOJIMODELTABLE_ARN
	API_CATERGRAM3_EMOJIMODELTABLE_NAME
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	AUTH_CATERGRAM3E33E33C6_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
let graphqlClient;

exports.handler = async (event) => {
    // Configure Everything 
    let env;
    let graphql_auth;

    //for cloud env
    env = process.env;
    graphql_auth = {
        type: "AWS_IAM",
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
        }
    };

    if (!graphqlClient) {
        graphqlClient = new AWSAppSyncClient({
            url: env.API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT,
            region: env.REGION,
            auth: graphql_auth,
            disableOffline: true,
        });
    }

    // Step 1: Create Couple Test User Profiles
    const aUser =  await graphqlClient.mutate({
        mutation: gql(createUserProfile),
        variables: {
            input: {
                firstname: "fake-user", 
                uid: "fake-id-001", 
                lastname: "fake-lastname", 
                email: "user@fake.com"
            }
        }
    });

    console.log('USER CREATED', aUser.data.createUserProfile);

    // Step 2: Get 100 Cards
    const cardsRes =  await graphqlClient.query({
        query: gql(listCardPoints),
        variables: {
            limit: 100
        }
    });

    console.log('CARDS FETCHED', cardsRes.data.listCardPoints);

    // Step 3: Share these cards with user
    let currentUser = event.arguments.userId;
    const promises = []
    cardsRes.data.listCardPoints.items.forEach(c => {
        console.log('CURRENT CARD', c)
        promises.push(
            graphqlClient.mutate({
                mutation: gql(createCardShare),
                variables: {
                    input: {
                        receivedByUser: aUser.data.createUserProfile.id, 
                        sentByUserId: currentUser,
                        cardShareCardId: c.id
                    }
                }
            })
        );
    });
    const results = await Promise.all(promises)
    console.log('CARD SHARED', JSON.stringify(results));
    // Step 4: Users interact with these cards
    for await (i of results) {
      const jj = await graphqlClient.mutate({
        mutation: gql(redeemCard),
        variables: {
            hash: i.data.createCardShare.id, 
            userId: aUser.data.createUserProfile.id
        }
      })
      console.log('REDEEM RESULT', JSON.stringify(jj))
    }

    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Running Tests'),
    };
    return response;
};



const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
      id
      email
    }
  }
`;


const listCardPoints = /* GraphQL */ `
  query ListCardPoints(
    $filter: ModelCardPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCardPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
      }
    }
  }
`;

const createCardShare = /* GraphQL */ `
  mutation CreateCardShare(
    $input: CreateCardShareInput!
    $condition: ModelCardShareConditionInput
  ) {
    createCardShare(input: $input, condition: $condition) {
      id
    }
  }
`;

const redeemCard = /* GraphQL */ `
  mutation RedeemCard($userId: String!, $hash: String!) {
    redeemCard(userId: $userId, hash: $hash) {
      id
    }
  }
`;