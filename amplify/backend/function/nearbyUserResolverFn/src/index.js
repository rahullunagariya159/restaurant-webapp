/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const { Client, Connection } = require("@opensearch-project/opensearch");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const aws4 = require("aws4");

const host = process.env.ES_ENDPOINT;
const region = process.env.REGION;

const createAwsConnector = (credentials, region) => {
    class AmazonConnection extends Connection {
        buildRequestObject(params) {
            const request = super.buildRequestObject(params);
            request.service = 'es';
            request.region = region;
            request.headers = request.headers || {};
            request.headers['host'] = request.hostname;
  
            return aws4.sign(request, credentials);
        }
    }
    return {
        Connection: AmazonConnection
    };
  };

const getClient = async () => {
    const credentials = await defaultProvider()();
    console.log("get client cred ---->>",credentials)
    return new Client({
        ...createAwsConnector(credentials, region),
        node: host,
    });
}

exports.handler = async (event) => {
    console.log("nearbyUserResolverFn event ---->>>",JSON.stringify(event));
    console.log("nearbyUserResolverFn arguments ---->>>",JSON.stringify(event.arguments));

    const client = await getClient();

    const lat = event.arguments.location.lat;
    const lon = event.arguments.location.lon;
    const m = event.arguments.m;
    
    const result = await client.search({
      index: 'userprofile',
      body: {
        size: 1000,
        query: {
         bool: {
             filter: [
                {
                    geo_distance: {
                      distance: m + "miles",
                      distance_type: "arc",
                      loc: {
                        lat: lat,
                        lon: lon
                      }
                    }
                }
             ]
         }
        }
      }
    });
    
    console.log("nearbyUserResolverFn result====>>>",result);
    console.log("nearbyUserResolverFn result====>>>",result.body.hits.hits);
    
    const items = [];
    
    if(result.body.hits.hits) {
        result.body.hits.hits.forEach(i => {
            console.log('SHOW ITEM', JSON.stringify(i));
            items.push({
                id: i._source['id'],
                uid: i._source['uid'],
                email: i._source['email'],
                firstname: i._source['firstname'],
                lastname: i._source['lastname'],
                createdAt: i._source['createdAt'],
                updatedAt: i._source['updatedAt'],
                iosDeviceId: i._source['iosDeviceId'],
                notifications: i._source['notifications']
            });
        });
    }
    console.log("nearbyUserResolverFn items====>>>",items);

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from Lambda!'),
        items
    };
    return response;
};


