
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
    console.log("findUsersFn event ====>>>", JSON.stringify(event))
    console.log("findUsersFn arguments ====>>>", JSON.stringify(event.arguments))
    let response;
    try {          
        const client = await getClient();

        const name = event.arguments.name;
        const userId = event.arguments.userId;
        const nextScore = event.arguments.nextToken;
        const limit = event.arguments.limit;
        let isWildcard = false;

        let payloadA = {
            index: 'userprofile',
            body: {
            query: {
                bool: {
                    must: [
                        {
                            multi_match: {
                                query: name, 
                            query: name, 
                                query: name, 
                                fields: [ "firstname", "lastname", "email" ]
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
            index: 'userprofile',
            body: {
            query: {
                bool: {
                    should: [
                        {
                        wildcard: {
                            firstname: {
                            value: `*${name}*`
                            }
                        }
                        },
                        {
                        wildcard: {
                            lastname: {
                                value: `*${name}*`
                            }
                        }
                        },
                        {
                        wildcard: {
                            email: {
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
        
        if(nextScore) {
            payloadA.body.search_after = [nextScore];
        }
        if(limit) {
            payloadA.body.size = limit;
        }
        
        let result = await client.search(payloadA);
    
        console.log('findUsersFn result --->>>>', JSON.stringify(result.body.hits.hits));
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
                if(i._id !== userId) {
                    items.push({
                        ...i._source
                    });
                }
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
                    console.log('-----<<>>>------', JSON.stringify(resultNext.body.hits.hits.length));
                    if(!resultNext.body.hits.hits || resultNext.body.hits.hits.length === 0) {
                        nextToken = null;
                    }
                }
            }
        }

     response = {
            statusCode: 200,
            items,
            nextToken,
            total: items.length
        };
    }
    catch (error) {
        console.log({error})
        response = {
            statusCode: 400,
            body: JSON.stringify('error'),
            total: 0
        };
    }
    return response;
};
