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
    console.log('searchRestaurantsResolver event ---------', event);
    console.log('searchRestaurantsResolver arguments ---------', event.arguments);

    let response;
    try {
        const client = await getClient();

        const name = event.arguments.name;
        const nextScore = event.arguments.nextToken;
        const limit = event.arguments.limit;
        let isWildcard = false;
        
        let payloadA = {
            index: 'restaurant',
            body: {
            query: {
                bool: {
                    must: [
                        {
                            match: {
                                name: name
                            }
                        }
                    ]
                },
                
            }
            }
        };
        let payload = {
            index: 'restaurant',
            body: {
            query: {
                bool: {
                    must: [
                        {
                            wildcard: {
                                name: {
                                value: `*${name}*`
                                }
                            }
                        }
                    ]
                }
            }
            }
        };
        
        if(nextScore) {
            payloadA.body.search_after = [nextScore];
        }
        if(limit) {
            payloadA.body.size = limit;
        }
        
        let result = await client.search(payloadA);

        console.log('searchRestaurantsResolver result ------>>>>', JSON.stringify(result));
        if(result.body.hits.hits.length === 0) {
            // Do Wildcard Search
            isWildcard = true;
            if(nextScore) {
                payload.body.search_after = [nextScore];
            }
            if(limit) {
                payload.body.size = limit;
            }
            result = await client.search(payload);
        }

        const items = [];
        let nextToken = null;

        if(result.body.hits.hits) {
            result.body.hits.hits.forEach(i => {
                console.log('SHOW ITEM', JSON.stringify(i));
                const { 
                    id,
                    name,
                    address,
                    city,
                    zip,
                    file,
                    description,
                    lat,
                    lng,
                    cards,
                    cuisine,
                    delivery,
                    contact
                } = i._source;
                items.push({
                    id,
                    name,
                    address,
                    city,
                    zip,
                    file,
                    description,
                    lat,
                    lng,
                    cards,
                    cuisine,
                    delivery,
                    contact
                });
            });
            if(result.body.hits.hits.length > 0 && result.body.hits.hits[result.body.hits.hits.length - 1].sort) {
                nextToken = result.body.hits.hits[result.body.hits.hits.length - 1].sort[0];
                
                // Grab Next Next Token
                let resultNext;
                if(nextToken) {
                    if(isWildcard) {
                        payload.body.search_after = [nextToken];
                        resultNext = await client.search(payload);
                    } else {
                        payloadA.body.search_after = [nextToken];
                        resultNext = await client.search(payloadA);
                    }
                    console.log('searchRestaurantsResolver resultNext---------', JSON.stringify(resultNext.body.hits.hits.length));
                    if(!resultNext.body.hits.hits || resultNext.body.hits.hits.length === 0) {
                        nextToken = null;
                    }
                }
            }
        }

        console.log('searchRestaurantsResolver items--------->>', items);

        response = {
            statusCode: 200,
            items,
            nextToken,
            total: items.length
        };

    } catch (error) {
        response = {
            statusCode: 400,
            errorMessage : "Somthing went wrong"
        };      
    }
    return response;
};
