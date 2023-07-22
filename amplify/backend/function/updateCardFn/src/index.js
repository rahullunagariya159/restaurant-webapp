/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_USERINTERACTIONTABLE_ARN
	API_CATERGRAM3_USERINTERACTIONTABLE_NAME
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
var AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});

/* == Globals == */
var esDomain = {
    region:  process.env.REGION,
    endpoint: process.env.ES_ENDPOINT,
    index: 'cardpoint',
    doctype: 'doc'
};
var endpoint = new AWS.Endpoint(esDomain.endpoint);
var creds = new AWS.EnvironmentCredentials('AWS');


exports.handler = async (event, context) => {
    let env;
    let graphql_auth;
    let response;
    console.log("updateCardFn event.arguments --->>>",event.arguments);
    console.log("updateCardFn context --->>>",context);

    env = process.env;
    graphql_auth = {
        type: "AWS_IAM",
        credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
        }
    };

    try {
      if (!graphqlClient) {
          graphqlClient = new AWSAppSyncClient({
              url: env.API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT,
              region: env.REGION,
              auth: graphql_auth,
              disableOffline: true,
          });
      }
      let userId = event.arguments.userId
      let cardId = event.arguments.cardId;
      
      if(event.arguments.espost) {
        const udoc = {
          id: cardId,
          body: {
              "script" : {
                  "source": `ctx._source.dislike = params.dislike; ctx._source.like = params.like;`,
                  "lang": "painless",
                  "params" : {
                      "like" : event.arguments.espost.like,
                      "dislike": event.arguments.espost.dislike
                  }
              },
              "retry_on_conflict": 8
          }
        }
        console.log("updateCardFn --->>>",udoc);

        // const esResponse = await postToES(udoc, context, true);
        // console.log('Magnitude ====>>>>>', esResponse); 

        return {
          statusCode: 200,
          body: JSON.stringify('Updated Card'),
          id: cardId
        }
      }

      if(event.arguments.esget) {
        const resz = await getCardFromES(cardId);
        console.log("updateCardFn resz--->>>", resz);

        return {
          statusCode: 200,
          body: JSON.stringify('Updated Card'),
          id: resz
        }
      }
      
      // Get User ID
      let owner = event.arguments.owner;
      console.log("event: ====>>>>", JSON.stringify(event));
      
      const likePayload = `if(ctx._source.dislike !== null && ctx._source.dislike.contains(params.tag) ) {ctx._source.dislike.remove(ctx._source.dislike.indexOf(params.tag))} if(ctx._source.like == null) { return ctx._source.like = [params.tag]} else {if(!ctx._source.like.contains(params.tag)) {ctx._source.like.add(params.tag);}}`
      const dislikePayload = `if( ctx._source.like !== null && ctx._source.like.contains(params.tag) ) { ctx._source.like.remove(ctx._source.like.indexOf(params.tag)) } if(ctx._source.dislike == null) { return ctx._source.dislike = [params.tag]} else {if(!ctx._source.dislike.contains(params.tag)) { ctx._source.dislike.add(params.tag);}}`


      const payload = event.arguments.likeOrDislike == 'Like' ? likePayload : dislikePayload;
      // console.log("updateCardFn respayloadz--->>>", respayloadz);

      const time = new Date().toISOString();
      const adoc = {
        id: cardId,
        body: {
            "script" : {
                "source": payload,
                "lang": "painless",
                "params" : {
                    "tag" : userId,
                    "object": {
                      id: userId,
                      date: time
                    }
                }
            }
        }
      }

      console.log("updateCardFn adoc--->>>", adoc);

      console.log('--->> Start');
      const esResponse = await postToES(adoc, context);
      console.log('--------- DONE ES ---------', esResponse);

      //update card mood value
      let isLike = event.arguments.likeOrDislike === 'Like';
      console.log('isLike --->>>', isLike,cardId);
      try{
         currentCard = await graphqlClient.query({
          query: gql(getCardPoint),
          variables: {
              id: cardId
          }
        });
        console.log("updateCardFn currentCard--->>>", currentCard);
      }
      catch(error){
          console.log({"---":error})
      }
      if(currentCard.data.getCardPoint.cardPointMoodId){
        console.log('card has mood',currentCard.data.getCardPoint)
        const moodId = currentCard.data.getCardPoint.cardPointMoodId
        
        const userMoods = await graphqlClient.query({
          query: gql(getUserMoods),
          variables: {
            userId,
            moodId
          }
        });
        console.log(userMoods)
        console.log('moodId', moodId)
        console.log('userId' , userId)

        if(userMoods.data.listUserMoods.items.length){
          const userMoodId = userMoods.data.listUserMoods.items[0].id
          let moodValue = userMoods.data.listUserMoods.items[0].value
          if(event.arguments.likeOrDislike === 'Like'){
            moodValue++;
          } else if(event.arguments.likeOrDislike === 'Dislike') {
            moodValue--;
          }
          console.log('update existing mood ', userMoodId)
          console.log('updated moodValue ', moodValue)
          await graphqlClient.mutate({
            mutation: gql(updateUserMood),
            variables: {
                input: {
                    id: userMoodId,
                    value: moodValue
                }
            }
          });
        } else {
          console.log('create new mood')
          await graphqlClient.mutate({
            mutation: gql(createUserMood),
            variables: {
                input: {
                    userProfileMoodsId: userId,
                    moodUserMoodsId: moodId,
                    value: 1
                }
            }
        });
      }

    }
      

      var params = {
        FilterExpression: 'referenceUserKey = :referenceUserKey AND cardPointUserInteractionsId = :cardPointUserInteractionsId',
        ExpressionAttributeValues: {
            ':referenceUserKey': {S: userId},
            ':cardPointUserInteractionsId': {S: cardId}
        },
        TableName: process.env.API_CATERGRAM3_USERINTERACTIONTABLE_NAME
      };
      console.log('updateCardFn params --->>',params)

      let result = await dynamodb.scan(params).promise();
      let interactionID = result.Items[0] ? result.Items[0].id.S : null
      console.log('updateCardFn result --->>>', result);
      console.log('updateCardFn interaction id --->>', interactionID);

      if(interactionID) {
          console.log('Updating Object')
          // NEED TO SWITCH THE CARD TO OPPOSITE
          const newRes =  await graphqlClient.mutate({
              mutation: gql(updateUserInteraction),
              variables: {
                  input: {
                      id: interactionID,
                      isLiked: isLike
                  }
              }
          });
          console.log('Updated newRes.data.updateUserInteraction.id', newRes.data.updateUserInteraction.id);
          console.log('Updated newRes.data.updateUserInteraction.referenceUserKey', newRes.data.updateUserInteraction.referenceUserKey);
      } else {
          console.log('Creating New Object')
          // NEED TO MAKE A NEW LIKE DISLIKE OBJECT
          await graphqlClient.mutate({
              mutation: gql(createUserInteraction),
              variables: {
                  input: {
                      isLiked: isLike,
                      cardPointUserInteractionsId: cardId,
                      userProfileInteractionsId: userId,
                      referenceUserKey: userId,
                      owner: owner
                  }
              }
          });
          // console.log('brand new Like', newRes.data.createUserInteraction)
      }

      const queryRes =  await graphqlClient.query({
      query: gql(getCardPoint),
      variables: {
          id: cardId
      }
      });

      console.log('queryRes.data.getCardPoint.like Like array: ', queryRes.data.getCardPoint.like) 
      console.log('queryRes.data.getCardPoint.dislike Dislike array: ', queryRes.data.getCardPoint.dislike)

      const like = queryRes.data.getCardPoint.like || []
      const dislike = queryRes.data.getCardPoint.dislike || []
      if(isLike){
      // IF user like item then put it inside like column
      like.push(userId);
      const indexOf = dislike.indexOf(userId)
      if(indexOf > -1){
      dislike.splice(indexOf, 1);
      }
      } else {
      // Is users dislike means it false so we need to remove userID from like column
      const indexOf = like.indexOf(userId)
      if(indexOf > -1){
      like.splice(indexOf, 1);
      }
      dislike.push(userId)
      }
      console.log('dislike : ', dislike)

    const newRes2 =  await graphqlClient.mutate({
      mutation: gql(updateCardPoint),
        variables: {
          input: {
            id: cardId,
            like: like,
            dislike: dislike
          }
        }
      });

      console.log('Updated Like inside cardpoint newRes2 --->>', newRes2);
      result = await dynamodb.scan(params).promise();
      console.log('Updated Like inside cardpoint result --->>', result);
      interactionID = result.Items[0] ? result.Items[0].id.S : null
      console.log('interaction id after adding records', interactionID);

      response = {
          statusCode: 200,
          body: JSON.stringify('Hello from Lambda!'),
          id: cardId
      };
      console.log('interaction id after adding records response --->>', response);

  } catch (error) {
    console.log('interaction id after adding records Error --->>', error);

      response = {
        statusCode: 400,
        body: JSON.stringify('Error!'),
        id: ""
      };
  }
  return response;
};  

