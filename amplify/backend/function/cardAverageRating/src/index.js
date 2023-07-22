/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_RATINGTABLE_ARN
	API_CATERGRAM3_RATINGTABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWS = require("aws-sdk");
// Create DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });

function QueryDynamo(cardId) {
    
    const params = {
        TableName: process.env.API_CATERGRAM3_RATINGTABLE_NAME,
        KeyConditionExpression: "CardID = :a",
        IndexName: "byCard",
        ExpressionAttributeValues: {
            ":a": {
                S: cardId,
            },
        },
    };
    
    return new Promise((resolve, reject) => {
        ddb.query(params, (err, data) => {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                resolve(data.Items);
            }
        });
    });
}

exports.handler = async (event) => {
    
    const cardId = event.arguments.cardId;
    const rsp = await QueryDynamo(cardId);
    
    console.log('FOUND', JSON.stringify(rsp));
    let total = 0;
    
    rsp.forEach((i) => {
        total = total + Number(i.score.N)
    });
    
    console.log('total', total);
    console.log('rsp.legth', rsp.length);
    
    const averageRating = total /  rsp.length;
    
    const response = {
        statusCode: 200,
        average: averageRating,
        total: rsp.length
    };
    return response;
};
