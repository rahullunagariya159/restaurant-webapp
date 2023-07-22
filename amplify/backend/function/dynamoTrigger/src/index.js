/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_USERPROFILETABLE_ARN
	API_CATERGRAM3_USERPROFILETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */


const AWS = require("aws-sdk");
const docClient = new AWS.DynamoDB.DocumentClient();


function UpdateUserInDB(id, lat, lon) {
    const params = {
        TableName: process.env.API_CATERGRAM3_USERPROFILETABLE_NAME,
        Key: { id : id },
        UpdateExpression: `set lastLogin = :lastLogin, loc = :a`,
        ExpressionAttributeValues:{
            ":lastLogin": new Date().toISOString(),
            ":a": {
                "lat": lat,
                "lon": lon
            }
        },
        ReturnValues:"UPDATED_NEW"
    };

    return new Promise((resolve, reject) => {
        docClient.update(params, (err, data) => {
            if (err) {
                console.error(
                    "Unable to add item. Error JSON:",
                    JSON.stringify(err, null, 2)
                );
                reject(err);
            } else {
                resolve({ status: "Item Created", data });
            }
        });
    });
}

function needsUpdate(image) {
    if(!image.loc || !image.loc.M || !image.loc.M.lon) {
        return true;
    }
    if(image.loc.M.lon.S !== image.lon.S) {
        return true;
    }
    return false;
}

exports.handler = async (event) => {
    const eventName = event.Records[0].eventName;
    const image = event.Records[0].dynamodb.NewImage;
    console.log('--->>>eventName', eventName);
    if(eventName === 'MODIFY' || eventName === 'INSERT') {
        console.log('Image ===>>>', JSON.stringify(image));
        // cehck if the loc and lon is 
        if(image.lat && image.lon) {
            const dbNeedsUpdate = needsUpdate(image);
            console.log('---needsUpdate>>>>>',dbNeedsUpdate )
            if(dbNeedsUpdate) {
                try {
                    const userRSP = await UpdateUserInDB(image.id.S, image.lat.S, image.lon.S);
                    console.log('Updated User', JSON.stringify(userRSP));
                } catch (e) {
                    console.log('ERROR', e);
                }
            }
        }
    }
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
