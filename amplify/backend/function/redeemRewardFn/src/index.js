/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
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

    let userId = event.arguments.userId;
    let rewardId = event.arguments.rewardId;
    let location = event.arguments.location;

    console.log('--->>>>', location);
    let cards = [];
    let reward;
    try {
        const ress =  await graphqlClient.query({
            query: gql(nearbyCards),
            variables: {
                location: {
                    lat: location.lat,
                    lon: location.lon
                },
                limit: 100,
                dislike: userId,
                userId: userId,
            }
        });
        cards = ress.data.nearbyCards.items
        console.log('---->>>>>', ress.data.nearbyCards)
    } catch (error) {
        console.log('Error', error)
    }

    // Query reward 
    try {
        const rewardzz =  await graphqlClient.query({
            query: gql(getAchievements),
            variables: {
                id: rewardId
            }
        });
        console.log('----getAchievements>>>>>', rewardzz.data.getAchievements)
        reward = rewardzz.data.getAchievements;
    } catch (error) {
        console.log('Error', error)
    }

    const filteredCards = cards.filter(u => (u.rewardValue === reward.value && u.rewardLimit > 0));
    console.log('ALL FILTERED CARDS', filteredCards);

    if(filteredCards.length === 0) {
      return {
        statusCode: 200,
        body: JSON.stringify('No Cards Found Nearby'),
        id: '',
        errorCode: '001',
        errorMsg: 'No Rewards to Retrive Nearby'
      }
    }

    const item = filteredCards[Math.floor(Math.random() * filteredCards.length)];
    console.log('Picked Card', item);

    if(!item.id) {
      item = filteredCards[0]
    }

    try {
      const res =  await graphqlClient.mutate({
          mutation: gql(deleteAchievements),
          variables: {
              input: {
                  id: rewardId
              }
          }
      });
      console.log('---->>>>>', res.data.updateAchievements);

      // Create a New Achievement
      const newAchieve = await graphqlClient.mutate({
        mutation: gql(createAchievements),
        variables: {
            input: {
              achievementsUserId: userId, 
              isClaimed: true,
              achievementsRewardId: item.id
            }
        }
      });

      console.log('newAchieve', newAchieve.data.createAchievements)

    } catch (error) {
      console.log('Error', error)
    }

    try {
      const cardRes = await graphqlClient.mutate({
        mutation: gql(updateCardPoint),
          variables: {
              input: {
                id: item.id,
                rewardLimit: item.rewardLimit - 1
              }
          }
      });
      console.log('---->updateCardPoint>>>>', cardRes.data.updateCardPoint)
    } catch (error) {
      console.log('Error updateCardPoint', error)
    }

    // DELETE SHARE AFTER ALL DONE
    if(event.arguments.hash) {
      try {
        const deleteShare = await graphqlClient.mutate({
          mutation: gql(deleteCardShare),
            variables: {
                input: {
                  id: event.arguments.hash
                }
            }
        });
        console.log('---->deleteShare>>>>', deleteShare.data.deleteCardShare);   
      } catch (error) {
        console.log('Error In deleteShare', error)
      }
    }

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        id: item.id ? item.id : `No Rewards to Retrive Nearby`
    };
    return response;
};


const nearbyCards = /* GraphQL */ `
  query NearbyCards(
    $location: LocationInput!
    $m: Int
    $limit: Int
    $nextToken: String
    $delivery: String
    $cuisine: String
    $dislike: String
    $priceLow: Float
    $priceHigh: Float
    $diets: String
    $skipLocation: String
    $userId: String
  ) {
    nearbyCards(
      location: $location
      m: $m
      limit: $limit
      nextToken: $nextToken
      delivery: $delivery
      cuisine: $cuisine
      dislike: $dislike
      priceLow: $priceLow
      priceHigh: $priceHigh
      diets: $diets
      skipLocation: $skipLocation
      userId: $userId
    ) {
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
        rewardLimit
        updatedAt
      }
      total
      nextToken
    }
  }
`;


const getAchievements = /* GraphQL */ `
  query GetAchievements($id: ID!) {
    getAchievements(id: $id) {
      id
      isClaimed
      value
    }
  }
`;

// Update User Profile

// Update CardPoint
const updateCardPoint = /* GraphQL */ `
  mutation UpdateCardPoint(
    $input: UpdateCardPointInput!
    $condition: ModelCardPointConditionInput
  ) {
    updateCardPoint(input: $input, condition: $condition) {
      id
      name
      rewardLimit 
    }
  }
`;

// DELETE ACHIEVEMENT
const deleteAchievements = /* GraphQL */ `
  mutation DeleteAchievements(
    $input: DeleteAchievementsInput!
    $condition: ModelAchievementsConditionInput
  ) {
    deleteAchievements(input: $input, condition: $condition) {
      id
    }
  }
`;

// CREATE ACHIEVEMENT
const createAchievements = /* GraphQL */ `
  mutation CreateAchievements(
    $input: CreateAchievementsInput!
    $condition: ModelAchievementsConditionInput
  ) {
    createAchievements(input: $input, condition: $condition) {
      id
      isClaimed
    }
  }
`;


const deleteCardShare = /* GraphQL */ `
  mutation DeleteCardShare(
    $input: DeleteCardShareInput!
    $condition: ModelCardShareConditionInput
  ) {
    deleteCardShare(input: $input, condition: $condition) {
      id
      sentByUserId
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
        rewardButtonImage
        rewardTitle
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
          cards {
            items {
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
            }
            count
            scannedCount
            nextToken
          }
        }
        userRewards {
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
              createdAt
              updatedAt
            }
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
            }
          }
          nextToken
        }
        userReaction {
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
              createdAt
              updatedAt
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
            }
          }
          nextToken
        }
        userInteractions {
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
              createdAt
              updatedAt
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
            }
          }
          nextToken
          scannedCount
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
            createdAt
            updatedAt
            link
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
            }
          }
          nextToken
          count
          scannedCount
        }
      }
    }
  }
`;