const updateUserInteraction = /* GraphQL */ `
  
  mutation UpdateUserInteraction(
    $input: UpdateUserInteractionInput!
    $condition: ModelUserInteractionConditionInput
  ) 
  {
    updateUserInteraction(input: $input, condition: $condition) {
      id
      isLiked
      referenceUserKey
      card {
        id
        name
        description
        price
        delivery
        cardPointFile {
          key
          bucket
          region
        }
        restaurant {
          id
          name
          cuisine
          address
          city
          zip
          lat
          lng
        }
        orderOptionUrls {
          backgroundColor
          file {
              key
              bucket
              region
          }
          fontColor
          name
          url
        }
      }
    }
  }
`;

const createUserInteraction = /* GraphQL */ `
  mutation CreateUserInteraction(
    $input: CreateUserInteractionInput!
    $condition: ModelUserInteractionConditionInput
  ) {
    createUserInteraction(input: $input, condition: $condition) {
      id
      isLiked
      referenceUserKey
      card {
        id
        name
        description
        price
        delivery
        cardPointFile {
          key
          bucket
          region
        }
        restaurant {
          id
          name
          cuisine
          address
          city
          zip
          lat
          lng
        }
        orderOptionUrls {
          backgroundColor
          file {
              key
              bucket
              region
          }
          fontColor
          name
          url
        }
      }    
    }
  }
`;

