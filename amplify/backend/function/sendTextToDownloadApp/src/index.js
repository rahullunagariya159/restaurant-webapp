/* Amplify Params - DO NOT EDIT
    API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
    API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
    API_CATERGRAM3_GRAPHQLAPIKEYOUTPUT
    ENV
    REGION
Amplify Params - DO NOT EDIT */
var AWS = require('aws-sdk');

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
exports.handler = async  event => {
    let response;
    try {
        // TODO implement
        // Sample event payload sent to the function: 
        // { "phone-number": "+1234567890", "message-text": "Download our app from Play Store" }
        // Create publish parameters from the event payload sent to the Lambda function
        var params = {
            Message: "Download our app from App Store", /* required */
            PhoneNumber: event['arguments']['countryCode'] + event['arguments']['customerNumber']
        };

        // Create promise and SNS service object
        var publishTextPromise = new AWS.SNS({apiVersion: '2010-03-31'}).publish(params).promise();
        
        // Handle promise's fulfilled/rejected states
        await publishTextPromise.then(
            function(data) {
                console.log(`Message "${params.Message}" sent to the number ${params.PhoneNumber}`);
                console.log("MessageID is " + data.MessageId);
            }).catch(
                function(err) {
                console.error(err, err.stack);
        });
        
        response = {
            statusCode: 200,
            body: JSON.stringify('Message is published!'),
            id:"test",
            errorMsg:"err", 
            errorCode :"msg", 
        };  
    }
    catch (error) {
        response = {
            body: JSON.stringify('Error'),
            errorMsg:"Something went wrong", 
            errorCode :400, 
        };
    }
    return response;
};