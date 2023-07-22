var AWS = require("aws-sdk");
var eventbridge = new AWS.EventBridge();

/** 
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler} 
 */
exports.handler = async event => {


  console.log(`EVENT: ${JSON.stringify(event)}`);

  for (const record of event.Records) {

    if (record.eventName == 'INSERT'){
    var name = record.dynamodb.NewImage.name.S;
    var id = record.dynamodb.NewImage.id.S;
    var city = record.dynamodb.NewImage.city.S;
     var menus = record.dynamodb.NewImage.menus.S;
    var params = {


      Entries: [ /* required */ {
          Source: 'custom.myapp',
          EventBusName: 'default',
          DetailType: 'ticket',
          Time: new Date(),

          // Main event body 
          Detail: JSON.stringify({
            "ticket": {
              "comment": {
                "body": "To approve click: develop.d1tzf8u5zazlj1.amplifyapp.com/cs/restaurant/" + id + 
                " in "  + city + " id: " + id
              },
              "priority": "normal",
              "subject": "New Restaurant Application " + name
            }
          })
        },

      ]
    };

    const result = await eventbridge.putEvents(params).promise();

    console.log(result);
    console.log(record.eventID);
    console.log(record.eventName);
    console.log('DynamoDB Record: %j', record.dynamodb);
}
  }

  return Promise.resolve('Successfully processed DynamoDB record');
};