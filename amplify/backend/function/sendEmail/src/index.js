const AWS = require("aws-sdk");
const CreatePayload = require('./mailingHelper');
const DeletePayload = require('./disableHelper');

exports.handler = async (event) => {
    const {cardInformation} = event.arguments;
    console.log('---->>>>', cardInformation);

    const input = JSON.parse(cardInformation);
    let payload;
    if(input.context === 'ADD') {
        payload = CreatePayload("admin@fooddiscoveryapp.com", input.restaurant, input.link);
    }
    if(input.context === 'DEL') {
        payload = DeletePayload("admin@fooddiscoveryapp.com", input.restaurant, input.link);
    }
    
    console.log('payload', payload);
    
    await fireEmailsToUser(payload)
    
    const response = {
        statusCode: 200,
        id: JSON.stringify('<<< email sent >>>'),
    };
    return response;
};


async function fireEmailsToUser(payload) {
    try {
        await new AWS.SES({ apiVersion: "2010-12-01" })
            .sendEmail(payload)
            .promise();
    } catch (error) {
        console.log('---->>>>', error);
    }
}
