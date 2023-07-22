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
  let response = {
    total: 0,
    average: 0,
    name: '',
  };

  //for cloud env
  env = process.env;
  graphql_auth = {
    type: 'AWS_IAM',
    credentials: {
      accessKeyId: env.AWS_ACCESS_KEY_ID,
      secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
      sessionToken: env.AWS_SESSION_TOKEN,
    },
  };

  if (!graphqlClient) {
    graphqlClient = new AWSAppSyncClient({
      url: env.API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT,
      region: env.REGION,
      auth: graphql_auth,
      disableOffline: true,
    });
  }

  try {
    const userMoods = await graphqlClient.query({
      query: gql(getUserMoodsItems),
      variables: {
        userId: event.arguments.userId,
      },
    });

    console.log(userMoods);

    if (userMoods.data.listUserMoods.items.length) {
      let moodSum = 0;
      let maxValue = 0;
      console.log(userMoods.data.listUserMoods.items);
      const totalMoods = userMoods.data.listUserMoods.items.length;
      userMoods.data.listUserMoods.items.forEach((userMood) => {
        moodSum += userMood.value;
        if (userMood.value > maxValue) {
          maxValue = userMood.value;
          response.name = userMood.mood.name;
        }
      });
      response.average = Math.floor(moodSum / totalMoods).toFixed(2);
      response.totalMoods = totalMoods;
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    response = {
      statusCode: 400,
      body: JSON.stringify('error'),
      totalMoods: 0
     };
  }

  return response;
};

const getUserMoodsItems = /* GraphQL */ `
  query ListUserMoods($userId: ID) {
    listUserMoods(filter: { userProfileMoodsId: { eq: $userId } }) {
      items {
        value
        mood {
          name
        }
      }
    }
  }
`;
