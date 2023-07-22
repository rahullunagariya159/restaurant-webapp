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
                    <h1>A request to remove a menu from ${restaurant} is pending</h1>
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
            Data: `Restaurant: ${restaurant} - requested menu to remove`,
        },
    },
    Source: "admin@fooddiscoveryapp.com" /* required */,
    ReplyToAddresses: [
        /* more items */
    ],
    })
};