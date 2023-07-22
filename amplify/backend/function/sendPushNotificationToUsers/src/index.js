const AWS = require('aws-sdk');

exports.handler = async (event) => {
    const { payload, iosTokens } = event.arguments;
    let incomingPayload = JSON.parse(payload);

    const messageRequest = CreateMessageRequest(
        iosTokens, 
        incomingPayload
    );
    console.log('==messageRequest=>>>', messageRequest)
    const pinpoint = new AWS.Pinpoint();

    const params = {
        "ApplicationId": process.env.applicationId,
        "MessageRequest": messageRequest
    };
    const res = await doPinPoint(pinpoint, params);
    console.log('==res=>>>', JSON.stringify(res))

    const response = {
        statusCode: 200,
        id: 'Done',
        body: JSON.stringify(res),
    };
    return response;
};


// Create Message
function  CreateMessageRequest(token, payload) {
  
    let action = 'OPEN_APP';
    let priority = 'normal';
    let ttl = 30;
    let silent = false;

    // Destruct title and message
    const {title, message} = payload;

    console.log('Sending Title', title);
    console.log('Sending contentMessage', message);
    
    console.log('TOKENNNNN', token);
    
    
    const messageRequest = {
      'Addresses': {
        [token[0]]: {
          'ChannelType' : 'APNS'
        }
      },
      'MessageConfiguration': {
        'APNSMessage': {
          'Action': action,
          'Body': message,
          'Priority': priority,
          'SilentPush': silent,
          'Title': title,
          'TimeToLive': ttl,
        }
      }
    };
    
    return messageRequest;
}

// Execute Pinpoint
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
