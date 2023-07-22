/* Amplify Params - DO NOT EDIT
	API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_ARN
	API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_NAME
	API_CATERGRAM3_GRAPHQLAPIENDPOINTOUTPUT
	API_CATERGRAM3_GRAPHQLAPIIDOUTPUT
	API_CATERGRAM3_GRAPHQLAPIKEYOUTPUT
	API_CATERGRAM3_USERPROFILETABLE_ARN
	API_CATERGRAM3_USERPROFILETABLE_NAME
	ENV
	REGION
Amplify Params - DO NOT EDIT *//* Amplify Params - DO NOT EDIT
	
Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB({apiVersion: "2012-08-10"});
const { Client, Connection } = require("@opensearch-project/opensearch");
const { defaultProvider } = require("@aws-sdk/credential-provider-node");
const aws4 = require("aws4");
const _ = require("lodash");
const CryptoJS = require("crypto-js");
const host = process.env.ES_ENDPOINT;
const region = process.env.REGION;
const secretKey = 'secret key 123';

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
    return new Client({
        ...createAwsConnector(credentials, region),
        node: host,
    });
}

exports.handler = async (event) => {
  let response;

  try {
    
    const {
      userId, 
      location,
      m, // miles
      delivery, 
      cuisine, 
      priceLow, 
      priceHigh,
      diets,
      limit,
      nextToken,
      moods
    } = event.arguments;
    
    // const scoreLoad = JSON.parse(payload);
    
    const { lat, lon } = location;
    const radius = m;
    // let moods = [];
    let sortMoods = [];
    sortMoods = _.orderBy(moods, ['value'],['desc']);


    // var params = {
    //     FilterExpression: 'userID = :userID',
    //     ExpressionAttributeValues: {
    //         ':userID': {'S': userId},
    //     },
    //     TableName: process.env.API_CATERGRAM3_FRIENDSHIPCONNECTIONTABLE_NAME
    // };
    
    // let dynamoResult;
    // if(userId) {
    //     dynamoResult = await dynamodb.scan(params).promise();
    // }  
      
    // let friendsRed = [];

    // if(userId && dynamoResult.Items.length > 0) {
    //     dynamoResult.Items.forEach((frnd) => {
    //         friendsRed.push(frnd.userID.S);
    //     })
    // }

    // let scoreLoad = {
    //     likedByMe: 0.50,
    //     dislikedByMe: 0.01,
    //     mealScore: 1,
    //     selectedMealType: 'Dynamic',
    //     shareNumber: 1,
    //     shareScore: 1,
    //     likedByFriends: 1,
    //     dislikedByFriends: 1,
    // }
    
    // let myLikedBeforeScore = scoreLoad.likedByMe;
    // let myDislikedBeforeScore = scoreLoad.dislikedByMe;
    
    // let mealScore = scoreLoad.mealScore ? scoreLoad.mealScore : 1;
    // let mealName = scoreLoad.selectedMealType ? scoreLoad.selectedMealType : '';
    
    // let shareNumber = scoreLoad.shareNumber ? Number(scoreLoad.shareNumber) : 1;
    // let shareScore = scoreLoad.shareScore ? Number(scoreLoad.shareScore) : 1;
    
    const client = await getClient();

    // if(userProfileDetails.data.userProfileByUid.items[0].moods.items)
    // {
    //     moods = userProfileDetails.data.userProfileByUid.items[0].moods.items; 
    //     sortMoods = _.orderBy(moods, ['value'],['desc']);
    // }

    // console.log("userProfileDetails sortMoods details -------->>",sortMoods);


    // const queryBody = {
    //     "query": {
    //         "function_score": {
    //             // "boost": "3",
    //             "score_mode": "max",
    //             "query": {
    //                 "bool": {
    //                     "must": [
    //                         cuisineFilter(cuisine)
    //                     ],
    //                     "must_not": [
    //                       {
    //                         "match": {
    //                           "id": filterVisitedNodes(nextToken)
    //                         }
    //                       }
    //                     ],
    //                     "filter": [
    //                         locationFilter(lat, lon, radius),
    //                         deliveryFilter(delivery),
    //                         priceFilter(priceLow, priceHigh),
    //                         dietsFilter(diets)
    //                     ],
    //                     ...applyMoodFilter(sortMoods)
    //                 }
    //             },
    //             "functions": [
    //                 {
    //                     "random_score": {}
    //                 },
    //                 {
    //                     "filter": {
    //                         "match": {
    //                             "dislike": userId
    //                         }
    //                     },
    //                     "weight": myLikedBeforeScore
    //                 },
    //                 {
    //                     "filter": {
    //                         "match": {
    //                             "like": userId
    //                         }
    //                     },
    //                     "weight": myDislikedBeforeScore
    //                 },
    //                 {
    //                     "filter": {
    //                         "match": {
    //                             "mealType": mealName
    //                         }
    //                     },
    //                     "weight": mealScore
    //                 },
                    
    //                 ...applyFriendsFilter(friendsRed, scoreLoad.likedByFriends),
    //                 ...applyFriendsDislikeFilter(friendsRed, scoreLoad.dislikedByFriends),
    //                 locationFilterScore(lat, lon, radius, scoreLoad.distanceWeight),
    //                 {
    //                     "filter": {
    //                         "range": {
    //                             "totalShares": {
    //                                 "gte": shareNumber,
    //                                 "lte": 9999
    //                             }
    //                         }
    //                     },
    //                     "weight": shareScore
    //                 },
    //             ]
    //         }
    //     },
    //     "sort": [
    //       {
    //         "_score": {
    //             "order": "desc"
    //         }
    //         },
    //         {
    //             "_geo_distance": {
    //                 "location": {
    //                     lat: lat,
    //                     lon: lon
    //                 },
    //                 "order": "asc",
    //                 "unit": "miles",
    //                 "distance_type": "arc"
    //             }
    //         }
    //     ]
    // };

    // if(nextToken) {
    //     queryBody.search_after = getSearchAfterValue(nextToken)
    // }
    // console.log(JSON.stringify(queryBody))

    // const result = await client.search({
    //     index: 'cardpoint',
    //     explain: true,
    //     size: limit ? limit : 20,
    //     body: queryBody
    // });
    let params = null;

    if(nextToken){
      // Decrypt
      const bytes  = CryptoJS.AES.decrypt(nextToken, secretKey);
      params = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    } else {
      // GET USER MODE ID CODE WILL BE HERE
      let payload = {
        index: 'usermood',
        body: {
          query: {
            "match_phrase": {
              "userProfileMoodsId": userId
            }
          }
        }
      };
      const userMoodsResult = await client.search(payload);
      let boostModeValue = []; 
      userMoodsResult.body.hits.hits?.map((result) => {
          if(result._source.moodUserMoodsId){
            boostModeValue.push(`(${result._source.moodUserMoodsId})^${result._source.value*20}`)
          }
      })
      
      const joinedMoodBoostvalue = boostModeValue.join(' OR ');
      
      // params = {
      //   "src": {
      //   },
      //   "user": userId,
      //   "dist": `${radius}miles`,
      //   "lat": lat,
      //   "lon": lon,
      //   "from": 0,
      //   "size": limit || 20,
      //   "moodids": joinedMoodBoostvalue
      // };

      params = {
          "src": {
          },
          "user": userId,
          "dist": `${radius}miles`,
          "lat": lat,
          "lon": lon,
          "from": 0,
          "size": limit || 20,
          "mood_ids": joinedMoodBoostvalue,
          "seed": 9,
          "category_filters": {
            "bool": {
              "must": []
            }
          }
        };
    }

    if(delivery)
    {
      params.category_filters.bool.must.push({
        "terms": {
          "delivery.keyword": [delivery]
        }
      })
    }

    if(cuisine)
    {
      params.category_filters.bool.must.push({
        "terms": {
          "cuisine.keyword": [cuisine]
        }
      })
    }
    
    if(diets)
    {
      params.category_filters.bool.must.push({
        "terms": {
          "diets.keyword": [diets]
        }
      })
    }

    if(priceLow || priceHigh)
    {
      params.category_filters.bool.must.push({
        "range": {
          "price": {
            "gte": priceLow || 0,
            "lte": priceHigh || 20
          }
        }
      })
    }

    const result = await client.searchTemplate({
        index: 'cardpoint',
        body: {
          id: "cardpoint_search_algorithm",
          params:params
        },
    });
    
    console.log("--->>result",JSON.stringify(result))
    result.body.hits.hits?.map((result) => {
        console.log("--->>> score",result._score,"--->> cardPointMoodId",result._source.cardPointMoodId)
    })

    const items = [];
    const relevance = {};
    // let batch = [];

    result.body.hits.hits.forEach((o) => {
      items.push({
        id: o._id,
       ...o._source
      });
      // batch.push(o._id);
      relevance[o._id] = {score: o._score, explanation: o._explanation}
    });
    console.log("relevance data ----->> ",relevance)

    let nextNextToken = null;
    
    if(items.length >= params.size){
      params.from += params.size 
      nextNextToken = JSON.stringify(params)
    }
    
    nextNextToken = CryptoJS.AES.encrypt(nextNextToken, secretKey).toString();

     response = {
      items:items || [],
      total: items.length,
      nextToken: nextNextToken,
      info: JSON.stringify(relevance),
    };  
  } catch (error) {
    console.log({error})
    console.log({"------>>> ":error?.headers})
    response = {
      items :[],  
      total: 0,
      info: JSON.stringify("Error"),
    };
  }
  return response;
};

function applyMoodFilter(moods){
  /*TODO: this function is used for filter the nearby card based on moods value and 
      boost the filterd record based on the boost value so those record displayed on the top of nearby card list.
      Function is take the parameter like moods = [{"id":"5f9f7a16-f5d8-4082-bc51-52c8991eeff0","value":12},
        {"id":"29818ba1-0c6f-4937-9797-43ec93da71fb","value":8}]
  */

  if(moods.length > 0) {
    const query = {         
        "should" : moods.map((mood, index) => {
          return  {
            "match" : {
              "cardPointMoodId": {
                "query": mood.id,
                "boost": (mood.value * 20) - index
              },
           }
          }
        }),        
      }

    query.should.push({
      match_all:{}
    })

    return query;
    } else {
      return  {}
    }
}

