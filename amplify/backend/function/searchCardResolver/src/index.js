/* Amplify Params - DO NOT EDIT
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
    console.log("searchCardResolver event ====>>>",JSON.stringify(event));
    console.log("searchCardResolver arguments ====>>>",JSON.stringify(event.arguments));
    
    const client = await getClient();

    const name = event.arguments.name;
    const nextScore = event.arguments.nextToken;
    const limit = event.arguments.limit;
    let isWildcard = false;
    
    let payloadA = {
        index: 'cardpoint',
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
            }
          },
          sort: [
                {
                    "updatedAt": {
                        "order": "desc"    
                    }
                }
            ]
        }
    };
    let payload = {
        index: 'cardpoint',
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
          },
          sort: [
            {
                "updatedAt": {
                    "order": "desc"    
                }
            }
        ]
        }
    };

    console.log("searchCardResolver payloadA ====>>>",payloadA);
    console.log("searchCardResolver payload ====>>>",payload);


    if(nextScore) {
        payloadA.body.search_after = [nextScore];
    }
    
    if(limit) {
        payloadA.body.size = limit;
    }
    
    let result = await client.search(payloadA);
    
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
    
    console.log('searchCardResolver result ------>>>>>', JSON.stringify(result));
    let nextToken = null;
    
    if(result.body.hits.hits) {
        result.body.hits.hits.forEach(i => {
            const { 
                id, 
                name, 
                location, 
                price, 
                zip, 
                city, 
                orderOptionUrls, 
                cardPointFile,
                diets,
                restaurantID,
                cardPointMoodId,
                description,
                menus,
                cuisine,
                delivery
                
            } = i._source;
            items.push({
                id, 
                name, 
                location, 
                price, 
                zip, 
                city, 
                orderOptionUrls, 
                cardPointFile,
                diets,
                restaurantID,
                cardPointMoodId,
                description,
                cuisine,
                menus,
                delivery
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
                console.log('searchCardResolver -----<<>>>------', JSON.stringify(resultNext.body.hits.hits.length));
                if(!resultNext.body.hits.hits || resultNext.body.hits.hits.length === 0) {
                    nextToken = null;
                }
            }
        }
    }
    
    console.log('searchCardResolver items ---------', items);

    const response = {
        statusCode: 200,
        items: items,
        nextToken,
        total: items.length
    };
    return response;
};
