/* Amplify Params - DO NOT EDIT
	ANALYTICS_BETAONE_ID
	ANALYTICS_BETAONE_REGION
	ENV
	REGION
Amplify Params - DO NOT EDIT */

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
 'use strict';
 var AWS = require("aws-sdk");
 var sns = new AWS.SNS();
 
 exports.handler = (event, context, callback) => {
 
     event.Records.forEach((record) => {
         console.log('Stream record: ', JSON.stringify(record, null, 2));
 
         if (record.eventName == 'MODIFY') {
             var restaurantID = record.dynamodb.NewImage.restaurantID.S;
             var when = record.dynamodb.NewImage.updatedAt.S;
             var cardname = record.dynamodb.NewImage.name.S;
             var imageFile = record.dynamodb.NewImage.userUploadedImages.L[0].M.key.S;
             var params = {
                 //Subject: 'New user image uploaded ' + record.dynamodb.NewImage.name.S + ' ' + record.dynamodb.NewImage.updatedAt.S,
                 //Message: 'There was a new images uploaded for approval ' + record.dynamodb.NewImage.name.S + ' uploaded the following at ' + record.dynamodb.NewImage.updatedAt.S + ':\n\n ' + record.dynamodb.NewImage.restaurant.S,
                 Subject: 'New user image uploaded ' + cardname + ' ' + when,
                 Message:  'There was a new images uploaded for approval ' + cardname + '\nwas uploaded at ' + when + '\nthe file: ' + imageFile + '\nrestaurantID: ' + restaurantID,
                 TopicArn: 'arn:aws:sns:us-east-1:875100320372:Users-uploaded-new-images'
             };
             sns.publish(params, function(err, data) {
                 if (err) {
                     console.error("Unable to send message. Error JSON:", JSON.stringify(err, null, 2));
                 } else {
                     console.log("Results from sending message: ", JSON.stringify(data, null, 2));
                 }
             });
         }
     });
     callback(null, `Successfully processed ${event.Records.length} records.`);
 };   