function getSearchAfterValue(token) {
    return [ token.split("\|")[0], token.split("\|")[1] ]
}

function applyFriendsDislikeFilter(friendsRed, score) {
  /*TODO: This function is used for filter the near by card based on the friend dislike cards and add the weight based on the score 
    Weight is given between 10 (most relevant) to 1 (least relevant).
  */
  if(friendsRed.length > 0 && score) {
    score = score * 0.01;
    let total = [];
    friendsRed.forEach(ff => {
      total.push({
        "filter": {
          "match": {
            "dislike": ff.toString()
          }
        },
        "weight": score 
      })
    })
    return total;
  } else {
    return [{
      "filter": {
        "match": {
          "dislike": ""
        }
      },
      "weight": 0.00001
    }];
  }
}

function applyFriendsFilter(friendsRed, score) {
   /*TODO: This function is used for filter the near by card based on the friend like cards and add the weight based on the score 
    Weight is given between 10 (most relevant) to 1 (least relevant).
  */
  if(friendsRed.length > 0 && score) {
    let total = [];
    friendsRed.forEach(ff => {
      total.push({
        "filter": {
          "match": {
            "like": ff.toString()
          }
        },
        "weight": score
      })
    })
    return total;
  } else {
    return [{
      "filter": {
        "match": {
          "like": ""
        }
      },
      "weight": 0.00001
    }];
  }
}

