
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
	let response;
	try {
		console.log('validateRestaurantUrl event ---->>>', JSON.stringify(event));
		console.log('validateRestaurantUrl arguments ---->>>', JSON.stringify(event.arguments));

		const {
			city,
			id,
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
		console.log("validateRestaurantUrl params ------>>",params)

		let dynamoResult = await dynamodb.scan(params).promise();

		console.log("validateRestaurantUrl dynamoResult ------>>",dynamoResult)

		if(dynamoResult.Items.length > 0) {
			return {
				errorCode: "Did not add retaurant URL",
				errorMsg: 'restaurantUrl already exists',
				id: id
			};
		}

		params = {
			Key: { id : id },
			TableName:  process.env.API_CATERGRAM3_RESTAURANT_TABLE,
			UpdateExpression: "set restaurantUrl = :restaurantUrl",
			ConditionExpression: "id = :id",
			ExpressionAttributeValues: {
				":id": id,
				':restaurantUrl': restaurantUrl,

			}
		};
		var errorMsg = "";
		await docClient.update(params,function(err, data) {
			if (err) errorMsg = err;
			else console.log(data);
			}).promise();
	

		//const response = {
		//	status: true,
		//	message: 'restaurantUrl has been updated successfully'
		//	};

		response = {
			id,
			restaurantUrl,
			errorCode: "",
			errorMsg 
		};
	} catch (error) {
		console.log("validateRestaurantUrl error--->>",error);	
		response = {
			errorCode: 400,
			errorMsg:JSON.stringify('error'), 
		};
	}
	return response;
};