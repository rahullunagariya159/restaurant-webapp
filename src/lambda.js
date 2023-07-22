/* Amplify Params - DO NOT EDIT
API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_ARN
API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_NAME
API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
ENV
REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
console.log(AWS.VERSION)
const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
const docClient = new AWS.DynamoDB.DocumentClient();


exports.handler = async (event) => {

  console.log('arguments', JSON.stringify(event.arguments));

  const {
    city,
    restaurantUrl,
  } = event.arguments;

  // const scoreLoad = JSON.parse(payload);

  let params = {
    FilterExpression: 'restaurantUrl = :restaurantUrl and city = :city',
    ExpressionAttributeValues: {
      ':restaurantUrl': {'S': restaurantUrl},
      ':city': {'S': city},
    },
    TableName: process.env.API_CATERGRAM3_RESTAURANT_TABLE
  };
  console.log(params)

  let dynamoResult = await dynamodb.scan(params).promise();

  console.log(dynamoResult)

  if(dynamoResult.Items.length > 0) {
    return {
      errorCode: "Did not add retaurant URL",
      errorMsg: 'restaurantUrl already exists',
    };
  }

  const response = {
    restaurantUrl,
    message: "restaurantUrl does not exist",
    errorCode: "",
    errorMsg: ''
  };

  return response;
};
