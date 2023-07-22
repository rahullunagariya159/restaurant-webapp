/* Amplify Params - DO NOT EDIT
	ANALYTICS_BETAONE_ID
	ANALYTICS_BETAONE_REGION
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_NOTIFICATIONTABLE_ARN
	API_CATERGRAM3_NOTIFICATIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
let graphqlClient;

let priority = 'normal';
let ttl = 30;
let silent = false;

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

// Create Message
function CreateMessageRequest(
  token,
  badge,
  menuName,
  sentBy,
  title,
  contentMessage,
) {
  const userName = sentBy.firstname + ' ' + sentBy.lastname;

  contentMessage = contentMessage.replace('{{username}}', userName);
  contentMessage = contentMessage.replace('{{menu}}', menuName);

  title = title.replace('{{username}}', userName);
  title = title.replace('{{menu}}', menuName);

  const action = 'OPEN_APP';

  const messageRequest = {
    Addresses: {
      [token]: {
        ChannelType: 'APNS',
      },
    },
    MessageConfiguration: {
      APNSMessage: {
        Action: action,
        Body: contentMessage,
        Priority: priority,
        SilentPush: silent,
        Title: title,
        TimeToLive: ttl,
        Badge: badge,
        //MediaUrl: `https://d29u6d6o333gsl.cloudfront.net/public/${card.cardPointFile[0].key}`,
      },
    },
  };

  return messageRequest;
}

function doPinPoint(pinpoint, params) {
  return new Promise((resolve, reject) => {
    pinpoint.sendMessages(params, function (err, data) {
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

  // Create the Share Links
  let sentByUser = event.arguments.sentByUser;
  let recievingUsers = event.arguments.recievingUsers;
  let menuId = event.arguments.menuId;
  let restaurantId = event.arguments.restaurantId;
  let message = event.arguments.message;

  // QUERY sentby user info
  const sentFromUser = await graphqlClient.query({
    query: gql(getUserProfile),
    variables: {
      id: sentByUser,
    },
  });

  if (
    sentFromUser.data.getUserProfile.file &&
    sentFromUser.data.getUserProfile.file.__typename
  ) {
    delete sentFromUser.data.getUserProfile.file.__typename;
  }

  let promises = [];

  recievingUsers.forEach((user) => {
    promises.push(
      graphqlClient.mutate({
        mutation: gql(createMenuShare),
        variables: {
          input: {
            receivedByUser: user,
            sentByUserId: sentByUser,
            restaurantSharesId: restaurantId,
            ...(menuId && { restaurantMenuSharesId: menuId }),
            sentByUserProfilePic: sentFromUser.data.getUserProfile.file,
            sentByUserName: sentFromUser.data.getUserProfile.firstname,
            message: message,
          },
        },
      }),
    );
  });

  let ress = await Promise.all(promises);
  console.log('--->>>>', ress);

  for await (const recievingUserId of recievingUsers) {
    const makeNotifications = await graphqlClient.mutate({
      mutation: gql(createNotification),
      variables: {
        input: {
          userId: recievingUserId,
          userProfileNotificationsId: recievingUserId,
          createdAt: new Date(),
          type: 'MENU_SHARED',
        },
      },
    });

    console.log(
      'New Notification Created --->>>',
      makeNotifications.data.createNotification.type,
    );

    const currentUser = await graphqlClient.query({
      query: gql(getUserProfile),
      variables: {
        id: recievingUserId,
      },
    });

    console.log(
      'Found Recieving User Token',
      currentUser.data.getUserProfile.iosDeviceId,
    );
    const token = currentUser.data.getUserProfile.iosDeviceId;

    const params = {
      FilterExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': { S: recievingUserId },
      },
      TableName: process.env.API_CATERGRAM3_NOTIFICATIONTABLE_NAME,
    };

    const notificationResult = await dynamodb.scan(params).promise();
    let badge = notificationResult.Items.length;

    console.log('SHOW US THE BADGE', badge);

    let title = 'Menu {{menu}} Was Shared';
    let contentMessage = 'Menu {{menu}} was shared from user {{username}}';

    let currentMenu;
    if (menuId) {
      currentMenu = await graphqlClient.query({
        query: gql(getRestaurantMenu),
        variables: {
          id: menuId,
        },
      });
    }

    let messageRequest;
    if (token) {
      console.log('====>>>> HAS TOKEN', token);

      messageRequest = CreateMessageRequest(
        token,
        badge,
        currentMenu ? currentMenu.data.getRestaurantMenu.name : 'Unknown',
        currentUser.data.getUserProfile,
        title,
        contentMessage,
      );
      const pinpoint = new AWS.Pinpoint();

      const params = {
        ApplicationId: process.env.ANALYTICS_BETAONE_ID,
        MessageRequest: messageRequest,
      };
      const res = await doPinPoint(pinpoint, params);
      console.log('----->>>>>', res['MessageResponse'].Result);
    }
  }

  const response = {
    statusCode: 200,
    body: JSON.stringify('Menu was shared to users'),
    id: 'ok',
  };
  return response;
};

const createMenuShare = /* GraphQL */ `
  mutation CreateMenuShare(
    $input: CreateMenuShareInput!
    $condition: ModelMenuShareConditionInput
  ) {
    createMenuShare(input: $input, condition: $condition) {
      id
      sentByUserId
      sentByUserProfilePic {
        bucket
        region
        key
      }
      sentByUserName
      receivedByUser
      message
      restaurant {
        id
        name
        address
        city
        zip
        file {
          bucket
          region
          key
        }
        description
        location {
          lat
          lon
        }
        lat
        lng
        cuisine
        delivery
        orderOptionUrls {
          name
          file {
            bucket
            region
            key
          }
          url
          fontColor
          backgroundColor
        }
        menus {
          id
          name
          description
        }
        createdAt
        contact
        averagePrice
        cards {
          items {
            id
            name
            description
            location {
              lat
              lon
            }
            price
            delivery
            createdAt
            cardPointFile {
              bucket
              region
              key
            }
            city
            zip
            cuisine
            diets
            like
            dislike
            orderOptionUrls {
              name
              url
              fontColor
              backgroundColor
            }
            menus {
              id
              name
              description
            }
            likedBefore
            dislikedBefore
            rewardValue
            rewardUrl
            promoURL
            rewardPrice
            rewardRule
            rewardCode
            rewardButtonTitle
            rewardFontColor
            rewardBgColor
            rewardLimit
            rewardButtonImage
            rewardTitle
            updatedAt
            ratings {
              nextToken
            }
            shares {
              nextToken
              count
              scannedCount
            }
            userRewards {
              nextToken
            }
            totlaCount
            ratingScore
            restaurantID
            restaurant {
              id
              name
              address
              city
              zip
              description
              lat
              lng
              cuisine
              delivery
              createdAt
              contact
              averagePrice
              updatedAt
              owner
            }
            userInteractions {
              nextToken
              scannedCount
            }
            userReaction {
              nextToken
            }
            userComment {
              nextToken
            }
            mood {
              id
              name
              backgroundColor
              createdAt
              updatedAt
            }
            cardPointMoodId
            owner
          }
          count
          scannedCount
          nextToken
        }
        shares {
          items {
            id
            sentByUserId
            sentByUserProfilePic {
              bucket
              region
              key
            }
            sentByUserName
            receivedByUser
            message
            restaurant {
              id
              name
              address
              city
              zip
              description
              lat
              lng
              cuisine
              delivery
              createdAt
              contact
              averagePrice
              updatedAt
              owner
            }
            menu {
              id
              name
              description
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            restaurantSharesId
            restaurantMenuSharesId
          }
          nextToken
        }
        updatedAt
        owner
      }
      menu {
        id
        name
        description
        shares {
          items {
            id
            sentByUserId
            sentByUserProfilePic {
              bucket
              region
              key
            }
            sentByUserName
            receivedByUser
            message
            restaurant {
              id
              name
              address
              city
              zip
              description
              lat
              lng
              cuisine
              delivery
              createdAt
              contact
              averagePrice
              updatedAt
              owner
            }
            menu {
              id
              name
              description
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            restaurantSharesId
            restaurantMenuSharesId
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      restaurantSharesId
      restaurantMenuSharesId
    }
  }
`;

const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      email
      firstname
      lastname
      file {
        bucket
        region
        key
      }
      iosDeviceId
      notifications {
        items {
          id
        }
      }
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
      createdAt
      userId
      updatedAt
      belongsTo {
        id
        uid
        contacts {
          firstname
          lastname
          phoneNumber
          email
        }
        iosDeviceId
        createdAt
        updatedAt
      }
    }
  }
`;

const getRestaurantMenu = /* GraphQL */ `
  query GetRestaurantMenu($id: ID!) {
    getRestaurantMenu(id: $id) {
      name
    }
  }
`;
