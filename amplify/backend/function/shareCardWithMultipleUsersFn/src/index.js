/* Amplify Params - DO NOT EDIT
	ANALYTICS_BETAONE_ID
	ANALYTICS_BETAONE_REGION
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_NOTIFICATIONTABLE_ARN
	API_CATERGRAM3_NOTIFICATIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	ANALYTICS_BETAONE_ID
	ANALYTICS_BETAONE_REGION
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_NOTIFICATIONTABLE_ARN
	API_CATERGRAM3_NOTIFICATIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_NOTIFICATIONTABLE_ARN
	API_CATERGRAM3_NOTIFICATIONTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
let graphqlClient;


const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});


let priority = 'normal';
let ttl = 30;
let silent = false;

// Create Message
function  CreateMessageRequest(token, badge, card, sentBy, msg, title, contentMessage) {

  // const title = `${card.name} was shared with you`;
  const userName = sentBy.firstname + ' ' + sentBy.lastname;
  const cardname = card.name;

  console.log('card.restaurant.name', card.restaurant.name)

  contentMessage = contentMessage.replace('{{username}}', userName);
  contentMessage = contentMessage.replace('{{cardname}}', cardname);
  contentMessage = contentMessage.replace('{{restaurant}}', card.restaurant.name);
  contentMessage = contentMessage.replace('{{usermessage}}', msg);

  title = title.replace('{{username}}', userName);
  title = title.replace('{{cardname}}', cardname);
  title = title.replace('{{restaurant}}', card.restaurant.name);

  console.log('----->>>> Message', contentMessage);
  console.log('-------->>> TITLE', title);
  console.log('-------->>> TITLE', `https://d29u6d6o333gsl.cloudfront.net/public/${card.cardPointFile[0].key}`);
    
  const action = 'OPEN_APP';
  
  const messageRequest = {
    'Addresses': {
      [token]: {
        'ChannelType' : 'APNS'
      }
    },
    'MessageConfiguration': {
      'APNSMessage': {
        'Action': action,
        'Body': contentMessage,
        'Priority': priority,
        'SilentPush': silent,
        'Title': title,
        'TimeToLive': ttl,
        'Badge': badge,
        'MediaUrl': `https://d29u6d6o333gsl.cloudfront.net/public/${card.cardPointFile[0].key}`
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

    // Create the Share Links
    let sentByUser = event.arguments.sentByUser;
    let recievingUsers = event.arguments.recievingUsers;
    let cardId = event.arguments.cardId;
    let message = event.arguments.message;
    let skipNotification = false;

    if(message.includes('#no-notif#')) {
      skipNotification = true;
    }

    console.log('Card', cardId)
    console.log('recievingUsers', recievingUsers)
    console.log('sentByUser', sentByUser)
    console.log('skipNotification', skipNotification)

    // Query Card

    const theCard = await graphqlClient.query({
      query: gql(getCardPoint),
      variables: {
          id: cardId
      }
    });

    const cardRsp = theCard.data.getCardPoint;
    console.log('Card Shared---->>>>', JSON.stringify(cardRsp));



    // QUERY sentby user info
    const ownerzz =  await graphqlClient.query({
        query: gql(getUserProfile),
        variables: {
            id: sentByUser
        }
    });
    
    console.log('Update this card', ownerzz.data.getUserProfile) 

    if(ownerzz.data.getUserProfile.file && ownerzz.data.getUserProfile.file.__typename) {
        delete ownerzz.data.getUserProfile.file.__typename
    }

    let promises = [];
    let toSendMsg = message;
    if(skipNotification) {
      toSendMsg = message.split('-notif#')[1]
    }

    recievingUsers.forEach(user => {

        promises.push(
            graphqlClient.mutate({
                mutation: gql(createCardShare),
                variables: {
                    input: {
                        receivedByUser: user,
                        sentByUserId: sentByUser,
                        cardPointSharesId: cardId,
                        sentByUserProfilePic: ownerzz.data.getUserProfile.file,
                        sentByUserName: ownerzz.data.getUserProfile.firstname,
                        message: toSendMsg,
                    }
                }
            })
        )
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
            type: 'CARD_SHARED'
          }
        }
      });

      console.log('New Notification Created --->>>', makeNotifications.data.createNotification.type)

      const theResp =  await graphqlClient.query({
        query: gql(getUserProfile),
        variables: {
            id: recievingUserId
        }
      });

      console.log('Found Recieving User Token', theResp.data.getUserProfile.iosDeviceId);
      const token = theResp.data.getUserProfile.iosDeviceId;

      if(!skipNotification) {
        const params = {
          FilterExpression: 'userId = :userId',
          ExpressionAttributeValues: {
              ':userId': {'S': recievingUserId}
          },
          TableName: process.env.API_CATERGRAM3_NOTIFICATIONTABLE_NAME
        };
  
        const notificationResult = await dynamodb.scan(params).promise()
        let badge = notificationResult.Items.length;
  
        console.log('SHOW US THE BADGE', badge);
  
  
        const contentRes = await graphqlClient.query({
          query: gql(listContents),
        });
  
        let title = 'Card Shared'
        let contentMessage = 'A card was shared with you ';
  
        let messageRequest;
        if(token) {
          console.log('====>>>> HAS TOKEN', token);
          // Send the Push Notification
          if(!skipNotification) {
            messageRequest = CreateMessageRequest(token, badge, cardRsp, ownerzz.data.getUserProfile, message, title, contentMessage);
          } 
          const pinpoint = new AWS.Pinpoint();
          
          const params = {
              ApplicationId: process.env.ANALYTICS_BETAONE_ID,
              "MessageRequest": messageRequest
          };
          const res = await doPinPoint(pinpoint, params);
          console.log('----->>>>>', res['MessageResponse'].Result);
        }
      }
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Using the card'),
        id: 'ok'
    };
    return response;
};


const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        shareCardTitle
        shareCardMsg
      }
      nextToken
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
    sentByUserId
    message
    sentByUserProfilePic {
      bucket
      region
      key
    }
    sentByUserName
    receivedByUser
    createdAt
    updatedAt
    link
    card {
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
        file {
          bucket
          region
          key
        }
        url
        fontColor
        backgroundColor
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
      updatedAt
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
        lat
        lng
        cuisine
        delivery
        createdAt
        contact
        updatedAt
      }
    }
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


const getCardPoint = /* GraphQL */ `
  query GetCardPoint($id: ID!) {
    getCardPoint(id: $id) {
      id
      name
      cardPointFile {
        key
      }
      restaurant {
        name
      }
    }
  }
`;