function dietsFilter(diets) {
  /*TODO: this function is used for filter the card based on the diets value like Vegetarian, Keto, Vegan, Gluten, Kosher, Pescatarian etc.
      Function is take only the single string value.
  */
  if(!diets) {
    return {
      "match_all": {}
    }
  }
  return {
    "match": {
      "diets": diets
    }
  };
}

function priceFilter(priceLow, priceHigh) {
  /*TODO: this function is used for filter the near by card based on the price value.
  Function are take the lowest price and highest price value and the default lowest price value is 0 and highest price value is 999. */
  
  return {
    "range": {
      "price": {
        "gte": priceLow ? priceLow : 0,
        "lte": priceHigh ? priceHigh : 999
      }
    }
  };
}

function deliveryFilter(delivery) {
   /*TODO: This function is used for filter the nearby card based on the delivery option like Uber Eats, Doordash, Grubhub, Postmates, Goldbelly etc.
     This function take a string value. so at a time filter by only single delivery option. 
    */

  if(!delivery) {
    return {
      "match_all": {}
    }
  }
  return {
    "match": {
      "delivery": delivery
    }
  };
}

function cuisineFilter(cuisine) {
  /*TODO: This function used for filter the nearby card based on the cuisine like Japanese, Chinese, Mexican, French, American etc.
   This function take a string value. so at a time filter by only single cuisine.
  */

    if(!cuisine) {
        return {
          "match_all": {}
        };
    }
    return {
        "match": {
            "cuisine": "French"
        }
    };
}

