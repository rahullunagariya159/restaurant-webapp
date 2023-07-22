/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_CARDPOINTTABLE_ARN
	API_CATERGRAM3_CARDPOINTTABLE_NAME
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_RESTAURANTTABLE_ARN
	API_CATERGRAM3_RESTAURANTTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const { Client, Connection } = require("@opensearch-project/opensearch");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const aws4 = require("aws4");

const host = process.env.ES_ENDPOINT;
const region = process.env.REGION;

const createAwsConnector = (credentials, region) => {
    class AmazonConnection extends Connection {
        buildRequestObject(params) {
            const request = super.buildRequestObject(params);
            request.service = 'es';
            request.region = region;
            request.headers = request.headers || {};
            request.headers['host'] = request.hostname;
  
            return aws4.sign(request, credentials);
        }
    }
    return {
        Connection: AmazonConnection
    };
  };

const getClient = async () => {
    const credentials = await defaultProvider()();
    console.log("get client cred ---->>",credentials)
    return new Client({
        ...createAwsConnector(credentials, region),
        node: host,
    });
}

// Create Message
function  CreateMessageRequest(token, title, contentMessage, cardname, restaurantname) {
  
  let action = 'OPEN_APP';
  let priority = 'normal';
  let ttl = 30;
  let silent = false;
  
  contentMessage = contentMessage.replace('{{cardname}}', cardname);
  contentMessage = contentMessage.replace('{{restaurant}}', restaurantname);
  
  title = title.replace('{{cardname}}', cardname);
  title = title.replace('{{restaurant}}', restaurantname);
  
  console.log('Sending Title', title);
  console.log('Sending contentMessage', contentMessage);
  
  console.log('TOKENNNNN', token);
  
  
  var messageRequest = {
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
    // Find the popular cards in the area
   
     console.log('sendPopularCardInArea event--------->>', event);
    console.log('sendPopularCardInArea arguments--------->>', event.arguments);

    const client = await getClient();
    const lat = event.arguments.location.lat;
    const lon = event.arguments.location.lon;
    const m = event.arguments.m;
    const mostShared = event.arguments.mostShared;

    const result = await client.search({
        index: 'cardpoint',
        body: {
          query: {
           bool: {
               filter: [
                  {
                      geo_distance: {
                        distance: m + "miles",
                        distance_type: "arc",
                        location: {
                          lat: lat,
                          lon: lon
                        }
                      }
                  }
               ]
           }
          }
        }
      });
     
    let topScore = -1;  
    let cardMostLiked = null;

    let topScoreForMostShared = -1;
    let cardMostShared = null;
    let restaurant = null;
    
      
    console.log('sendPopularCardInArea result--------->>', JSON.stringify(result));

    if(result.body.hits.hits) {
        result.body.hits.hits.forEach(i => {
            if(i._source.like) {
                console.log('SHOW ITEM', JSON.stringify(i._source.like.length));
                if(i._source.like.length > topScore) {
                    cardMostLiked = i._source;
                    topScore = i._source.like.length;
                }
            }
        });
        // Get the Resturant info now
         const _resRestaurant = await client.search({
          index: 'restaurant',
          body: {
            query: {
              bool: {
                must: [
                  {
                   match: {
                      id:cardMostLiked.restaurantID
                   }
                  }
                ]
              }
            }
          }
        });
        restaurant = _resRestaurant.body.hits.hits[0]._source;
    }

    // initiate additional searching if this is most shared
    if(result.body.hits.hits && mostShared) {
      for(let hit of result.body.hits.hits) {
        console.log('sendPopularCardInArea Inside Most Liked --->>>', hit._id);  
        const __result = await client.search({
          index: 'cardshare',
          body: {
            query: {
              bool: {
                must: [
                  {
                   match: {
                    cardPointSharesId: hit._id
                   }
                  }
                ]
              }
            }
          }
        });
        if(__result.body.hits.total > topScoreForMostShared) {
          cardMostShared = hit._source;
        }
      }
         // Get the Resturant info now
         const _resRestaurant = await client.search({
          index: 'restaurant',
          body: {
            query: {
              bool: {
                must: [
                  {
                   match: {
                      id:cardMostShared.restaurantID
                   }
                  }
                ]
              }
            }
          }
        });
        restaurant = _resRestaurant.body.hits.hits[0]._source;
    }

    
    // Send this card to users 
    const iosDeviceIds = event.arguments.iosDeviceIds;
    const title = event.arguments.title;
    const content = event.arguments.content;
    
    const pinpoint = new AWS.Pinpoint();
    
    if(mostShared) {
        console.log('sendPopularCardInArea Card Most Shared =====>>>>', JSON.stringify(cardMostShared));
        console.log('sendPopularCardInArea Restaurant ---+++++', JSON.stringify(restaurant));
        for (let id of iosDeviceIds) {
          // send push notification
          const messageRequest = CreateMessageRequest(id, title, content, cardMostShared.name, restaurant.name);
          const params = {
              "ApplicationId": process.env.applicationId,
              "MessageRequest": messageRequest
          };
            
          const res = await doPinPoint(pinpoint, params);
          console.log('sendPopularCardInArea ----->>>>>', res['MessageResponse'].Result);
        }
    } else {
        console.log('Card Most Popular ---->>>>', JSON.stringify(cardMostLiked));
        console.log('Restaurant ---+++++', JSON.stringify(restaurant));
        for (let id of iosDeviceIds) {
          // send push notification
          const messageRequest = CreateMessageRequest(id, title, content, cardMostLiked.name, restaurant.name);
          console.log('--->>>>>', messageRequest);
          const params = {
              "ApplicationId": process.env.applicationId,
              "MessageRequest": messageRequest
          };
            
          const res = await doPinPoint(pinpoint, params);
          console.log('sendPopularCardInArea MessageResponse----->>>>>', res['MessageResponse'].Result);
        }
    }
    
    let responseMessage = `Popular Card ${cardMostLiked.name} is sent out`;
    if(mostShared) {
        responseMessage = `Most Shared Card ${cardMostShared.name} from ${restaurant.name}`;
    }
    
    const response = {
        statusCode: 200,
        id: responseMessage,
    };
    return response;
};
