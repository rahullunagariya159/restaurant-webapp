/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');

let graphqlClient;

exports.handler = async (event) => {
    let env;
    let graphql_auth;
    let response

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

    // Accept Friends request logic
    let requestId = event.arguments.requestId;
    let status = event.arguments.status;
    let results;
    if(status === 'ACCEPTED') {
        try {
            results = await graphqlClient.mutate({
                mutation: gql(updateFriendRequestsConnection),
                variables: {
                    input: {
                        id: requestId,
                        status: status
                    }
                }
            });
            console.log('----Updated Friend Request >>>>', JSON.stringify(results.data.updateFriendRequestsConnection));

            const { friendRequestToUserID, friendRequestFromUserID } = results.data.updateFriendRequestsConnection

            const first = await graphqlClient.mutate({
              mutation: gql(CreateFriendshipConnection),
              variables: {
                  input: {
                    userID: friendRequestToUserID,
                    friendUserReferenceID: friendRequestFromUserID,
                  }
              }
            });

            console.log('---- updated first friend >>>>', JSON.stringify(first));


            const second = await graphqlClient.mutate({
              mutation: gql(CreateFriendshipConnection),
              variables: {
                  input: {
                    userID: friendRequestFromUserID,
                    friendUserReferenceID: friendRequestToUserID,
                  }
              }
            });

            console.log('---- updated second frined >>>>', JSON.stringify(second));
            response = {
              statusCode: 200,
              body: JSON.stringify('Success'),
              id: `updated`
          };

        } catch (error) {
            console.log('--->>>. ERROR', error)
            response = {
              statusCode: 400,
              body: JSON.stringify('error'),
              id: ""
          };
        }
    }
    return response;
};



const updateFriendRequestsConnection = /* GraphQL */ `
  mutation UpdateFriendRequestsConnection(
    $input: UpdateFriendRequestsConnectionInput!
    $condition: ModelFriendRequestsConnectionConditionInput
  ) {
    updateFriendRequestsConnection(input: $input, condition: $condition) {
      id
      friendRequestToUserID
      friendRequestFromUserID
      status
      createdAt
      updatedAt
    }
  }
`;

const updateSentFriendRequestsConnection = /* GraphQL */ `
  mutation UpdateSentFriendRequestsConnection(
    $input: UpdateSentFriendRequestsConnectionInput!
    $condition: ModelSentFriendRequestsConnectionConditionInput
  ) {
    updateSentFriendRequestsConnection(input: $input, condition: $condition) {
      id
      friendRequestFromUserID
      friendRequestToUserID
      status
      createdAt
      updatedAt
    }
  }
`;

const CreateFriendshipConnection = /* GraphQL */ `
  mutation CreateFriendshipConnection(
    $input: CreateFriendshipConnectionInput!
    $condition: ModelFriendshipConnectionConditionInput
  ) {
    createFriendshipConnection(input: $input, condition: $condition) {
      id
      createdAt
      updatedAt
    }
  }
`;