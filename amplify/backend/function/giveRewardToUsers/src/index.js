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
const AWS = require('aws-sdk');

// Create Message
function  CreateMessageRequest(token, title, content) {
  
  let action = 'OPEN_APP';
  let priority = 'normal';
  let ttl = 30;
  let silent = false;

  var messageRequest = {
    'Addresses': {
      [token]: {
        'ChannelType' : 'APNS'
      }
    },
    'MessageConfiguration': {
      'APNSMessage': {
        'Action': action,
        'Body': content,
        'Priority': priority,
        'SilentPush': silent,
        'Title': title,
        'TimeToLive': ttl,
      }
    }
  };
  
  return messageRequest;
}

function doPinPoint(pinpoint, params) {
  return new Promise((resolve, reject) => {
      pinpoint.sendMessages(params, function(err, data) {
          if (err) {
              reject(err);
          }
          resolve(data);
      });
  });
}

exports.handler = async (event) => {

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

    let userIds = event.arguments.userIds;
    let file = event.arguments.file;
    let rewardValue = event.arguments.rewardValue;
    let title = event.arguments.title;
    let content = event.arguments.content;

    for await (userId of userIds) {
      // Get the Current User
      const currentUserRsp =  await graphqlClient.query({
        query: gql(getUserProfile),
        variables: {
            id: userId
        }
      });

      console.log('currentUser', currentUserRsp.data.getUserProfile);

      // Assign achievements
      let achievementsA = await graphqlClient.mutate({
        mutation: gql(createAchievements),
        variables: {
            input: {
              isClaimed: false,
              achievementsUserId: userId,
              file: file,
              value: rewardValue
            }
        }
      });
      console.log('achievementsA', achievementsA.data);

      // Create App Notification
      // Give user Notification
      let notification = await graphqlClient.mutate({
        mutation: gql(createNotification),
        variables: {
            input: {
              userId: userId,
              notificationBelongsToId: userId,
              type: 'REWARD_RECIEVED'
            }
        }
      });
      console.log('notification >>>>', notification);

      // Send Push Notification
      const token = currentUserRsp.data.getUserProfile.iosDeviceId;
      if(token) {
        console.log('====>>>> HAS TOKEN', token);
        const messageRequest = CreateMessageRequest(token, title, content);

        const pinpoint = new AWS.Pinpoint();
            
        const params = {
            "ApplicationId": process.env.applicationId,
            "MessageRequest": messageRequest
        };

        const res = await doPinPoint(pinpoint, params);
        console.log('----->>>>>', res['MessageResponse'].Result);


      }
    }

    const response = {
        statusCode: 200,
        id: JSON.stringify('Update'),
    };
    return response;
};


const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      email
      iosDeviceId
    }
  }
`;

const createAchievements = /* GraphQL */ `
  mutation CreateAchievements(
    $input: CreateAchievementsInput!
    $condition: ModelAchievementsConditionInput
  ) {
    createAchievements(input: $input, condition: $condition) {
      id
    }
  }
`;

const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
      id
      type
      userId
    }
  }
`;