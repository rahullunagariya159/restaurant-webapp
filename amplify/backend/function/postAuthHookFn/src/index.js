/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_USERPROFILETABLE_ARN
	API_CATERGRAM3_USERPROFILETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");
// Create DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: "2012-08-10" });
const docClient = new AWS.DynamoDB.DocumentClient();


function UpdateUserInDB(id, lat, lon) {
    console.log('---->>>> lat', lat);
    console.log('-----lon', lon);
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

function CreateUserInTable(email, sub, phone_number, firstname, lastname ) {
    let lastName = lastname ? lastname : '';
    let params = {
        TableName: process.env.API_CATERGRAM3_USERPROFILETABLE_NAME,
        Item: {
            "id": {
               S: sub
            },
           "email": {
                S: email
            }, 
           "uid": {
                S: sub
            }, 
           "phoneNumber": {
                S: phone_number
            },
            "firstname": {
                S: firstname
            },
            "lastname": {
                S: lastName
            }
        }, 
    };
    
    return new Promise((resolve, reject) => {
       ddb.putItem(params, (err, data) => {
           if(err) {
               reject(err);
           }
           resolve(data);
       });
    });
}


function QueryDynamo(email) {
    
    let params = {
        TableName: process.env.API_CATERGRAM3_USERPROFILETABLE_NAME,
        KeyConditionExpression: "email = :a",
        IndexName: "byEmail",
        ExpressionAttributeValues: {
            ":a": {
                S: email,
            },
        },
    };
    
    return new Promise((resolve, reject) => {
        ddb.query(params, (err, data) => {
            if (err) {
                console.log("Error", err);
                reject(err);
            } else {
                resolve(data.Items[0]);
            }
        });
    });
}



exports.handler = async (event, context) => {
    console.log('====>>>>', JSON.stringify(event));
    const email = event.request.userAttributes["email"];
    const phone_number = event.request.userAttributes["phone_number"];
    const sub = event.request.userAttributes["sub"];
    const firstname = event.request.userAttributes["given_name"];
    const lastname = event.request.userAttributes["family_name"];
    
    const userToUpdate = await QueryDynamo(email);
    if(userToUpdate) {
        try {
            const userRSP = await UpdateUserInDB(userToUpdate.id.S, userToUpdate.lat.S, userToUpdate.lon.S);
            console.log('Updated User', JSON.stringify(userRSP));
        } catch (e) {
            console.log('ERROR', e);
        }
    } else {
        // We will create a USER Profile 
        const newCreat = await CreateUserInTable(email, sub, phone_number, firstname, lastname);
        console.log('Neww', newCreat);
    }
    
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('User Creation Successful'),
    };
    context.done(null, event);
    return response;
};
