
const AWS = require('aws-sdk');

// Create Message
function  CreateMessageRequest(token, title, content, cardname, restaurantName, badge) {

    //
    title = title.replace('{{cardname}}', cardname);
    title = title.replace('{{restaurant}}', restaurantName);
    content = content.replace('{{cardname}}', cardname);
    content = content.replace('{{restaurant}}', restaurantName);
    
  
    let action = 'OPEN_APP';
    let priority = 'normal';
    let ttl = 120;
    let silent = false;
  
    var messageRequest = {
      'Addresses': {
        [token]: {
          'ChannelType' : 'APNS'
        }
      },
      'MessageConfiguration': {
          'APNSMessage': {
          'Action': action,
          'Body': content,
          'Priority': priority,
          'SilentPush': silent,
          'Title': title,
          'TimeToLive': ttl,
          'Badge': badge,
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
    let {iosDeviceIds, title, content, cardName, restaurantName, notifications} = event.arguments;
    const pinpoint = new AWS.Pinpoint();
    console.log('---iosDeviceIds->>>>',iosDeviceIds );
    console.log('----notifications>>>>>', notifications);
    
    let i = 0;
    for await (const token of iosDeviceIds ) {
        console.log('TOKEN', token)
        const badge = notifications[i];
        console.log('--->> badge', badge)
        const messageRequest = CreateMessageRequest(token, title, content, cardName, restaurantName, badge);
        console.log('---messageRequest->>>>',messageRequest );
        
        const params = {
            "ApplicationId": process.env.applicationId,
            "MessageRequest": messageRequest
        };
        
        i++;
        try {
            /* code */
            const res = await doPinPoint(pinpoint, params);
            console.log('----->>>>>', res['MessageResponse'].Result);
        } catch (e) {
            console.log(e);
        }
        
    }

    const response = {
        statusCode: 200,
        id: JSON.stringify('Updated'),
    };
    return response;
};
