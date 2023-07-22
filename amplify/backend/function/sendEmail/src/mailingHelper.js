module.exports = function (email, restaurant, link) {
    return ({
        Destination: {
        /* required */
        CcAddresses: [
            /* more items */
        ],
        ToAddresses: [
            email,
            /* more items */
        ],
    },
    Message: {
        /* required */
        Body: {
            /* required */
            Html: {
                Charset: "UTF-8",
                Data: `
                    <h1>A new menu is added from ${restaurant} for your approval</h1>
                    <div>
                        <a href="${link}">Click here to review</a>
                    </div>
                `,
            },
            Text: {
                Charset: "UTF-8",
                Data: "TEXT_FORMAT_BODY",
            },
        },
        Subject: {
            Charset: "UTF-8",
            Data: `Restaurant: ${restaurant} - New Menu Pending Approval`,
        },
    },
    Source: "admin@fooddiscoveryapp.com" /* required */,
    ReplyToAddresses: [
        /* more items */
    ],
    })
};