/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag';

export const nearbyCardsOld = /* GraphQL */ `
  query NearbyCardsOld(
    $location: LocationInput!
    $m: Int
    $limit: Int
    $nextToken: String
    $delivery: String
    $cuisine: String
    $dislike: String
    $priceLow: Float
    $priceHigh: Float
    $diets: String
    $skipLocation: String
    $userId: String
    $frindsRef: [String]
  ) {
    nearbyCardsOld(
      location: $location
      m: $m
      limit: $limit
      nextToken: $nextToken
      delivery: $delivery
      cuisine: $cuisine
      dislike: $dislike
      priceLow: $priceLow
      priceHigh: $priceHigh
      diets: $diets
      skipLocation: $skipLocation
      userId: $userId
      frindsRef: $frindsRef
    ) {
      items {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      total
      nextToken
    }
  }
`;
export const nearbyCards = /* GraphQL */ `
  query NearbyCards(
    $location: LocationInput!
    $m: Int
    $limit: Int
    $nextToken: String
    $delivery: String
    $cuisine: String
    $dislike: String
    $priceLow: Float
    $priceHigh: Float
    $diets: String
    $skipLocation: String
    $userId: String
    $restaurants: String
    $payload: String
  ) {
    nearbyCards(
      location: $location
      m: $m
      limit: $limit
      nextToken: $nextToken
      delivery: $delivery
      cuisine: $cuisine
      dislike: $dislike
      priceLow: $priceLow
      priceHigh: $priceHigh
      diets: $diets
      skipLocation: $skipLocation
      userId: $userId
      restaurants: $restaurants
      payload: $payload
    ) {
      items {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      total
      nextToken
    }
  }
`;
export const nearByUsers = /* GraphQL */ `
  query NearByUsers(
    $location: LocationInput!
    $m: Int
    $limit: Int
    $nextToken: String
  ) {
    nearByUsers(
      location: $location
      m: $m
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const getAverageRating = /* GraphQL */ `
  query GetAverageRating($cardId: String) {
    getAverageRating(cardId: $cardId) {
      average
      total
    }
  }
`;
export const getAverageMood = /* GraphQL */ `
  query GetAverageMood($userId: String!) {
    getAverageMood(userId: $userId) {
      average
      total
      name
    }
  }
`;
export const searchCard = /* GraphQL */ `
  query SearchCard($name: String!, $limit: Int, $nextToken: String) {
    searchCard(name: $name, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      total
      nextToken
    }
  }
`;

// PURPOSE : Search the restaurants by name.
export const searchRestaurantByName = /* GraphQL */ `
  query SearchRestaurantByName(
    $name: String!
    $limit: Int
    $nextToken: String
  ) {
    searchRestaurantByName(name: $name, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        city
        zip
        description
        lat
        lng
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
        owner
      }
      nextToken
      total
    }
  }
`;
export const findUsers = /* GraphQL */ `
  query FindUsers(
    $userId: ID!
    $name: String!
    $limit: Int
    $nextToken: String
  ) {
    findUsers(
      userId: $userId
      name: $name
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
      nextToken
    }
  }
`;
export const nearByRestaurants = /* GraphQL */ `
  query NearByRestaurants(
    $location: LocationInput!
    $m: Int
    $limit: Int
    $nextToken: String
  ) {
    nearByRestaurants(
      location: $location
      m: $m
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        address
        city
        zip
        description
        lat
        lng
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
        owner
      }
      nextToken
      total
    }
  }
`;
export const queryUserInLookup = /* GraphQL */ `
  query QueryUserInLookup($email: String, $phoneNumber: String) {
    queryUserInLookup(email: $email, phoneNumber: $phoneNumber) {
      firstName
      lastName
      isConfirmed
      email
      phoneNumber
    }
  }
`;
export const getUserInvite = /* GraphQL */ `
  query GetUserInvite($id: ID!) {
    getUserInvite(id: $id) {
      id
      phone
      email
      shareId
      createdAt
      updatedAt
    }
  }
