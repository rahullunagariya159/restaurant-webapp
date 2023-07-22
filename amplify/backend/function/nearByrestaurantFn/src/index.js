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
    const items = []
    console.log('nearByrestaurantFn event', JSON.stringify(event));
    console.log('nearByrestaurantFn arguments', JSON.stringify(event.arguments));

    const client = await getClient();

    const lat = event.arguments.location.lat;
    const lon = event.arguments.location.lon;
    const m = event.arguments.m;
    const size = event.arguments.limit;
    
    
    const result = await client.search({
      index: 'restaurant',
      body: {
        size: size,
        query: {
         bool: {
             filter: [
                {
                    geo_distance: {
                      distance: m + "miles",
                      distance_type: "arc",
                      location: {
                        lat: lat,
                        lon: lon
                      }
                    }
                }
             ]
         }
        },
        sort: [
            {
                "_geo_distance": {
                    "location": {
                        lat: lat,
                        lon: lon
                    },
                    "order": "asc",
                    "unit": "miles",
                    "distance_type": "arc"
                }
            }
        ]
      }
    });
    
    console.log("nearByrestaurantFn result ----->>>",result);
    console.log("nearByrestaurantFn result.body.hits.hits ----->>>",result.body.hits.hits);
    
    if(result.body.hits.hits) {
        result.body.hits.hits.forEach(i => {
            console.log('SHOW ITEM', JSON.stringify(i));
            items.push({
                id: i._source['id'],
                name: i._source['name'],
                address: i._source['address'],
                city: i._source['city'],
                zip: i._source['zip'],
                file: i._source['file'],
                description:  i._source['description'],
                location: i._source['location'],
                cuisine:  i._source['cuisine'],
                delivery:  i._source['delivery'],
                orderOptionUrls: i._source['orderOptionUrls'],
                contact: i._source['contact']
            });
        });
    }
    
    let nextToken = null;
    
    if(result.body.hits.hits[result.body.hits.hits.length - 1]) {
      nextToken = result.body.hits.hits[result.body.hits.hits.length - 1].sort[0];
    }
    console.log("nearByrestaurantFn items ---->>>",items);
    let response = {
        statusCode: 200,
        body: 
        items,
        nextToken
    };
    response = {
      items,
      total: items.length,
      nextToken: nextToken,
    };
    return response;
    
};
