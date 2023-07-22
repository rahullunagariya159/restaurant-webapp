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

const AWS = require('aws-sdk');

// AWS.config.update({region: region});
const dynamodb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });


let priority = 'normal';
let ttl = 30;
let silent = false;
let graphqlClient;

// Create Message
function CreateMessageRequest(token, badge, msg, userName, title) {
    var action = 'OPEN_APP';

    msg = msg.replace('{{username}}', userName);

    if (!badge || badge == 0) {
        badge = 1;
    }

    var messageRequest = {
        Addresses: {
            [token]: {
                ChannelType: 'APNS',
            },
        },
        MessageConfiguration: {
            APNSMessage: {
                Action: action,
                Body: msg,
                Priority: priority,
                SilentPush: silent,
                Title: title,
                TimeToLive: ttl,
                Badge: badge,
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

    let input = event.arguments.input;

    console.log('Input ===>>>', JSON.stringify(input));
    let response = null;

    try {
        const getCurrentFriendRequests = await graphqlClient.query({
          query: gql(getCurrentFriendRequestsQuery),
          variables: {
              friendRequestToUserID: input.friendRequestToUserID,
              friendRequestFromUserID: input.friendRequestFromUserID
          }
        });

        console.log('current friend requests', getCurrentFriendRequests)

        if(getCurrentFriendRequests.data.listFriendRequestsConnections.items.length > 0){
          throw new Error('User has friend request already.')
        }

        const sendRequest = await graphqlClient.mutate({
            mutation: gql(createFriendRequestsConnection),
            variables: {
                input,
            },
        });

        const createSentFriendRequest = await graphqlClient.mutate({
            mutation: gql(createSentFriendRequestsConnection),
            variables: {
              input: {            
                friendRequestToUserID: input.friendRequestToUserID,
                friendRequestFromUserID: input.friendRequestFromUserID,
                status: input.status
              }
            },
        });
        
        console.log('------->>>>>', sendRequest);
        console.log('------->>>>>', createSentFriendRequest);
        const {
            id,
            status,
            sentByUserInfo,
            createdAt,
            updatedAt,
            friendRequestFromUserID,
            friendRequestToUserID,
            fromUser
        } = sendRequest.data.createFriendRequestsConnection;

        const makeNotifications = await graphqlClient.mutate({
            mutation: gql(createNotification),
            variables: {
              input: {
                userId: friendRequestToUserID,
                userProfileNotificationsId: friendRequestToUserID,
                createdAt: new Date(),
                type: 'RECEIVED_FRIEND_REQUEST'
              }
            }
        });

        console.log(
            'New Notification Created --->>>',
            makeNotifications.data.createNotification.type
        );

        const getUserToSendNotification = await graphqlClient.query({
            query: gql(getUserProfile),
            variables: {
                id: input.friendRequestToUserID
            }
        });

        console.log('----->>>>>>', getUserToSendNotification.data.getUserProfile);
        const token = getUserToSendNotification.data.getUserProfile.iosDeviceId;

        const params = {
            FilterExpression: 'userId = :userId',
            ExpressionAttributeValues: {
                ':userId': {'S': input.friendRequestToUserID}
            },
            TableName: env.API_CATERGRAM3_NOTIFICATIONTABLE_NAME
        };
        const notificationResult = await dynamodb.scan(params).promise();
        console.log('====>>>> Badges ', notificationResult.Items.length);
        let badge = notificationResult.Items.length;

        const getSendingUser = await graphqlClient.query({
          query: gql(getUserProfile),
          variables: {
            id: input.friendRequestFromUserID
          }
        });

        console.log('---->>>>> getSendingUser', getSendingUser.data.getUserProfile);

        const contentRes = await graphqlClient.query({
            query: gql(listContents),
        });

        console.log('---->>>>> listContents', contentRes.data);

        let msggs = 'You received a new friend request from {{username}}';
        let title = 'New Friend Request';
        let sentusername =
            getSendingUser.data.getUserProfile.firstname +
            ' ' +
            getSendingUser.data.getUserProfile.lastname;

        console.log('Sent User Nmae', sentusername);

        if (token) {
            console.log('====>>>> HAS TOKEN', token);
            // Send the Push Notification
            console.log(token, badge, msggs, sentusername, title)
            const messageRequest = CreateMessageRequest(token, badge, msggs, sentusername, title);
            const pinpoint = new AWS.Pinpoint();

            const params = {
                ApplicationId: process.env.ANALYTICS_BETAONE_ID,
                MessageRequest: messageRequest,
            };

            const res = await doPinPoint(pinpoint, params);
            console.log('----->>>>>', res['MessageResponse'].Result);
        }

        response = {
            id
        }
    } catch (error) {
        console.log('ERROR', error);
        return { id: "", errorCode: 400, errorMsg: error.toString() }
    }

    return response;
};

const listContents = /* GraphQL */ `
    query ListContents($filter: ModelContentFilterInput, $limit: Int, $nextToken: String) {
        listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
            items {
                id
                friendReqMsg
                friendReqTitle
                createdAt
                updatedAt
            }
            nextToken
        }
    }
`;

const getUserProfile = /* GraphQL */ `
    query GetUserProfile($id: ID!) {
        getUserProfile(id: $id) {
            id
            uid
            firstname
            lastname
            iosDeviceId
            notifications {
                items {
                    id
                }
            }
        }
    }
`;

const getCurrentFriendRequestsQuery = /* GraphQL */ `
    query listFriendRequestsConnections($friendRequestToUserID: ID!, $friendRequestFromUserID: ID!) {
      listFriendRequestsConnections(
        filter: { or: [{
          and: [
          { status: { ne: REJECTED } },
          { friendRequestToUserID: { eq: $friendRequestFromUserID } },
          { friendRequestFromUserID: { eq: $friendRequestToUserID } },
        ] 
        }, {
          and: [
          { status: { ne: REJECTED } },
          { friendRequestToUserID: { eq: $friendRequestToUserID } },
          { friendRequestFromUserID: { eq: $friendRequestFromUserID } },
        ] 
      }]}
      ) {
      items {
        id
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
      belongsTo {
        id
        uid
        detail {
          id
          email
          nickname
          profilePicture {
            bucket
            region
            key
          }
          address
          city
          zip
        }
        email
        lat
        lon
        cuisine
        delivery
        city
        address
        zip
        file {
          bucket
          region
          key
        }
        nickname
        points
        firstname
        lastname
        appliedBenchmark
        newuser
        phoneNumber
        contacts {
          firstname
          lastname
          phoneNumber
          email
        }
        iosDeviceId
        loc {
          lat
          lon
        }
        ratings {
          items {
            id
            CardID
            UserID
            score
            createdAt
            updatedAt
          }
          nextToken
        }
        lastLogin
        location {
          lat
          lon
        }
        restaurantContact
        interactions {
          items {
            id
            isLiked
            referenceUserKey
            owner
            createdAt
            updatedAt
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            userProfileInteractionsId
            cardPointUserInteractionsId
          }
          nextToken
          scannedCount
        }
        rewards {
          items {
            id
            cover {
              bucket
              region
              key
            }
            description
            active
            value
            userProfile {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            userProfileRewardsId
            owner
          }
          nextToken
        }
        notifications {
          items {
            id
            type
            createdAt
            userId
            belongsTo {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            updatedAt
            userProfileNotificationsId
            owner
          }
          nextToken
        }
        reactions {
          items {
            id
            title
            cover {
              bucket
              region
              key
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            createdAt
            updatedAt
            userProfileReactionsId
            cardPointUserReactionId
            owner
          }
          nextToken
        }
        achievements {
          items {
            id
            isClaimed
            file {
              bucket
              region
              key
            }
            value
            reward {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            userProfileAchievementsId
            cardPointUserRewardsId
            owner
          }
          nextToken
        }
        textComments {
          items {
            id
            body
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            createdAt
            updatedAt
            userProfileTextCommentsId
            cardPointUserCommentId
            owner
          }
          nextToken
        }
        friends {
          items {
            id
            userID
            friendUserReferenceID
            userReference {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        friendRequests {
          items {
            id
            friendRequestToUserID
            friendRequestFromUserID
            sentByUserInfo {
              uid
              email
              nickname
              firstname
              lastname
            }
            status
            fromUser {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      updatedAt
      userProfileNotificationsId
      owner
    }
  }
`;

const createFriendRequestsConnection = /* GraphQL */ `
  mutation CreateFriendRequestsConnection(
    $input: CreateFriendRequestsConnectionInput!
    $condition: ModelFriendRequestsConnectionConditionInput
  ) {
    createFriendRequestsConnection(input: $input, condition: $condition) {
      id
      friendRequestToUserID
      friendRequestFromUserID
      sentByUserInfo {
        uid
        email
        file {
          bucket
          region
          key
        }
        nickname
        firstname
        lastname
      }
      status
      fromUser {
        id
        uid
        detail {
          id
          email
          nickname
          profilePicture {
            bucket
            region
            key
          }
          address
          city
          zip
        }
        email
        lat
        lon
        cuisine
        delivery
        city
        address
        zip
        file {
          bucket
          region
          key
        }
        nickname
        points
        firstname
        lastname
        appliedBenchmark
        newuser
        phoneNumber
        contacts {
          firstname
          lastname
          phoneNumber
          email
        }
        iosDeviceId
        loc {
          lat
          lon
        }
        ratings {
          items {
            id
            CardID
            UserID
            score
            createdAt
            updatedAt
          }
          nextToken
        }
        lastLogin
        location {
          lat
          lon
        }
        restaurantContact
        interactions {
          items {
            id
            isLiked
            referenceUserKey
            owner
            createdAt
            updatedAt
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            userProfileInteractionsId
            cardPointUserInteractionsId
          }
          nextToken
          scannedCount
        }
        rewards {
          items {
            id
            cover {
              bucket
              region
              key
            }
            description
            active
            value
            userProfile {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            userProfileRewardsId
            owner
          }
          nextToken
        }
        notifications {
          items {
            id
            type
            createdAt
            userId
            belongsTo {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            updatedAt
            userProfileNotificationsId
            owner
          }
          nextToken
        }
        reactions {
          items {
            id
            title
            cover {
              bucket
              region
              key
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            createdAt
            updatedAt
            userProfileReactionsId
            cardPointUserReactionId
            owner
          }
          nextToken
        }
        achievements {
          items {
            id
            isClaimed
            file {
              bucket
              region
              key
            }
            value
            reward {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            userProfileAchievementsId
            cardPointUserRewardsId
            owner
          }
          nextToken
        }
        textComments {
          items {
            id
            body
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            createdAt
            updatedAt
            userProfileTextCommentsId
            cardPointUserCommentId
            owner
          }
          nextToken
        }
        friends {
          items {
            id
            userID
            friendUserReferenceID
            userReference {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        friendRequests {
          items {
            id
            friendRequestToUserID
            friendRequestFromUserID
            sentByUserInfo {
              uid
              email
              nickname
              firstname
              lastname
            }
            status
            fromUser {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;

const createSentFriendRequestsConnection = /* GraphQL */ `
  mutation CreateSentFriendRequestsConnection(
    $input: CreateSentFriendRequestsConnectionInput!
    $condition: ModelSentFriendRequestsConnectionConditionInput
  ) {
    createSentFriendRequestsConnection(input: $input, condition: $condition) {
      id
      usera
      userb
      friendRequestFromUserID
      friendRequestToUserID
      status
      toUser {
        id
        uid
        detail {
          id
          email
          nickname
          profilePicture {
            bucket
            region
            key
          }
          address
          city
          zip
        }
        email
        lat
        lon
        cuisine
        delivery
        city
        address
        zip
        file {
          bucket
          region
          key
        }
        nickname
        points
        firstname
        lastname
        appliedBenchmark
        newuser
        phoneNumber
        contacts {
          firstname
          lastname
          phoneNumber
          email
        }
        iosDeviceId
        loc {
          lat
          lon
        }
        ratings {
          items {
            id
            CardID
            UserID
            score
            createdAt
            updatedAt
          }
          nextToken
        }
        lastLogin
        location {
          lat
          lon
        }
        restaurantContact
        interactions {
          items {
            id
            isLiked
            referenceUserKey
            owner
            createdAt
            updatedAt
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            userProfileInteractionsId
            cardPointUserInteractionsId
          }
          nextToken
          scannedCount
        }
        rewards {
          items {
            id
            cover {
              bucket
              region
              key
            }
            description
            active
            value
            userProfile {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            userProfileRewardsId
            owner
          }
          nextToken
        }
        notifications {
          items {
            id
            type
            createdAt
            userId
            belongsTo {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            updatedAt
            userProfileNotificationsId
            owner
          }
          nextToken
        }
        reactions {
          items {
            id
            title
            cover {
              bucket
              region
              key
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            createdAt
            updatedAt
            userProfileReactionsId
            cardPointUserReactionId
            owner
          }
          nextToken
        }
        achievements {
          items {
            id
            isClaimed
            file {
              bucket
              region
              key
            }
            value
            reward {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            userProfileAchievementsId
            cardPointUserRewardsId
            owner
          }
          nextToken
        }
        textComments {
          items {
            id
            body
            user {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            card {
              id
              name
              description
              price
              delivery
              createdAt
              city
              zip
              cuisine
              diets
              like
              dislike
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
              totlaCount
              ratingScore
              restaurantID
              owner
            }
            createdAt
            updatedAt
            userProfileTextCommentsId
            cardPointUserCommentId
            owner
          }
          nextToken
        }
        friends {
          items {
            id
            userID
            friendUserReferenceID
            userReference {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        friendRequests {
          items {
            id
            usera
            userb
            friendRequestToUserID
            friendRequestFromUserID
            sentByUserInfo {
              uid
              email
              nickname
              firstname
              lastname
            }
            status
            fromUser {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        sentFriendRequests {
          items {
            id
            usera
            userb
            friendRequestFromUserID
            friendRequestToUserID
            status
            toUser {
              id
              uid
              email
              lat
              lon
              cuisine
              delivery
              city
              address
              zip
              nickname
              points
              firstname
              lastname
              appliedBenchmark
              newuser
              phoneNumber
              iosDeviceId
              lastLogin
              restaurantContact
              createdAt
              updatedAt
              owner
            }
            createdAt
            updatedAt
            owner
          }
          nextToken
        }
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      owner
    }
  }
`;