`;
export const listUserInvites = /* GraphQL */ `
  query ListUserInvites(
    $filter: ModelUserInviteFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInvites(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        phone
        email
        shareId
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const searchUserInvites = /* GraphQL */ `
  query SearchUserInvites(
    $filter: SearchableUserInviteFilterInput
    $sort: [SearchableUserInviteSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserInviteAggregationInput]
  ) {
    searchUserInvites(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        phone
        email
        shareId
        createdAt
        updatedAt
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getContent = /* GraphQL */ `
  query GetContent($id: ID!) {
    getContent(id: $id) {
      id
      privacy
      help
      about
      terms
      friendReqTitle
      friendReqMsg
      shareCardTitle
      shareCardMsg
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listContents = /* GraphQL */ `
  query ListContents(
    $filter: ModelContentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listContents(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        privacy
        help
        about
        terms
        friendReqTitle
        friendReqMsg
        shareCardTitle
        shareCardMsg
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;

// PURPOSE : Get the unapproved restaurant by Id.
export const getRestaurantUnapproved = /* GraphQL */ gql`
  query GetRestaurantUnapproved($id: ID!) {
    getRestaurantUnapproved(id: $id) {
      id
      name
      address
      city
      cityNameSlug
      zip
      file {
        bucket
        region
        key
      }
      description
      location {
        lat
        lon
      }
      cuisine
      delivery
      orderOptionUrls {
        name
        url
        fontColor
        backgroundColor
        file {
          bucket
          region
          key
        }
      }
      menus {
        id
        name
        description
      }
      createdAt
      contact
      averagePrice
      updatedAt
    }
  }
`;

// PURPOSE : Get the list of unapproved restaurants.
export const listRestaurantUnapproveds = /* GraphQL */ `
  query ListRestaurantUnapproveds(
    $filter: ModelRestaurantUnapprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurantUnapproveds(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        address
        city
        zip
        description
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
      }
      nextToken
    }
  }
`;
export const getPendingRestaurantContact = /* GraphQL */ `
  query GetPendingRestaurantContact(
    $contact: String!
    $sortDirection: ModelSortDirection
    $filter: ModelRestaurantUnapprovedFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getPendingRestaurantContact(
      contact: $contact
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        address
        city
        zip
        description
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
      }
      nextToken
    }
  }
`;

// PURPOSE : Get the restaurant by id.
export const getRestaurant = /* GraphQL */ gql`
  query GetRestaurant($id: ID!) {
    getRestaurant(id: $id) {
      id
      name
      address
      city
      zip
      file {
        bucket
        region
        key
      }
      bulkImages {
        bucket
        region
        key
      }
      description
      location {
        lat
        lon
      }
      lat
      lng
      cuisine
      delivery
      orderOptionUrls {
        name
        url
        fontColor
        backgroundColor
      }
      menus {
        id
        name
        description
      }
      createdAt
      contact
      averagePrice
      cards {
        count
        scannedCount
        nextToken
      }
      shares {
        nextToken
      }
      updatedAt
      owner
      restaurantUrl
      cityNameSlug
    }
  }
`;
export const listRestaurants = /* GraphQL */ gql`
  query listRestaurants(
    $filter: ModelRestaurantFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurants(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        address
        city
        zip
        description
        lat
        lng
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
        owner
        file {
          bucket
          region
          key
        }
      }
      nextToken
      total
    }
  }
`;
export const searchRestaurants = /* GraphQL */ gql`
  query SearchRestaurants(
    $filter: SearchableRestaurantFilterInput
    $sort: [SearchableRestaurantSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRestaurantAggregationInput]
  ) {
    searchRestaurants(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        address
        city
        zip
        description
        lat
        lng
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
        owner
        cityNameSlug
        restaurantUrl
        menus {
          id
          name
          description
        }
        location {
          lat
          lon
        }
        file {
          bucket
          region
          key
        }
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getRestaurantMenu = /* GraphQL */ `
  query GetRestaurantMenu($id: ID!) {
    getRestaurantMenu(id: $id) {
      id
      name
      description
      shares {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listRestaurantMenus = /* GraphQL */ `
  query ListRestaurantMenus(
    $filter: ModelRestaurantMenuFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRestaurantMenus(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getCuisine = /* GraphQL */ `
  query GetCuisine($id: ID!) {
    getCuisine(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listCuisines = /* GraphQL */ gql`
  query ListCuisines(
    $filter: ModelCuisineFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCuisines(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDelivery = /* GraphQL */ `
  query GetDelivery($id: ID!) {
    getDelivery(id: $id) {
      id
      name
      file {
        bucket
        region
        key
      }
      fontColor
      backgroundColor
      createdAt
      updatedAt
    }
  }
`;
export const listDeliveries = /* GraphQL */ gql`
  query ListDeliveries(
    $filter: ModelDeliveryFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDeliveries(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        fontColor
        backgroundColor
        createdAt
        updatedAt
        file{
          bucket
          key
          region
        }
      }
      nextToken
    }
  }
`;
export const getMood = /* GraphQL */ `
  query GetMood($id: ID!) {
    getMood(id: $id) {
      id
      name
      file {
        bucket
        region
        key
      }
      backgroundColor
      userMoods {
        nextToken
      }
      createdAt
      updatedAt
    }
  }
`;
export const listMoods = /* GraphQL */ gql`
  query ListMoods(
    $filter: ModelMoodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        backgroundColor
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getDiet = /* GraphQL */ `
  query GetDiet($id: ID!) {
    getDiet(id: $id) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const listDiets = /* GraphQL */ gql`
  query ListDiets(
    $filter: ModelDietFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listDiets(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getNotification = /* GraphQL */ `
  query GetNotification($id: ID!) {
    getNotification(id: $id) {
      id
      type
      createdAt
      userId
      belongsTo {
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
      updatedAt
      userProfileNotificationsId
      owner
    }
  }
`;
export const listNotifications = /* GraphQL */ `
  query ListNotifications(
    $filter: ModelNotificationFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listNotifications(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        type
        createdAt
        userId
        updatedAt
        userProfileNotificationsId
        owner
      }
      nextToken
    }
  }
`;
export const getUserProfile = /* GraphQL */ `
  query GetUserProfile($id: ID!) {
    getUserProfile(id: $id) {
      id
      uid
      detail {
        id
        email
        nickname
        address
        city
        zip
      }
      email
      lat
      lon
      cuisine
      delivery
      city
      address
      zip
      file {
        bucket
        region
        key
      }
      nickname
      points
      firstname
      lastname
      appliedBenchmark
      newuser
      phoneNumber
      contacts {
        firstname
        lastname
        phoneNumber
        email
      }
      iosDeviceId
      loc {
        lat
        lon
      }
      ratings {
        nextToken
      }
      lastLogin
      location {
        lat
        lon
      }
      restaurantContact
      interactions {
        nextToken
        scannedCount
      }
      moods {
        nextToken
      }
      rewards {
        nextToken
      }
      notifications {
        nextToken
      }
      reactions {
        nextToken
      }
      achievements {
        nextToken
      }
      textComments {
        nextToken
      }
      friends {
        nextToken
      }
      friendRequests {
        nextToken
      }
      sentFriendRequests {
        nextToken
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listUserProfiles = /* GraphQL */ `
  query ListUserProfiles(
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserProfiles(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
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
      nextToken
    }
  }
`;
export const userProfileByUid = /* GraphQL */ `
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
      nextToken
    }
  }
`;
export const getUserByEmail = /* GraphQL */gql `
  query GetUserByEmail(
    $email: String!
    $sortDirection: ModelSortDirection
    $filter: ModelUserProfileFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getUserByEmail(
      email: $email
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
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
        restaurantOwner{
          items{
            createdAt
            id
            restaurantID
            userID
            uploadedCards
            uploadedBulkImages
            userProfile {
              email
              firstname
              lastname
            }
          }
        }
        photographer{
          items {
            id
            createdAt
            restaurantID
            userID
            photographedRestaurants
            uploadedBulkImages
            cities
            userProfile {
              email
              firstname
              lastname
            }
            restaurant{
              id
            }
          }
        }
        customerServiceRep{
          items {
            id
            createdAt
            restaurantID
            userID
            approvedRestaurants
            uploadedCards
            approvedCards
            uploadedBulkImages
            userProfile {
              email
              firstname
              lastname
            }
            restaurant{
              id
            }
          }
        }
      }
      nextToken
    }
  }
`;
export const searchUserProfiles = /* GraphQL */ `
  query SearchUserProfiles(
    $filter: SearchableUserProfileFilterInput
    $sort: [SearchableUserProfileSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserProfileAggregationInput]
  ) {
    searchUserProfiles(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
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
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getFriendshipConnection = /* GraphQL */ `
  query GetFriendshipConnection($id: ID!) {
    getFriendshipConnection(id: $id) {
      id
      userID
      friendUserReferenceID
      userReference {
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
      owner
    }
  }
`;
export const listFriendshipConnections = /* GraphQL */ `
  query ListFriendshipConnections(
    $filter: ModelFriendshipConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendshipConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        userID
        friendUserReferenceID
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchFriendshipConnections = /* GraphQL */ `
  query SearchFriendshipConnections(
    $filter: SearchableFriendshipConnectionFilterInput
    $sort: [SearchableFriendshipConnectionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableFriendshipConnectionAggregationInput]
  ) {
    searchFriendshipConnections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        userID
        friendUserReferenceID
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getFriendRequestsConnection = /* GraphQL */ `
  query GetFriendRequestsConnection($id: ID!) {
    getFriendRequestsConnection(id: $id) {
      id
      usera
      userb
      friendRequestToUserID
      friendRequestFromUserID
      sentByUserInfo {
        uid
        email
        nickname
        firstname
        lastname
      }
      status
      fromUser {
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
      owner
    }
  }
`;
export const listFriendRequestsConnections = /* GraphQL */ `
  query ListFriendRequestsConnections(
    $filter: ModelFriendRequestsConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listFriendRequestsConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        usera
        userb
        friendRequestToUserID
        friendRequestFromUserID
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchFriendRequestsConnections = /* GraphQL */ `
  query SearchFriendRequestsConnections(
    $filter: SearchableFriendRequestsConnectionFilterInput
    $sort: [SearchableFriendRequestsConnectionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableFriendRequestsConnectionAggregationInput]
  ) {
    searchFriendRequestsConnections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        usera
        userb
        friendRequestToUserID
        friendRequestFromUserID
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getSentFriendRequestsConnection = /* GraphQL */ `
  query GetSentFriendRequestsConnection($id: ID!) {
    getSentFriendRequestsConnection(id: $id) {
      id
      usera
      userb
      friendRequestFromUserID
      friendRequestToUserID
      status
      toUser {
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
      owner
    }
  }
`;
export const listSentFriendRequestsConnections = /* GraphQL */ `
  query ListSentFriendRequestsConnections(
    $filter: ModelSentFriendRequestsConnectionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listSentFriendRequestsConnections(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        usera
        userb
        friendRequestFromUserID
        friendRequestToUserID
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const searchSentFriendRequestsConnections = /* GraphQL */ `
  query SearchSentFriendRequestsConnections(
    $filter: SearchableSentFriendRequestsConnectionFilterInput
    $sort: [SearchableSentFriendRequestsConnectionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableSentFriendRequestsConnectionAggregationInput]
  ) {
    searchSentFriendRequestsConnections(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        usera
        userb
        friendRequestFromUserID
        friendRequestToUserID
        status
        createdAt
        updatedAt
        owner
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getAchievements = /* GraphQL */ `
  query GetAchievements($id: ID!) {
    getAchievements(id: $id) {
      id
      isClaimed
      file {
        bucket
        region
        key
      }
      value
      reward {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
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
      userProfileAchievementsId
      cardPointUserRewardsId
      owner
    }
  }
`;
export const listAchievements = /* GraphQL */ `
  query ListAchievements(
    $filter: ModelAchievementsFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listAchievements(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        isClaimed
        value
        createdAt
        updatedAt
        userProfileAchievementsId
        cardPointUserRewardsId
        owner
      }
      nextToken
    }
  }
`;
export const getBenchmark = /* GraphQL */ `
  query GetBenchmark($id: ID!) {
    getBenchmark(id: $id) {
      id
      pointFactor
      name
      file {
        bucket
        region
        key
      }
      rewardValue
      title
      price
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listBenchmarks = /* GraphQL */ `
  query ListBenchmarks(
    $filter: ModelBenchmarkFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listBenchmarks(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        pointFactor
        name
        rewardValue
        title
        price
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getRewardButton = /* GraphQL */ `
  query GetRewardButton($id: ID!) {
    getRewardButton(id: $id) {
      id
      title
      fontColor
      backgroundColor
      picture {
        bucket
        region
        key
      }
      createdAt
      updatedAt
    }
  }
`;
export const listRewardButtons = /* GraphQL */ `
  query ListRewardButtons(
    $filter: ModelRewardButtonFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRewardButtons(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        fontColor
        backgroundColor
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getUnapprovedItem = /* GraphQL */ `
  query GetUnapprovedItem($id: ID!) {
    getUnapprovedItem(id: $id) {
      id
      name
      description
      restaurantID
      cuisine
      diets
      delivery
      isApproved
      picture {
        bucket
        region
        key
      }
      price
      orderOptionUrls {
        name
        url
        fontColor
        backgroundColor
      }
      mood {
        id
        name
        backgroundColor
        createdAt
        updatedAt
      }
      menus {
        id
        name
        description
      }
      createdAt
      updatedAt
      unapprovedItemMoodId
    }
  }
`;

// PURPOSE : Get the list of unapproved items.
export const listUnapprovedItems = /* GraphQL */ `
  query ListUnapprovedItems(
    $filter: ModelUnapprovedItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUnapprovedItems(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        restaurantID
        cuisine
        diets
        delivery
        isApproved
        price
        createdAt
        updatedAt
        unapprovedItemMoodId
      }
      nextToken
    }
  }
`;

// PURPOSE : Get the items using restaurant id.
export const getItemsByResturantId = /* GraphQL */ gql`
  query GetItemsByResturantId(
    $restaurantID: String!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUnapprovedItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getItemsByResturantId(
      restaurantID: $restaurantID
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        restaurantID
        cuisine
        diets
        delivery
        picture{
          bucket
          region
          key
        }
        isApproved
        price
        createdAt
        updatedAt
        unapprovedItemMoodId
      }
      nextToken
    }
  }
`;

export const getItemsStatusByResturantId = /* GraphQL */ gql`
  query GetItemsByResturantId(
    $restaurantID: String!
    $name: ModelStringKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelUnapprovedItemFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getItemsByResturantId(
      restaurantID: $restaurantID
      name: $name
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        isApproved
        description
        restaurantID
        cuisine
        diets
        delivery
      }
      nextToken
    }
  }
`;
export const getCardsByRestaurantId = /* GraphQL */ gql`
  query GetCardsByRestaurant($id: ID!) {
    getRestaurant(id: $id) {
        address
        city
        cards {
            count
            items {
                cardPointFile {
                    bucket
                    key
                    region
                }
                city
                createdAt
                cuisine
                delivery
                description
                diets
                id
                like
                menus {
                    name
                }
                name
                price
                restaurantID
                cardPointMoodId
                orderOptionUrls {
                    backgroundColor
                    fontColor
                    name
                    url
                    file {
                        bucket
                        key
                        region
                    }
                }
                mood {
                    backgroundColor
                    id
                    name
                    updatedAt
                    createdAt
                    file {
                        bucket
                        key
                        region
                    }
                }
                zip,
            }
            scannedCount
            nextToken,

        }
        createdAt
        location {
            lat
            lon
        }
        menus {
            name
        }
        name
        zip
        updatedAt
        delivery
        cuisine
        description
        file {
            bucket
            key
            region
        }
        id
        orderOptionUrls {
            backgroundColor
            file {
                bucket
                key
                region
            }
            fontColor
            name
            url
        },

    }
  }
`;
export const searchUnapprovedItems = /* GraphQL */ `
  query SearchUnapprovedItems(
    $filter: SearchableUnapprovedItemFilterInput
    $sort: [SearchableUnapprovedItemSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUnapprovedItemAggregationInput]
  ) {
    searchUnapprovedItems(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        description
        restaurantID
        cuisine
        diets
        delivery
        isApproved
        price
        createdAt
        updatedAt
        unapprovedItemMoodId
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getCardPoint = /* GraphQL */ `
  query GetCardPoint($id: ID!) {
    getCardPoint(id: $id) {
      id
      name
      description
      location {
        lat
        lon
      }
      price
      delivery
      createdAt
      cardPointFile {
        bucket
        region
        key
      }
      userUploadedImages {
        bucket
        region
        key
      }
      city
      zip
      cuisine
      diets
      like
      dislike
      orderOptionUrls {
        name
        url
        fontColor
        backgroundColor
      }
      menus {
        id
        name
        description
      }
      likedBefore
      dislikedBefore
      rewardValue
      rewardUrl
      promoURL
      rewardPrice
      rewardRule
      rewardCode
      rewardButtonTitle
      rewardFontColor
      rewardBgColor
      rewardLimit
      rewardButtonImage
      rewardTitle
      updatedAt
      ratings {
        nextToken
      }
      shares {
        nextToken
        count
        scannedCount
      }
      userRewards {
        nextToken
      }
      totlaCount
      ratingScore
      restaurantID
      restaurant {
        id
        name
        address
        city
        zip
        description
        lat
        lng
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
        owner
      }
      userInteractions {
        nextToken
        scannedCount
      }
      userReaction {
        nextToken
      }
      userComment {
        nextToken
      }
      mood {
        id
        name
        backgroundColor
        createdAt
        updatedAt
      }
      cardPointMoodId
      owner
    }
  }
`;
export const listCardPoints = /* GraphQL */ `
  query ListCardPoints(
    $filter: ModelCardPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCardPoints(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      count
      scannedCount
      nextToken
    }
  }
`;
export const getCardsByResturantId = /* GraphQL */ gql`
  query GetCardsByResturantId(
    $restaurantID: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelCardPointFilterInput
    $limit: Int
    $nextToken: String
  ) {
    getCardsByResturantId(
      restaurantID: $restaurantID
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
        menus {
          id
          name
        }
        cardPointFile {
          bucket
          key
          region
      }
        orderOptionUrls {
          backgroundColor
          fontColor
          name
          url
          file {
              bucket
              key
              region
          }
      }
      }
      count
      scannedCount
      nextToken
    }
  }
`;
export const searchCardPoints = /* GraphQL */ `
  query SearchCardPoints(
    $filter: SearchableCardPointFilterInput
    $sort: [SearchableCardPointSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCardPointAggregationInput]
  ) {
    searchCardPoints(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getRating = /* GraphQL */ `
  query GetRating($id: ID!) {
    getRating(id: $id) {
      id
      CardID
      UserID
      score
      createdAt
      updatedAt
    }
  }
`;
export const listRatings = /* GraphQL */ `
  query ListRatings(
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRatings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        CardID
        UserID
        score
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ratingByCardId = /* GraphQL */ `
  query RatingByCardId(
    $CardID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingByCardId(
      CardID: $CardID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        CardID
        UserID
        score
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const ratingByUserId = /* GraphQL */ `
  query RatingByUserId(
    $UserID: ID!
    $id: ModelIDKeyConditionInput
    $sortDirection: ModelSortDirection
    $filter: ModelRatingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    ratingByUserId(
      UserID: $UserID
      id: $id
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        CardID
        UserID
        score
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
export const getTrending = /* GraphQL */ `
  query GetTrending($id: ID!) {
    getTrending(id: $id) {
      id
      name
      cards {
        cardId
        name
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listTrendings = /* GraphQL */ `
  query ListTrendings(
    $filter: ModelTrendingFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTrendings(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getEmojiModel = /* GraphQL */ `
  query GetEmojiModel($id: ID!) {
    getEmojiModel(id: $id) {
      id
      title
      cover {
        bucket
        region
        key
      }
      createdAt
      updatedAt
      owner
    }
  }
`;
export const listEmojiModels = /* GraphQL */ `
  query ListEmojiModels(
    $filter: ModelEmojiModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmojiModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        createdAt
        updatedAt
        owner
      }
      nextToken
    }
  }
`;
export const getComment = /* GraphQL */ `
  query GetComment($id: ID!) {
    getComment(id: $id) {
      id
      title
      cover {
        bucket
        region
        key
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
      card {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      createdAt
      updatedAt
      userProfileReactionsId
      cardPointUserReactionId
      owner
    }
  }
`;
export const listComments = /* GraphQL */ `
  query ListComments(
    $filter: ModelCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        title
        createdAt
        updatedAt
        userProfileReactionsId
        cardPointUserReactionId
        owner
      }
      nextToken
    }
  }
`;
export const getTextComment = /* GraphQL */ `
  query GetTextComment($id: ID!) {
    getTextComment(id: $id) {
      id
      body
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
      card {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      createdAt
      updatedAt
      userProfileTextCommentsId
      cardPointUserCommentId
      owner
    }
  }
`;
export const listTextComments = /* GraphQL */ `
  query ListTextComments(
    $filter: ModelTextCommentFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTextComments(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        body
        createdAt
        updatedAt
        userProfileTextCommentsId
        cardPointUserCommentId
        owner
      }
      nextToken
    }
  }
`;
export const getUserInteraction = /* GraphQL */ `
  query GetUserInteraction($id: ID!) {
    getUserInteraction(id: $id) {
      id
      isLiked
      referenceUserKey
      owner
      createdAt
      updatedAt
      card {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
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
      userProfileInteractionsId
      cardPointUserInteractionsId
    }
  }
`;
export const listUserInteractions = /* GraphQL */ `
  query ListUserInteractions(
    $filter: ModelUserInteractionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserInteractions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isLiked
        referenceUserKey
        owner
        createdAt
        updatedAt
        userProfileInteractionsId
        cardPointUserInteractionsId
      }
      nextToken
      scannedCount
    }
  }
`;
export const interactionByUserReference = /* GraphQL */ `
  query InteractionByUserReference(
    $referenceUserKey: ID!
    $sortDirection: ModelSortDirection
    $filter: ModelUserInteractionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    interactionByUserReference(
      referenceUserKey: $referenceUserKey
      sortDirection: $sortDirection
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        isLiked
        referenceUserKey
        owner
        createdAt
        updatedAt
        userProfileInteractionsId
        cardPointUserInteractionsId
      }
      nextToken
      scannedCount
    }
  }
`;
export const searchUserInteractions = /* GraphQL */ `
  query SearchUserInteractions(
    $filter: SearchableUserInteractionFilterInput
    $sort: [SearchableUserInteractionSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserInteractionAggregationInput]
  ) {
    searchUserInteractions(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        isLiked
        referenceUserKey
        owner
        createdAt
        updatedAt
        userProfileInteractionsId
        cardPointUserInteractionsId
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getUserMood = /* GraphQL */ `
  query GetUserMood($id: ID!) {
    getUserMood(id: $id) {
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
  }
`;
export const listUserMoods = /* GraphQL */ `
  query ListUserMoods(
    $filter: ModelUserMoodFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listUserMoods(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        value
        createdAt
        updatedAt
        moodUserMoodsId
        userProfileMoodsId
        owner
      }
      nextToken
    }
  }
`;
export const searchUserMoods = /* GraphQL */ `
  query SearchUserMoods(
    $filter: SearchableUserMoodFilterInput
    $sort: [SearchableUserMoodSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableUserMoodAggregationInput]
  ) {
    searchUserMoods(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        value
        createdAt
        updatedAt
        moodUserMoodsId
        userProfileMoodsId
        owner
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getCardShare = /* GraphQL */ `
  query GetCardShare($id: ID!) {
    getCardShare(id: $id) {
      id
      sentByUserId
      sentByUserProfilePic {
        bucket
        region
        key
      }
      sentByUserName
      receivedByUser
      createdAt
      updatedAt
      link
      newUserInvite
      email
      phone
      isInteractedWith
      message
      card {
        id
        name
        description
        price
        delivery
        createdAt
        city
        zip
        cuisine
        diets
        like
        dislike
        likedBefore
        dislikedBefore
        rewardValue
        rewardUrl
        promoURL
        rewardPrice
        rewardRule
        rewardCode
        rewardButtonTitle
        rewardFontColor
        rewardBgColor
        rewardLimit
        rewardButtonImage
        rewardTitle
        updatedAt
        totlaCount
        ratingScore
        restaurantID
        cardPointMoodId
        owner
      }
      cardPointSharesId
    }
  }
`;
export const listCardShares = /* GraphQL */ `
  query ListCardShares(
    $filter: ModelCardShareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listCardShares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sentByUserId
        sentByUserName
        receivedByUser
        createdAt
        updatedAt
        link
        newUserInvite
        email
        phone
        isInteractedWith
        message
        cardPointSharesId
      }
      nextToken
      count
      scannedCount
    }
  }
`;
export const searchCardShares = /* GraphQL */ `
  query SearchCardShares(
    $filter: SearchableCardShareFilterInput
    $sort: [SearchableCardShareSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableCardShareAggregationInput]
  ) {
    searchCardShares(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        sentByUserId
        sentByUserName
        receivedByUser
        createdAt
        updatedAt
        link
        newUserInvite
        email
        phone
        isInteractedWith
        message
        cardPointSharesId
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getMenuShare = /* GraphQL */ `
  query GetMenuShare($id: ID!) {
    getMenuShare(id: $id) {
      id
      sentByUserId
      sentByUserProfilePic {
        bucket
        region
        key
      }
      sentByUserName
      receivedByUser
      message
      newUserInvite
      link
      email
      phone
      isInteractedWith
      restaurant {
        id
        name
        address
        city
        zip
        description
        lat
        lng
        cuisine
        delivery
        createdAt
        contact
        averagePrice
        updatedAt
        owner
      }
      menu {
        id
        name
        description
        createdAt
        updatedAt
        owner
      }
      createdAt
      updatedAt
      restaurantSharesId
      restaurantMenuSharesId
    }
  }
`;
export const listMenuShares = /* GraphQL */ `
  query ListMenuShares(
    $filter: ModelMenuShareFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listMenuShares(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        sentByUserId
        sentByUserName
        receivedByUser
        message
        newUserInvite
        link
        email
        phone
        isInteractedWith
        createdAt
        updatedAt
        restaurantSharesId
        restaurantMenuSharesId
      }
      nextToken
    }
  }
`;
export const searchMenuShares = /* GraphQL */ `
  query SearchMenuShares(
    $filter: SearchableMenuShareFilterInput
    $sort: [SearchableMenuShareSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableMenuShareAggregationInput]
  ) {
    searchMenuShares(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        sentByUserId
        sentByUserName
        receivedByUser
        message
        newUserInvite
        link
        email
        phone
        isInteractedWith
        createdAt
        updatedAt
        restaurantSharesId
        restaurantMenuSharesId
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;
export const getRewardModel = /* GraphQL */ `
  query GetRewardModel($id: ID!) {
    getRewardModel(id: $id) {
      id
      cover {
        bucket
        region
        key
      }
      description
      active
      value
      userProfile {
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
      userProfileRewardsId
      owner
    }
  }
`;
export const listRewardModels = /* GraphQL */ `
  query ListRewardModels(
    $filter: ModelRewardModelFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listRewardModels(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        active
        value
        createdAt
        updatedAt
        userProfileRewardsId
        owner
      }
      nextToken
    }
  }
`;
export const searchRewardModels = /* GraphQL */ `
  query SearchRewardModels(
    $filter: SearchableRewardModelFilterInput
    $sort: [SearchableRewardModelSortInput]
    $limit: Int
    $nextToken: String
    $from: Int
    $aggregates: [SearchableRewardModelAggregationInput]
  ) {
    searchRewardModels(
      filter: $filter
      sort: $sort
      limit: $limit
      nextToken: $nextToken
      from: $from
      aggregates: $aggregates
    ) {
      items {
        id
        description
        active
        value
        createdAt
        updatedAt
        userProfileRewardsId
        owner
      }
      nextToken
      total
      aggregateItems {
        name
      }
    }
  }
`;

// PURPOSE : Check user entered restaurant Url is already exist or not before approve restaurant.
export const SearchRestaurantUrlExists = /* GraphQL */ gql`
  query SearchRestaurantUrlExists(
    $filter: SearchableRestaurantFilterInput
  ) {
    searchRestaurants(
      filter: $filter
    ) {
      nextToken
      total
    }
  }
`;

// PURPOSE : Used for getting the restaurant story by restaurant url.
export const getStoryByRestaurantUrl = /* GraphQL */ gql`
  query GetStoryByRestaurantUrl(
    $restaurantUrl: String!
    $filter: ModelRestaurantStoryFilterInput
    $limit: Int,
    $nextToken: String,
  ) {
    getStoryByRestaurantURL(restaurantUrl: $restaurantUrl, filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        isMediaTypeVideo
        videoDuration
        storyFile {
          bucket
          key
          region
        }
        restaurantUrl
        restaurantID
        createdAt
        description
        id
        owner
        restaurant {
          name
          address
          city
          cityNameSlug
          restaurantUrl
        }
        title
        updatedAt
      }
      nextToken
    }
  }
`;

export const getPhotographerInUserProfile = /* GraphQL */ gql`
  query getPhotographerInUserProfile(
    $userID: ID!
    $filter: ModelPhotographerFilterInput
  ) {
    getPhotographerInUserProfile(userID: $userID, filter: $filter) {
      items {
        photographedRestaurants
        uploadedBulkImages
        userID
        userProfile {
          email
        }
      }
      nextToken
    }
  }
`;

// PURPOSE : Used for getting the list of restaurant custom menus.
export const listRestaurantCustomMenus = /* GraphQL */ gql`
  query listRestaurantCustomMenus(
    $filter: ModelRestaurantCustomMenuFilterInput,
     $limit: Int,
     $nextToken: String,
  ) {
    listRestaurantCustomMenus(filter:$filter, limit: $limit, nextToken: $nextToken) {
      nextToken
      items {
        createdAt
        customCardIds
        customMenuName
        customMenuUrl
        cityNameSlug
        restaurantUrl
        id
        restaurantID
        restaurant {
          cityNameSlug
          name
        }
        cards {
          items {
            cardPoint {
              id
              city
              cardPointFile {
                bucket
                key
                region
              }
              cuisine
              delivery
              description
              diets
              name
              price
              orderOptionUrls {
                backgroundColor
                file {
                  bucket
                  key
                  region
                }
                fontColor
                name
                url
              }
              restaurantID
              restaurant {
                name
              }
              zip
              userComment {
                items {
                  body
                  createdAt
                  userProfileTextCommentsId
                  id
                  owner
                }
              }
            }
          }
          nextToken
        }
      }
    }
  }
`;

export const getCustomerServiceRep = /* GraphQL */ gql`
  query GetCustomerServiceRep($id: ID!){
    getUserProfile(id: $id) {
      email
      customerServiceRep {
        items {
          approvedCards
          approvedRestaurants
          createdAt
          restaurantID
          restaurant {
            name
          }
          updatedAt
          uploadedBulkImages
          uploadedCards
          userID
        }
      }
    }
  }
`;

 // PURPOSE : Check the user entered custom menu url is already exist or not.
export const searchIsCustomUrlExisits = /* GraphQL */ gql`
  query searchRestaurantCustomMenus(
    $filter: SearchableRestaurantCustomMenuFilterInput
  ) {
    searchRestaurantCustomMenus(filter: $filter) {
      total
      nextToken
      items {
        cityNameSlug
        createdAt
        customMenuName
        customCardIds
        customMenuUrl
        id
        restaurantID
        updatedAt
        restaurant{
          name
        }
      }
    }
  }
`;

export const listRestaurantFollowers = /* GraphQL */ gql`
  query listRestaurantFollowers($filter: ModelRestaurantFollowersFilterInput, $limit: Int, $nextToken: String) {
    listRestaurantFollowers(filter: $filter, limit: $limit, nextToken: $nextToken) {
      nextToken
      items {
        restaurantID
        createdAt
        userProfileID
        id
        userProfile {
          email
          firstname
          lastname
          file {
            bucket
            key
            region
          }
        }
      }
    }
  }
`;

export const getFollowedRestaurantsByUser = /* GraphQL */ gql`
  query getUserProfile($id: String!) {
    getUserProfile(id: $id) {
      items {
        id
        restaurantID
        restaurant {
          name
        }
      }
      nextToken
    }
}`;

export const getRewardsByRestaurantId = /* GraphQL */ gql`
  query getRewardsByRestaurantId($restaurantID: ID!, $sortDirection: ModelSortDirection, $limit: Int, $filter: ModelRestaurantRewardsFilterInput, $nextToken: String) {
    getRewardsByRestaurantId(restaurantID: $restaurantID, sortDirection: $sortDirection, limit: $limit, filter: $filter, nextToken: $nextToken) {
      items {
      name
      maxRewardsAvailable
      isPromoCodeUrl
      startDate
      radiusAvailableMiles
      isPromoAvailableToFlollowers
      isActive
      id
      file {
        bucket
        key
        region
      }
      expirationDate
      backgroundColor
      promoUrl
      promoCode
      restaurantID
      restaurant {
        city
        name
      }
    }
    nextToken
  }
}`;

export const getRestaurantBulkImages = /* GraphQL */ gql`
  query listRestaurants($filter:ModelRestaurantFilterInput,$limit: Int, $nextToken: String) {
    listRestaurants(filter:$filter,limit: $limit, nextToken: $nextToken) {
      items {
      name
      bulkImages {
        bucket
        key
        region
      }
    }
    nextToken
    total
  }
}`;

export const getDashBoardActiveAndPending = /* GraphQL */ gql`
  query GetDashBoardActiveAndPending($id:ID!) {
    getRestaurant(id:$id) {
      name
      cards {
      nextToken
      items {
        isActive
        isPendingReview
        name
      }
    }
  }
}`;
