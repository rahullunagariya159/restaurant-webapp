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


function  CreateMessageRequest(token, title, content, card, friendName) {
  
    let action = 'OPEN_APP';
    let priority = 'normal';
    let ttl = 30;
    let silent = false;

    console.log('FriendName', friendName)

    title = title.replace('{{cardname}}', card.name);
    title = title.replace('{{restaurant}}', card.restaurant.name);
    title = title.replace('{{friend}}', friendName);

    content = content.replace('{{cardname}}', card.name);
    content = content.replace('{{restaurant}}', card.restaurant.name);
    content = content.replace('{{friend}}', friendName);

    console.log('TITLE', title);
    console.log('content', content);
  
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

    for await (userId of userIds) {
        // Get the Current User
        
        try {
            const currentUserRsp =  await graphqlClient.query({
                query: gql(getUserProfile),
                variables: {
                    id: userId
                }
            }); 
            console.log('USER RESPONSE', currentUserRsp.data.getUserProfile.friends.items);
            // Pick a Random Friend
            if(currentUserRsp.data.getUserProfile.friends.items.length > 0) {
                let randomCard = null;
                let i = Math.floor((Math.random() * currentUserRsp.data.getUserProfile.friends.items.length));
                const randomFriend = currentUserRsp.data.getUserProfile.friends.items[i];
                console.log('randomFriend---->>>>>', randomFriend);
                if(randomFriend.userReference.interactions.items.length > 0) {
                    let j = Math.floor((Math.random() * randomFriend.userReference.interactions.items.length));
                    randomCard = randomFriend.userReference.interactions.items[j];
                }
                if(randomCard) {
                    console.log('Found A Random Card', JSON.stringify(randomCard));
                    // Send Push Notifications 
                    const token = currentUserRsp.data.getUserProfile.iosDeviceId;
                    let title = event.arguments.title;
                    let content = event.arguments.content;

                    if(token) {
                        console.log('====>>>> HAS TOKEN', token);
                        const friendName = randomFriend.userReference.firstname + ' ' + randomFriend.userReference.lastname;
                        const messageRequest = CreateMessageRequest(token, title, content, randomCard.card, friendName);
                
                        const pinpoint = new AWS.Pinpoint();
                            
                        const params = {
                            "ApplicationId": process.env.applicationId,
                            "MessageRequest": messageRequest
                        };
                
                        const res = await doPinPoint(pinpoint, params);
                        console.log('----->>>>>', res['MessageResponse'].Result);
                    }
                }
            }
        } catch (error) {
            console.log('Error', error)
        }

    }

    const response = {
        statusCode: 200,
        id: JSON.stringify('Updated'),
    };
    return response;
};



const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) 
    {
        getUserProfile(id: $id) 
        {
            id 
            iosDeviceId
            friends {
                items {
                    userReference {
                        firstname
                        lastname
                        interactions(filter: {
                            isLiked: {
                            eq: true
                            }
                        }) {
                            items {
                                card {
                                    id
                                    name
                                    restaurant {
                                        name
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
`;
