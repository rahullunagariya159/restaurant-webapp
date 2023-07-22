/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_CARDPOINTTABLE_ARN
	API_CATERGRAM3_CARDPOINTTABLE_NAME
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
	STORAGE_SHADID_BUCKETNAME
Amplify Params - DO NOT EDIT */

const sharp = require('sharp');
const aws = require('aws-sdk');
const s3 = new aws.S3();

const Bucket = process.env.STORAGE_SHADID_BUCKETNAME;

exports.handler = async (event) => {
    const keys = event.arguments.keys;
    const perc = event.arguments.perc;
    //400000
    const size = event.arguments.size;
    // get the object lists
    const getAllItems = await listAllObjects();
    if(!keys) {
        const items = [];

        for (const element of getAllItems) {
            if(element.Size > size) {
                items.push(element.Key);
            }
        }

        console.log('===???', items.length);
        console.log('==>>>>>', items);

        return 'Updated';
    }
    
    //

    for (const key of keys) {
        const params = {
            Bucket,
            Key: key
        };
        const { ContentType, Body } = await s3.getObject(params).promise();
        const resizedImg = await sharp(Body)
            .jpeg({
                quality: perc
            })
            .toBuffer();
        const updated = await s3.putObject({ 
                Bucket, 
                Body: resizedImg, 
                Key: key,
                ContentType: 'jpeg'
            })
            .promise();
    }

};

function listAllObjects() {
    var params = {
        Bucket
    };
    return new Promise((resolve, reject) => {
        s3.listObjectsV2(params, function(err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            resolve(data.Contents);
        });
    })
}