function locationFilter(lat, lon, radius) {
  /*TODO: This function is used for filter the nearby card based on the geo distance and location.
        Funtion are take the input of latitude, longitude and radius(miles).
        if the radius not pass in parameter then it will take default 100 radius(miles).
  */
  
    let rad = 100;
    if(radius) {
      rad = radius;
    }
    return {
        "geo_distance": {
            "distance": rad + "miles",
            "distance_type": "arc",
            "location": {
                "lat": lat,
                "lon": lon
            }
        }
    };
}

function locationFilterScore(lat, lon, radius, score) {
   /*TODO: This function is used for filter the nearby card based on the geo distance and location.
        Funtion are take the input of latitude, longitude and radius(miles) and score.
        Based on score value set weight to 
        if the radius not pass in parameter then it will take default 100 radius(miles).
  */
    let rad = 100;
    if(radius) {
      rad = radius;
    }
    return {
      "filter": {
        "geo_distance": {
            "distance": rad + "miles",
            "distance_type": "arc",
            "location": {
                "lat": lat,
                "lon": lon
            }
        }
      },
      "weight": score ? score : 1
    }
}

function filterVisitedNodes(token) {
  if(!token) {
    return ""
  }
  return token.split("\|")[2];
}

const getUserProfileByUid = /* GraphQL */ `
  query UserProfileByUid(
    $uid: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
      userProfileByUid(
        uid: $uid
        sortDirection: $sortDirection
        filter: $filter
        limit: $limit
        nextToken: $nextToken
      ) {
        items {
          id
          uid          
          moods {
            items {
              id
              value
              mood {
                id
                name
                backgroundColor
                createdAt
                updatedAt
              }
              user {
                id
                uid
                email
                lat
                lon
                cuisine
                delivery
                city
                address
                zip
                nickname
                points
                firstname
                lastname
                appliedBenchmark
                newuser
                phoneNumber
                iosDeviceId
                lastLogin
                restaurantContact
                createdAt
                updatedAt
                owner
              }
              createdAt
              updatedAt
              moodUserMoodsId
              userProfileMoodsId
              owner
            }
            nextToken
          }
          createdAt
          updatedAt
          owner
        }
        nextToken
      }
  }
`;