const updateUserMood = /* GraphQL */ `
  mutation UpdateUserMood(
    $input: UpdateUserMoodInput!
    $condition: ModelUserMoodConditionInput
  ) {
    updateUserMood(input: $input, condition: $condition) {
      id
    }
  }
`;

const createUserMood = /* GraphQL */ `
  mutation CreateUserMood(
    $input: CreateUserMoodInput!
    $condition: ModelUserMoodConditionInput
  ) {
    createUserMood(input: $input, condition: $condition) {
      id
    }
  }
`;

const getUserMoods = /* GraphQL */ `
  query GetUserMoods($userId: ID!, $moodId: ID!) {
    listUserMoods(filter: {moodUserMoodsId: {eq: $moodId}, userProfileMoodsId: {eq: $userId}}) {
      items {
        id
        value
      }
    }
  }
`;

const getCardPoint = /* GraphQL */ `
  query GetCardPoint($id: ID!) {
    getCardPoint(id: $id) {
      id
      cardPointMoodId
      like
      dislike
    }
  }
`;

const updateCardPoint = /* GraphQL */ ` 
      mutation UpdateCardPoint($input: UpdateCardPointInput!, $condition: ModelCardPointConditionInput) { 
       updateCardPoint(input: $input, condition: $condition) { 
        id
	like
	dislike
    } 
  } 
`;


function getFromES(doc, context) {
  return new Promise((resolve, reject) => {
    var req = new AWS.HttpRequest(endpoint);
    

    req.method = 'POST';
    req.path = `/userinteraction/doc/_search`
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.headers[ 'Content-type' ] = 'application/json';
    req.body = JSON.stringify(doc.body);

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
        var respBody = '';
        httpResp.on('data', function (chunk) {
            respBody += chunk;
        });
        httpResp.on('end', function (chunk) {
            console.log('Response: ' + respBody);
            resolve(respBody);
        });
    }, function(err) {
        console.log('getFromES Error: ' + err);
        reject(err);
        context.fail('Lambda failed with error ' + err);
    });

  });
}

function postToES(doc, context, retries) {

  return new Promise((resolve, reject) => {
    var req = new AWS.HttpRequest(endpoint);
    req.path = `/cardpoint/doc/${doc.id}/_update`
    if(retries) {
      req.path = `/cardpoint/doc/${doc.id}/_update?retry_on_conflict=10`
    }
    req.method = 'POST';
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.headers[ 'Content-type' ] = 'application/json';
    req.body = JSON.stringify(doc.body);
    console.log('GetFromES Error req: ' + req);
    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
        var respBody = '';
        httpResp.on('data', function (chunk) {
            respBody += chunk;
        });
        httpResp.on('end', function (chunk) {
            console.log('Response: ' + respBody);
            resolve({'success': 'ok'});
        });
    }, function(err) {
        console.log('GetFromES Error: ' + err);
        reject(err);
        context.fail('Lambda failed with error ' + err);
    });

  });
}

function getCardFromES(id) {
  return new Promise((resolve, reject) => {
    var req = new AWS.HttpRequest(endpoint);
    req.method = 'GET';
    req.path = `/cardpoint/doc/${id}`
    req.region = esDomain.region;
    req.headers['presigned-expires'] = false;
    req.headers['Host'] = endpoint.host;
    req.headers[ 'Content-type' ] = 'application/json';
    console.log('getCardFromES id --->> ' + id);
    console.log('getCardFromES --->>> ' + req);

    var signer = new AWS.Signers.V4(req , 'es');  // es: service code
    signer.addAuthorization(creds, new Date());

    var send = new AWS.NodeHttpClient();
    send.handleRequest(req, null, function(httpResp) {
      var respBody = '';
      httpResp.on('data', function (chunk) {
          respBody += chunk;
      });
      httpResp.on('end', function (chunk) {
          console.log('GetCardFromES Response: ' + respBody);
          resolve(respBody);
      });
    }, function(err) {
        console.log('GetCardFromES Error: ' + err);
        reject(err);
        context.fail('Lambda failed with error ' + err);
    });

  })
}
