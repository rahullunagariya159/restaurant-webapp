/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	AUTH_CATERGRAM3E33E33C6_USERPOOLID
Amplify Params - DO NOT EDIT */

const AWSAppSyncClient = require('aws-appsync').default;
const gql = require('graphql-tag');
global.fetch = require('node-fetch');
let graphqlClient;

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

    // QUERY CURRENT USER
    let userId = event.arguments.userId;

    const currentUser = await graphqlClient.query({
      query: gql(getUserProfile),
      variables: {
        id: userId
      }
    });

    const isNewUser = currentUser.data.getUserProfile.newuser;
    console.log('Is New User ===>>>>', isNewUser);

    if(isNewUser == false) {
      return {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        id: `No Rewards Added`
      }
    }

    // Update User to be not new user
    const oldUser = await graphqlClient.mutate({
      mutation: gql(updateUserProfile),
      variables: {
        input: {
          id: userId,
          newuser: false
        }
      }
    });
    console.log('CREATED OLD USER', JSON.stringify(oldUser));

    // QUERY THE LINK
    let hash = event.arguments.hash;
    const inviteRes =  await graphqlClient.query({
        query: gql(getCardShare),
        variables: {
            id: hash
        }
    });

    console.log('--->>>>>', inviteRes);
    
    // Grab user who sent the request
    const userA =  await graphqlClient.query({
      query: gql(getUserProfile),
      variables: {
          id: inviteRes.data.getCardShare.sentByUserId
      }
    });

    console.log('Found User A', userA);

    // Query all the Benchmarks
    const benchResult =  await graphqlClient.query({
      query: gql(listBenchmarks)
    });

    console.log('GET ALL BENCHMARKS', benchResult.data.listBenchmarks);
    // find the benchmark that is applied to user
    console.log('USER Benchmark', userA.data.getUserProfile.appliedBenchmark);

    let benchmark = benchResult.data.listBenchmarks.items[0];

    if(benchmark.file && benchmark.file.__typename) {
      delete benchmark.file.__typename
    }

    let currentPoint = 0;
    if(userA.data.getUserProfile.points) {
      currentPoint = userA.data.getUserProfile.points
    }
    
    // check points
    let aPoints = currentPoint + benchmark.pointFactor
    
    console.log('---->>>>>> A POINTS', aPoints);

    if(aPoints >= 100) {
      aPoints = aPoints - 100;

      // Assign achievements
      let achievementsA = await graphqlClient.mutate({
        mutation: gql(createAchievements),
        variables: {
            input: {
              isClaimed: false,
              achievementsUserId: userA.data.getUserProfile.id,
              file: benchmark.file,
              value: benchmark.rewardValue
            }
        }
      });
      console.log('achievementsA', achievementsA.data);

      // Give user Notification
      let notification = await graphqlClient.mutate({
        mutation: gql(createNotification),
        variables: {
            input: {
              userId: inviteRes.data.getCardShare.sentByUserId,
              notificationBelongsToId: inviteRes.data.getCardShare.sentByUserId,
              type: 'REWARD_RECIEVED'
            }
        }
      });
      console.log('notification >>>>', notification);
    }
    // update user A
    let updatedA = await graphqlClient.mutate({
      mutation: gql(updateUserProfile),
      variables: {
          input: {
              id: userA.data.getUserProfile.id,
              points: aPoints
          }
      }
    });
    console.log('Updated USER A', updatedA);

    // delete old link
    let deleted = await graphqlClient.mutate({
      mutation: gql(updateCardShare),
      variables: {
          input: {
            id: hash,
            isInteractedWith: true
          }
      }
    });
    console.log('--->>>>Link Deleted', deleted);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        id: `updated`
    };
    return response;
};


const getCardShare = /* GraphQL */ `
  query GetCardShare($id: ID!) {
    getCardShare(id: $id) {
      id
      sentByUserId
      createdAt
      updatedAt
      receivedByUser
    }
  }
`;

const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
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
      createdAt
      updatedAt
      notifications {
        items {
          id
          type
          createdAt
          userId
          updatedAt
          belongsTo {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
        }
        nextToken
      }
      friends {
        items {
          id
          friendUserReferenceID
          createdAt
          updatedAt
          belongsTo {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
          userReference {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
        }
        nextToken
        count
        scannedCount
      }
      userFriendsRef {
        items {
          id
          friendUserReferenceID
          createdAt
          updatedAt
          belongsTo {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
          userReference {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
        }
        nextToken
        count
        scannedCount
      }
      requestsSent {
        items {
          id
          usera
          userb
          status
          sentByUser
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
          receivedByUser
          createdAt
          updatedAt
          sentFromUser {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
          userReference {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
        }
        nextToken
      }
      friendsRequests {
        items {
          id
          usera
          userb
          status
          sentByUser
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
          receivedByUser
          createdAt
          updatedAt
          sentFromUser {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
          userReference {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
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
          createdAt
          updatedAt
          user {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
          reward {
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
              updatedAt
            }
            userRewards {
              nextToken
            }
            userReaction {
              nextToken
            }
            userInteractions {
              nextToken
              scannedCount
            }
            shares {
              nextToken
              count
              scannedCount
            }
          }
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
          createdAt
          updatedAt
          user {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
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
            rewardButtonImage
            rewardTitle
            updatedAt
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
              updatedAt
            }
            userRewards {
              nextToken
            }
            userReaction {
              nextToken
            }
            userInteractions {
              nextToken
              scannedCount
            }
            shares {
              nextToken
              count
              scannedCount
            }
          }
        }
        nextToken
      }
      interactions {
        items {
          id
          isLiked
          referenceUserKey
          owner
          createdAt
          updatedAt
          user {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
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
            rewardButtonImage
            rewardTitle
            updatedAt
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
              updatedAt
            }
            userRewards {
              nextToken
            }
            userReaction {
              nextToken
            }
            userInteractions {
              nextToken
              scannedCount
            }
            shares {
              nextToken
              count
              scannedCount
            }
          }
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
          createdAt
          updatedAt
          userProfile {
            id
            uid
            detail {
              id
              email
              nickname
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
            createdAt
            updatedAt
            notifications {
              nextToken
            }
            friends {
              nextToken
              count
              scannedCount
            }
            userFriendsRef {
              nextToken
              count
              scannedCount
            }
            requestsSent {
              nextToken
            }
            friendsRequests {
              nextToken
            }
            achievements {
              nextToken
            }
            reactions {
              nextToken
            }
            interactions {
              nextToken
              scannedCount
            }
            rewards {
              nextToken
            }
          }
        }
        nextToken
      }
    }
  }
`;
const updateUserProfile = /* GraphQL */ `
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
      id
      uid
      createdAt
      updatedAt
      points
      newuser
    }
  }
`;

const updateCardShare = /* GraphQL */ `
  mutation UpdateCardShare(
    $input: UpdateCardShareInput!
    $condition: ModelCardShareConditionInput
  ) {
    updateCardShare(input: $input, condition: $condition) {
      id
      isInteractedWith
    }
  }
`;

const listBenchmarks = /* GraphQL */ `
  query ListBenchmarks(
    $filter: ModelBenchmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBenchmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pointFactor
        name
        file {
          bucket
          region
          key
        }
        rewardValue
        title
        price
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;

const getBenchmark = /* GraphQL */ `
  query GetBenchmark($id: ID!) {
    getBenchmark(id: $id) {
      id
      pointFactor
      name
      file {
        bucket
        region
        key
      }
      rewardValue
      title
      price
      createdAt
      updatedAt
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