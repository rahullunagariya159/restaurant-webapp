/* eslint-disable */
// this is an auto generated file. This will be overwritten
import gql from 'graphql-tag';

export const friendReqFn = /* GraphQL */ `
  mutation FriendReqFn($requestId: String!, $status: FriendshipStatus!) {
    friendReqFn(requestId: $requestId, status: $status) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const redeemCard = /* GraphQL */ `
  mutation RedeemCard($userId: String!, $hash: String!) {
    redeemCard(userId: $userId, hash: $hash) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const updateCard = /* GraphQL */ `
  mutation UpdateCard(
    $userId: String!
    $cardId: String!
    $likeOrDislike: String!
    $esget: Boolean
    $espost: EsPost
  ) {
    updateCard(
      userId: $userId
      cardId: $cardId
      likeOrDislike: $likeOrDislike
      esget: $esget
      espost: $espost
    ) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const shareCardWithMultipleUsers = /* GraphQL */ `
  mutation ShareCardWithMultipleUsers(
    $cardId: String!
    $recievingUsers: [String]
    $sentByUser: String!
    $message: String
  ) {
    shareCardWithMultipleUsers(
      cardId: $cardId
      recievingUsers: $recievingUsers
      sentByUser: $sentByUser
      message: $message
    ) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const shareMenuWithUsers = /* GraphQL */ `
  mutation ShareMenuWithUsers(
    $restaurantId: String!
    $menuId: String!
    $recievingUsers: [String]
    $sentByUser: String!
    $message: String
  ) {
    shareMenuWithUsers(
      restaurantId: $restaurantId
      menuId: $menuId
      recievingUsers: $recievingUsers
      sentByUser: $sentByUser
      message: $message
    ) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const redeemReward = /* GraphQL */ `
  mutation RedeemReward(
    $userId: String!
    $rewardId: String!
    $location: LocationInput
  ) {
    redeemReward(userId: $userId, rewardId: $rewardId, location: $location) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const sendFriendRequest = /* GraphQL */ `
  mutation SendFriendRequest($input: SendFriendRequestInput!) {
    sendFriendRequest(input: $input) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const giveRewardToUsers = /* GraphQL */ `
  mutation GiveRewardToUsers(
    $userIds: [String]
    $file: S3ObjectInput
    $rewardValue: String
    $title: String
    $content: String
  ) {
    giveRewardToUsers(
      userIds: $userIds
      file: $file
      rewardValue: $rewardValue
      title: $title
      content: $content
    ) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const sendCardRecommendation = /* GraphQL */ `
  mutation SendCardRecommendation(
    $userIds: [String]
    $title: String
    $content: String
  ) {
    sendCardRecommendation(
      userIds: $userIds
      title: $title
      content: $content
    ) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const sendPopularCardNearby = /* GraphQL */ `
  mutation SendPopularCardNearby(
    $iosDeviceIds: [String]
    $title: String
    $content: String
    $location: LocationInput!
    $m: Int
    $limit: Int
    $mostShared: Boolean
  ) {
    sendPopularCardNearby(
      iosDeviceIds: $iosDeviceIds
      title: $title
      content: $content
      location: $location
      m: $m
      limit: $limit
      mostShared: $mostShared
    ) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const sendCardUsersNearby = /* GraphQL */ `
  mutation SendCardUsersNearby(
    $title: String
    $content: String
    $iosDeviceIds: [String]
    $cardName: String
    $restaurantName: String
    $notifications: [Int]
  ) {
    sendCardUsersNearby(
      title: $title
      content: $content
      iosDeviceIds: $iosDeviceIds
      cardName: $cardName
      restaurantName: $restaurantName
      notifications: $notifications
    ) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const sendEmailToAdmin = /* GraphQL */ `
  mutation SendEmailToAdmin($cardInformation: String) {
    sendEmailToAdmin(cardInformation: $cardInformation) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const compressImage = /* GraphQL */ `
  mutation CompressImage($perc: Int, $keys: [String]) {
    compressImage(perc: $perc, keys: $keys) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const sendPushNotifications = /* GraphQL */ `
  mutation SendPushNotifications($payload: String, $iosTokens: [String]) {
    sendPushNotifications(payload: $payload, iosTokens: $iosTokens) {
      id
      errorCode
      errorMsg
    }
  }
`;
export const createUserInvite = /* GraphQL */ `
  mutation CreateUserInvite(
    $input: CreateUserInviteInput!
    $condition: ModelUserInviteConditionInput
  ) {
    createUserInvite(input: $input, condition: $condition) {
      id
      phone
      email
      shareId
      createdAt
      updatedAt
    }
  }
`;
export const updateUserInvite = /* GraphQL */ `
  mutation UpdateUserInvite(
    $input: UpdateUserInviteInput!
    $condition: ModelUserInviteConditionInput
  ) {
    updateUserInvite(input: $input, condition: $condition) {
      id
      phone
      email
      shareId
      createdAt
      updatedAt
    }
  }
`;
export const deleteUserInvite = /* GraphQL */ `
  mutation DeleteUserInvite(
    $input: DeleteUserInviteInput!
    $condition: ModelUserInviteConditionInput
  ) {
    deleteUserInvite(input: $input, condition: $condition) {
      id
      phone
      email
      shareId
      createdAt
      updatedAt
    }
  }
`;
export const createContent = /* GraphQL */ `
  mutation CreateContent(
    $input: CreateContentInput!
    $condition: ModelContentConditionInput
  ) {
    createContent(input: $input, condition: $condition) {
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
export const updateContent = /* GraphQL */ `
  mutation UpdateContent(
    $input: UpdateContentInput!
    $condition: ModelContentConditionInput
  ) {
    updateContent(input: $input, condition: $condition) {
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
export const deleteContent = /* GraphQL */ `
  mutation DeleteContent(
    $input: DeleteContentInput!
    $condition: ModelContentConditionInput
  ) {
    deleteContent(input: $input, condition: $condition) {
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
export const createRestaurantUnapproved = /* GraphQL */ `
  mutation CreateRestaurantUnapproved(
    $input: CreateRestaurantUnapprovedInput!
    $condition: ModelRestaurantUnapprovedConditionInput
  ) {
    createRestaurantUnapproved(input: $input, condition: $condition) {
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
      cityNameSlug
    }
  }
`;
export const updateRestaurantUnapproved = /* GraphQL */ `
  mutation UpdateRestaurantUnapproved(
    $input: UpdateRestaurantUnapprovedInput!
    $condition: ModelRestaurantUnapprovedConditionInput
  ) {
    updateRestaurantUnapproved(input: $input, condition: $condition) {
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
export const deleteRestaurantUnapproved = /* GraphQL */ gql`
  mutation DeleteRestaurantUnapproved(
    $input: DeleteRestaurantUnapprovedInput!
    $condition: ModelRestaurantUnapprovedConditionInput
  ) {
    deleteRestaurantUnapproved(input: $input, condition: $condition) {
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
export const createRestaurant = /* GraphQL */ gql`
  mutation CreateRestaurant(
    $input: CreateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    createRestaurant(input: $input, condition: $condition) {
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
      cityNameSlug
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
    }
  }
`;
export const updateRestaurant = /* GraphQL */ gql`
  mutation UpdateRestaurant(
    $input: UpdateRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    updateRestaurant(input: $input, condition: $condition) {
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
    }
  }
`;
export const deleteRestaurant = /* GraphQL */ `
  mutation DeleteRestaurant(
    $input: DeleteRestaurantInput!
    $condition: ModelRestaurantConditionInput
  ) {
    deleteRestaurant(input: $input, condition: $condition) {
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
    }
  }
`;
export const createRestaurantMenu = /* GraphQL */ `
  mutation CreateRestaurantMenu(
    $input: CreateRestaurantMenuInput!
    $condition: ModelRestaurantMenuConditionInput
  ) {
    createRestaurantMenu(input: $input, condition: $condition) {
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
export const updateRestaurantMenu = /* GraphQL */ `
  mutation UpdateRestaurantMenu(
    $input: UpdateRestaurantMenuInput!
    $condition: ModelRestaurantMenuConditionInput
  ) {
    updateRestaurantMenu(input: $input, condition: $condition) {
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
export const deleteRestaurantMenu = /* GraphQL */ `
  mutation DeleteRestaurantMenu(
    $input: DeleteRestaurantMenuInput!
    $condition: ModelRestaurantMenuConditionInput
  ) {
    deleteRestaurantMenu(input: $input, condition: $condition) {
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
export const createCuisine = /* GraphQL */ `
  mutation CreateCuisine(
    $input: CreateCuisineInput!
    $condition: ModelCuisineConditionInput
  ) {
    createCuisine(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateCuisine = /* GraphQL */ `
  mutation UpdateCuisine(
    $input: UpdateCuisineInput!
    $condition: ModelCuisineConditionInput
  ) {
    updateCuisine(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteCuisine = /* GraphQL */ `
  mutation DeleteCuisine(
    $input: DeleteCuisineInput!
    $condition: ModelCuisineConditionInput
  ) {
    deleteCuisine(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createDelivery = /* GraphQL */ `
  mutation CreateDelivery(
    $input: CreateDeliveryInput!
    $condition: ModelDeliveryConditionInput
  ) {
    createDelivery(input: $input, condition: $condition) {
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
export const updateDelivery = /* GraphQL */ `
  mutation UpdateDelivery(
    $input: UpdateDeliveryInput!
    $condition: ModelDeliveryConditionInput
  ) {
    updateDelivery(input: $input, condition: $condition) {
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
export const deleteDelivery = /* GraphQL */ `
  mutation DeleteDelivery(
    $input: DeleteDeliveryInput!
    $condition: ModelDeliveryConditionInput
  ) {
    deleteDelivery(input: $input, condition: $condition) {
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
export const createMood = /* GraphQL */ `
  mutation CreateMood(
    $input: CreateMoodInput!
    $condition: ModelMoodConditionInput
  ) {
    createMood(input: $input, condition: $condition) {
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
export const updateMood = /* GraphQL */ `
  mutation UpdateMood(
    $input: UpdateMoodInput!
    $condition: ModelMoodConditionInput
  ) {
    updateMood(input: $input, condition: $condition) {
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
export const deleteMood = /* GraphQL */ `
  mutation DeleteMood(
    $input: DeleteMoodInput!
    $condition: ModelMoodConditionInput
  ) {
    deleteMood(input: $input, condition: $condition) {
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
export const createDiet = /* GraphQL */ `
  mutation CreateDiet(
    $input: CreateDietInput!
    $condition: ModelDietConditionInput
  ) {
    createDiet(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const updateDiet = /* GraphQL */ `
  mutation UpdateDiet(
    $input: UpdateDietInput!
    $condition: ModelDietConditionInput
  ) {
    updateDiet(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const deleteDiet = /* GraphQL */ `
  mutation DeleteDiet(
    $input: DeleteDietInput!
    $condition: ModelDietConditionInput
  ) {
    deleteDiet(input: $input, condition: $condition) {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const createNotification = /* GraphQL */ `
  mutation CreateNotification(
    $input: CreateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    createNotification(input: $input, condition: $condition) {
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
export const updateNotification = /* GraphQL */ `
  mutation UpdateNotification(
    $input: UpdateNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    updateNotification(input: $input, condition: $condition) {
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
export const deleteNotification = /* GraphQL */ `
  mutation DeleteNotification(
    $input: DeleteNotificationInput!
    $condition: ModelNotificationConditionInput
  ) {
    deleteNotification(input: $input, condition: $condition) {
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
export const createUserProfile = /* GraphQL */ `
  mutation CreateUserProfile(
    $input: CreateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    createUserProfile(input: $input, condition: $condition) {
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
export const updateUserProfile = /* GraphQL */ gql`
  mutation UpdateUserProfile(
    $input: UpdateUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    updateUserProfile(input: $input, condition: $condition) {
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
export const deleteUserProfile = /* GraphQL */ `
  mutation DeleteUserProfile(
    $input: DeleteUserProfileInput!
    $condition: ModelUserProfileConditionInput
  ) {
    deleteUserProfile(input: $input, condition: $condition) {
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
export const createFriendshipConnection = /* GraphQL */ `
  mutation CreateFriendshipConnection(
    $input: CreateFriendshipConnectionInput!
    $condition: ModelFriendshipConnectionConditionInput
  ) {
    createFriendshipConnection(input: $input, condition: $condition) {
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
export const updateFriendshipConnection = /* GraphQL */ `
  mutation UpdateFriendshipConnection(
    $input: UpdateFriendshipConnectionInput!
    $condition: ModelFriendshipConnectionConditionInput
  ) {
    updateFriendshipConnection(input: $input, condition: $condition) {
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
export const deleteFriendshipConnection = /* GraphQL */ `
  mutation DeleteFriendshipConnection(
    $input: DeleteFriendshipConnectionInput!
    $condition: ModelFriendshipConnectionConditionInput
  ) {
    deleteFriendshipConnection(input: $input, condition: $condition) {
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
export const createFriendRequestsConnection = /* GraphQL */ `
  mutation CreateFriendRequestsConnection(
    $input: CreateFriendRequestsConnectionInput!
    $condition: ModelFriendRequestsConnectionConditionInput
  ) {
    createFriendRequestsConnection(input: $input, condition: $condition) {
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
export const updateFriendRequestsConnection = /* GraphQL */ `
  mutation UpdateFriendRequestsConnection(
    $input: UpdateFriendRequestsConnectionInput!
    $condition: ModelFriendRequestsConnectionConditionInput
  ) {
    updateFriendRequestsConnection(input: $input, condition: $condition) {
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
export const deleteFriendRequestsConnection = /* GraphQL */ `
  mutation DeleteFriendRequestsConnection(
    $input: DeleteFriendRequestsConnectionInput!
    $condition: ModelFriendRequestsConnectionConditionInput
  ) {
    deleteFriendRequestsConnection(input: $input, condition: $condition) {
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
export const createSentFriendRequestsConnection = /* GraphQL */ `
  mutation CreateSentFriendRequestsConnection(
    $input: CreateSentFriendRequestsConnectionInput!
    $condition: ModelSentFriendRequestsConnectionConditionInput
  ) {
    createSentFriendRequestsConnection(input: $input, condition: $condition) {
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
export const updateSentFriendRequestsConnection = /* GraphQL */ `
  mutation UpdateSentFriendRequestsConnection(
    $input: UpdateSentFriendRequestsConnectionInput!
    $condition: ModelSentFriendRequestsConnectionConditionInput
  ) {
    updateSentFriendRequestsConnection(input: $input, condition: $condition) {
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
export const deleteSentFriendRequestsConnection = /* GraphQL */ `
  mutation DeleteSentFriendRequestsConnection(
    $input: DeleteSentFriendRequestsConnectionInput!
    $condition: ModelSentFriendRequestsConnectionConditionInput
  ) {
    deleteSentFriendRequestsConnection(input: $input, condition: $condition) {
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
export const createAchievements = /* GraphQL */ `
  mutation CreateAchievements(
    $input: CreateAchievementsInput!
    $condition: ModelAchievementsConditionInput
  ) {
    createAchievements(input: $input, condition: $condition) {
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
export const updateAchievements = /* GraphQL */ `
  mutation UpdateAchievements(
    $input: UpdateAchievementsInput!
    $condition: ModelAchievementsConditionInput
  ) {
    updateAchievements(input: $input, condition: $condition) {
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
export const deleteAchievements = /* GraphQL */ `
  mutation DeleteAchievements(
    $input: DeleteAchievementsInput!
    $condition: ModelAchievementsConditionInput
  ) {
    deleteAchievements(input: $input, condition: $condition) {
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
export const createBenchmark = /* GraphQL */ `
  mutation CreateBenchmark(
    $input: CreateBenchmarkInput!
    $condition: ModelBenchmarkConditionInput
  ) {
    createBenchmark(input: $input, condition: $condition) {
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
export const updateBenchmark = /* GraphQL */ `
  mutation UpdateBenchmark(
    $input: UpdateBenchmarkInput!
    $condition: ModelBenchmarkConditionInput
  ) {
    updateBenchmark(input: $input, condition: $condition) {
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
export const deleteBenchmark = /* GraphQL */ `
  mutation DeleteBenchmark(
    $input: DeleteBenchmarkInput!
    $condition: ModelBenchmarkConditionInput
  ) {
    deleteBenchmark(input: $input, condition: $condition) {
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
export const createRewardButton = /* GraphQL */ `
  mutation CreateRewardButton(
    $input: CreateRewardButtonInput!
    $condition: ModelRewardButtonConditionInput
  ) {
    createRewardButton(input: $input, condition: $condition) {
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
export const updateRewardButton = /* GraphQL */ `
  mutation UpdateRewardButton(
    $input: UpdateRewardButtonInput!
    $condition: ModelRewardButtonConditionInput
  ) {
    updateRewardButton(input: $input, condition: $condition) {
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
export const deleteRewardButton = /* GraphQL */ `
  mutation DeleteRewardButton(
    $input: DeleteRewardButtonInput!
    $condition: ModelRewardButtonConditionInput
  ) {
    deleteRewardButton(input: $input, condition: $condition) {
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
export const createUnapprovedItem = /* GraphQL */ `
  mutation CreateUnapprovedItem(
    $input: CreateUnapprovedItemInput!
    $condition: ModelUnapprovedItemConditionInput
  ) {
    createUnapprovedItem(input: $input, condition: $condition) {
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
export const updateUnapprovedItem = /* GraphQL */ `
  mutation UpdateUnapprovedItem(
    $input: UpdateUnapprovedItemInput!
    $condition: ModelUnapprovedItemConditionInput
  ) {
    updateUnapprovedItem(input: $input, condition: $condition) {
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
export const deleteUnapprovedItem = /* GraphQL */ gql`
  mutation DeleteUnapprovedItem(
    $input: DeleteUnapprovedItemInput!
    $condition: ModelUnapprovedItemConditionInput
  ) {
    deleteUnapprovedItem(input: $input, condition: $condition) {
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
export const createCardPoint = /* GraphQL */ `
  mutation CreateCardPoint(
    $input: CreateCardPointInput!
    $condition: ModelCardPointConditionInput
  ) {
    createCardPoint(input: $input, condition: $condition) {
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
        file {
          bucket
          region
          key
        }
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
      shares {
        items {
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
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
          cardPointSharesId
        }
        nextToken
        count
        scannedCount
      }
      userRewards {
        items {
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
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
          user {
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
            restaurantOwner {
              nextToken
            }
            customerServiceRep {
              nextToken
            }
            photographer {
              nextToken
            }
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
          createdAt
          updatedAt
          userProfileAchievementsId
          cardPointUserRewardsId
          owner
        }
        nextToken
      }
      totlaCount
      ratingScore
      restaurantID
      restaurant {
        id
        name
        address
        restaurantUrl
        restaurantOwner {
          items {
            id
            createdAt
            uploadedCards
            uploadedBulkImages
            restaurantID
            restaurant {
              id
              name
              address
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
            userID
            updatedAt
            owner
          }
          nextToken
        }
        customerServiceRep {
          items {
            id
            createdAt
            uploadedCards
            approvedCards
            approvedRestaurants
            uploadedBulkImages
            restaurantID
            restaurant {
              id
              name
              address
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
            userID
            updatedAt
            owner
          }
          nextToken
        }
        photographer {
          items {
            id
            createdAt
            cities
            photographedRestaurants
            uploadedBulkImages
            restaurantID
            restaurant {
              id
              name
              address
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
            userID
            updatedAt
            owner
          }
          nextToken
        }
        city
        zip
        cityNameSlug
        cityNameToLowerCase
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
          file {
            bucket
            region
            key
          }
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
          items {
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
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
          count
          scannedCount
          nextToken
        }
        story {
          items {
            id
            title
            description
            createdAt
            storyFile {
              bucket
              region
              key
            }
            restaurantID
            cityNameSlug
            restaurant {
              id
              name
              address
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
            restaurantUrl
            updatedAt
            owner
          }
          nextToken
        }
        shares {
          items {
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
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
          nextToken
        }
        updatedAt
        owner
      }
      userInteractions {
        items {
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
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
          user {
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
            restaurantOwner {
              nextToken
            }
            customerServiceRep {
              nextToken
            }
            photographer {
              nextToken
            }
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
          userProfileInteractionsId
          cardPointUserInteractionsId
        }
        nextToken
        scannedCount
      }
      userReaction {
        items {
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
            restaurantOwner {
              nextToken
            }
            customerServiceRep {
              nextToken
            }
            photographer {
              nextToken
            }
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
          card {
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
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
          createdAt
          updatedAt
          userProfileReactionsId
          cardPointUserReactionId
          owner
        }
        nextToken
      }
      userComment {
        items {
          id
          body
          user {
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
            restaurantOwner {
              nextToken
            }
            customerServiceRep {
              nextToken
            }
            photographer {
              nextToken
            }
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
          card {
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
              restaurantUrl
              city
              zip
              cityNameSlug
              cityNameToLowerCase
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
          createdAt
          updatedAt
          userProfileTextCommentsId
          cardPointUserCommentId
          owner
        }
        nextToken
      }
      mood {
        id
        name
        file {
          bucket
          region
          key
        }
        backgroundColor
        userMoods {
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
      }
      cardPointMoodId
      owner
    }
  }
`;

export const updateCardPoint = /* GraphQL */ `
  mutation UpdateCardPoint(
    $input: UpdateCardPointInput!
    $condition: ModelCardPointConditionInput
  ) {
    updateCardPoint(input: $input, condition: $condition) {
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

export const updateCardById = /* GraphQL */ `
  mutation UpdateCard(
    $input: UpdateCardPointInput!
  ) {
    updateCardPoint(input: $input) {
      cardPointFile {
        bucket
        key
        region
      }
      cuisine
      city
      createdAt
      cardPointMoodId
      delivery
      description
      diets
      id
      mood {
        backgroundColor
        createdAt
        id
        name
        file {
          bucket
          key
          region
        }
        updatedAt
      }
      name
      price
      restaurantID
      updatedAt
      zip
      restaurant {
        city
        address
        menus {
          name
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
    }
  }
`;
export const deleteCardPoint = /* GraphQL */ gql`
  mutation DeleteCardPoint(
    $input: DeleteCardPointInput!
    $condition: ModelCardPointConditionInput
  ) {
    deleteCardPoint(input: $input, condition: $condition) {
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
export const createRating = /* GraphQL */ `
  mutation CreateRating(
    $input: CreateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    createRating(input: $input, condition: $condition) {
      id
      CardID
      UserID
      score
      createdAt
      updatedAt
    }
  }
`;
export const updateRating = /* GraphQL */ `
  mutation UpdateRating(
    $input: UpdateRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    updateRating(input: $input, condition: $condition) {
      id
      CardID
      UserID
      score
      createdAt
      updatedAt
    }
  }
`;
export const deleteRating = /* GraphQL */ `
  mutation DeleteRating(
    $input: DeleteRatingInput!
    $condition: ModelRatingConditionInput
  ) {
    deleteRating(input: $input, condition: $condition) {
      id
      CardID
      UserID
      score
      createdAt
      updatedAt
    }
  }
`;
export const createTrending = /* GraphQL */ `
  mutation CreateTrending(
    $input: CreateTrendingInput!
    $condition: ModelTrendingConditionInput
  ) {
    createTrending(input: $input, condition: $condition) {
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
export const updateTrending = /* GraphQL */ `
  mutation UpdateTrending(
    $input: UpdateTrendingInput!
    $condition: ModelTrendingConditionInput
  ) {
    updateTrending(input: $input, condition: $condition) {
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
export const deleteTrending = /* GraphQL */ `
  mutation DeleteTrending(
    $input: DeleteTrendingInput!
    $condition: ModelTrendingConditionInput
  ) {
    deleteTrending(input: $input, condition: $condition) {
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
export const createEmojiModel = /* GraphQL */ `
  mutation CreateEmojiModel(
    $input: CreateEmojiModelInput!
    $condition: ModelEmojiModelConditionInput
  ) {
    createEmojiModel(input: $input, condition: $condition) {
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
export const updateEmojiModel = /* GraphQL */ `
  mutation UpdateEmojiModel(
    $input: UpdateEmojiModelInput!
    $condition: ModelEmojiModelConditionInput
  ) {
    updateEmojiModel(input: $input, condition: $condition) {
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
export const deleteEmojiModel = /* GraphQL */ `
  mutation DeleteEmojiModel(
    $input: DeleteEmojiModelInput!
    $condition: ModelEmojiModelConditionInput
  ) {
    deleteEmojiModel(input: $input, condition: $condition) {
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
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
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
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
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
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
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
export const createTextComment = /* GraphQL */ `
  mutation CreateTextComment(
    $input: CreateTextCommentInput!
    $condition: ModelTextCommentConditionInput
  ) {
    createTextComment(input: $input, condition: $condition) {
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
export const updateTextComment = /* GraphQL */ `
  mutation UpdateTextComment(
    $input: UpdateTextCommentInput!
    $condition: ModelTextCommentConditionInput
  ) {
    updateTextComment(input: $input, condition: $condition) {
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
export const deleteTextComment = /* GraphQL */ `
  mutation DeleteTextComment(
    $input: DeleteTextCommentInput!
    $condition: ModelTextCommentConditionInput
  ) {
    deleteTextComment(input: $input, condition: $condition) {
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
export const createUserInteraction = /* GraphQL */ `
  mutation CreateUserInteraction(
    $input: CreateUserInteractionInput!
    $condition: ModelUserInteractionConditionInput
  ) {
    createUserInteraction(input: $input, condition: $condition) {
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
export const updateUserInteraction = /* GraphQL */ `
  mutation UpdateUserInteraction(
    $input: UpdateUserInteractionInput!
    $condition: ModelUserInteractionConditionInput
  ) {
    updateUserInteraction(input: $input, condition: $condition) {
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
export const deleteUserInteraction = /* GraphQL */ `
  mutation DeleteUserInteraction(
    $input: DeleteUserInteractionInput!
    $condition: ModelUserInteractionConditionInput
  ) {
    deleteUserInteraction(input: $input, condition: $condition) {
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
export const createUserMood = /* GraphQL */ `
  mutation CreateUserMood(
    $input: CreateUserMoodInput!
    $condition: ModelUserMoodConditionInput
  ) {
    createUserMood(input: $input, condition: $condition) {
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
export const updateUserMood = /* GraphQL */ `
  mutation UpdateUserMood(
    $input: UpdateUserMoodInput!
    $condition: ModelUserMoodConditionInput
  ) {
    updateUserMood(input: $input, condition: $condition) {
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
export const deleteUserMood = /* GraphQL */ `
  mutation DeleteUserMood(
    $input: DeleteUserMoodInput!
    $condition: ModelUserMoodConditionInput
  ) {
    deleteUserMood(input: $input, condition: $condition) {
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
export const createCardShare = /* GraphQL */ `
  mutation CreateCardShare(
    $input: CreateCardShareInput!
    $condition: ModelCardShareConditionInput
  ) {
    createCardShare(input: $input, condition: $condition) {
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
export const updateCardShare = /* GraphQL */ `
  mutation UpdateCardShare(
    $input: UpdateCardShareInput!
    $condition: ModelCardShareConditionInput
  ) {
    updateCardShare(input: $input, condition: $condition) {
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
export const deleteCardShare = /* GraphQL */ `
  mutation DeleteCardShare(
    $input: DeleteCardShareInput!
    $condition: ModelCardShareConditionInput
  ) {
    deleteCardShare(input: $input, condition: $condition) {
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
export const createMenuShare = /* GraphQL */ `
  mutation CreateMenuShare(
    $input: CreateMenuShareInput!
    $condition: ModelMenuShareConditionInput
  ) {
    createMenuShare(input: $input, condition: $condition) {
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
export const updateMenuShare = /* GraphQL */ `
  mutation UpdateMenuShare(
    $input: UpdateMenuShareInput!
    $condition: ModelMenuShareConditionInput
  ) {
    updateMenuShare(input: $input, condition: $condition) {
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
export const deleteMenuShare = /* GraphQL */ `
  mutation DeleteMenuShare(
    $input: DeleteMenuShareInput!
    $condition: ModelMenuShareConditionInput
  ) {
    deleteMenuShare(input: $input, condition: $condition) {
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
export const createRewardModel = /* GraphQL */ `
  mutation CreateRewardModel(
    $input: CreateRewardModelInput!
    $condition: ModelRewardModelConditionInput
  ) {
    createRewardModel(input: $input, condition: $condition) {
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
export const updateRewardModel = /* GraphQL */ `
  mutation UpdateRewardModel(
    $input: UpdateRewardModelInput!
    $condition: ModelRewardModelConditionInput
  ) {
    updateRewardModel(input: $input, condition: $condition) {
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
export const deleteRewardModel = /* GraphQL */ `
  mutation DeleteRewardModel(
    $input: DeleteRewardModelInput!
    $condition: ModelRewardModelConditionInput
  ) {
    deleteRewardModel(input: $input, condition: $condition) {
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


//PURPOSE : Used for create new restaurant story.
export const createRestaurantStory = /* GraphQL */gql`
  mutation CreateRestaurantStory(
    $input: CreateRestaurantStoryInput!
  ) {
    createRestaurantStory(input: $input) {
      id
      description
      owner
      title
      updatedAt
      isMediaTypeVideo
      videoDuration
      storyFile {
        bucket
        key
        region
      }
      restaurantID
      restaurant {
        id
        name
        address
      }
    }
  }
`;


//PURPOSE : Used for update the restaurant story details by id.
export const updateRestaurantStory = /* GraphQL */gql`
mutation UpdateRestaurantStory($input: UpdateRestaurantStoryInput!) {
  updateRestaurantStory(input: $input) {
    cityNameSlug
    createdAt
    description
    id
    owner
    restaurantID
    restaurantUrl
    storyFile {
      bucket
      key
      region
    }
    title
    updatedAt
  }
}
`;

//PURPOSE : Used for update the restaurant owner details by id.
export const updateRestaurantOwner = /* GraphQL */gql`
  mutation updateRestaurantOwner($input: UpdateRestaurantOwnerInput!, $condition: ModelRestaurantOwnerConditionInput) {
    updateRestaurantOwner(input: $input, condition: $condition) {
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
`;

//PURPOSE : Used for create a new restaurant owner.
export const createRestaurantOwner = /* GraphQL */gql`
  mutation createRestaurantOwner($input: CreateRestaurantOwnerInput!, $condition: ModelRestaurantOwnerConditionInput) {
    createRestaurantOwner(input: $input, condition: $condition) {
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
`;

//PURPOSE : Used for delete the restaurant story by id.
export const deleteRestaurantStory = /* GraphQL */ gql`
  mutation DeleteUserInvite(
    $input: DeleteRestaurantStoryInput!
  ) {
    deleteRestaurantStory(input: $input) {
      id
      title
      updatedAt
    }
  }
`;

//PURPOSE : Used for create new photographer
export const createPhotographer = /* GraphQL */gql`
  mutation createPhotographer($input: CreatePhotographerInput!, $condition: ModelPhotographerConditionInput) {
    createPhotographer(input: $input, condition: $condition) {
      userProfile {
        email
      }
      id
    }
  }
`;

//PURPOSE : Used for update the photographer details
export const updatePhotographer = /* GraphQL */gql`
  mutation updatePhotographer($input: UpdatePhotographerInput!, $condition: ModelPhotographerConditionInput) {
    updatePhotographer(input: $input, condition: $condition) {
      userProfile {
        email
      }
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
    }
  }
`;

//PURPOSE : Create customer service supporter
export const createCustomerServiceRep = /* GraphQL */gql`
  mutation createCustomerServiceRep($input: CreateCustomerServiceRepInput!, $condition: ModelCustomerServiceRepConditionInput) {
    createCustomerServiceRep(input: $input, condition: $condition) {
      userProfile {
        email
      }
      id
    }
  }
`;

//PURPOSE : Update the status of pending upproved restaurant by customer service supporter
export const updateCustomerServiceRep = /* GraphQL */gql`
  mutation updateCustomerServiceRep($input: UpdateCustomerServiceRepInput!, $condition: ModelCustomerServiceRepConditionInput) {
    updateCustomerServiceRep(input: $input, condition: $condition) {
      userProfile {
        email
      }
      id
      createdAt
      restaurantID
      userID
      uploadedCards
      approvedCards
      approvedRestaurants
      userProfile {
        email
        firstname
        lastname
      }
    }
  }
`;

// PURPOSE : Create the restaurant custom menu.
export const createRestaurantCustomMenu = /* GraphQL */gql`
  mutation createRestaurantCustomMenu($input: CreateRestaurantCustomMenuInput!, $condition: ModelRestaurantCustomMenuConditionInput) {
    createRestaurantCustomMenu(input: $input, condition: $condition) {
      id
      cityNameSlug
      createdAt
      customCardIds
      customMenuName
      customMenuUrl
      restaurantID
      restaurantUrl
    }
  }
`;


// PURPOSE : Update the restaurant custom menu by id.
export const updateRestaurantCustomMenu = /* GraphQL */gql`
  mutation updateRestaurantCustomMenu($input: UpdateRestaurantCustomMenuInput!, $condition: ModelRestaurantCustomMenuConditionInput) {
    updateRestaurantCustomMenu(input: $input, condition: $condition) {
      id
    }
  }
`;

// PURPOSE : Delete the restaurant custom menu by id.
export const deleteRestaurantCustomMenu = /* GraphQL */gql`
  mutation deleteRestaurantCustomMenu($input: DeleteRestaurantCustomMenuInput!, $condition: ModelRestaurantCustomMenuConditionInput) {
    deleteRestaurantCustomMenu(input: $input, condition: $condition) {
      id
    }
  }
`;

export const addCardsToCustomMenu = /* GraphQL */gql`
  mutation createByCustomRestaurantMenu($input: CreateByCustomRestaurantMenuInput!,$condition: ModelByCustomRestaurantMenuConditionInput) {
    createByCustomRestaurantMenu(input: $input,condition: $condition) {
      cardPoint {
        city
        name
        price
      }
    }
  }
`;

export const updateCardsToCustomMenu = /* GraphQL */gql`
  mutation updateByCustomRestaurantMenu($input: UpdateByCustomRestaurantMenuInput!,$condition: ModelByCustomRestaurantMenuConditionInput) {
    updateByCustomRestaurantMenu(input: $input,condition: $condition) {
      cardPoint {
        city
        name
        price
      }
    }
  }
`;

export const deleteByCustomRestaurantMenu = /* GraphQL */gql`
  mutation deleteByCustomRestaurantMenu($input: DeleteByCustomRestaurantMenuInput!, $condition: ModelByCustomRestaurantMenuConditionInput) {
    deleteByCustomRestaurantMenu(input: $input,condition: $condition) {
      id
    }
  }
`;

export const followerARestaurant = /* GraphQL */ `
  mutation FollowerARestaurant($input: CreateRestaurantFollowersInput!) {
    createRestaurantFollowers(input:$input) {
      createdAt
      id
    }
  }
`;

export const unfollowerRestaurant = /* GraphQL */ `
  mutation UnfollowerRestaurant($id: String!) {
    deleteRestaurantFollowers(input: {"id": $id}) {
      id
      userProfileID
      restaurantID
    }
  }
`;

export const createReward = /* GraphQL */ `
  mutation CreateReward($input: CreateRestaurantRewardsInput!) {
    createRestaurantRewards(input: $input) {
      name
      userProfileID
      restaurantID
      restaurant {
        name
      }
    }
  }
`;

export const deleteRewardsById = /* GraphQL */ gql`
  mutation DeleteRewardsById($input: DeleteRestaurantRewardsInput!, $condition: ModelRestaurantRewardsConditionInput) {
    deleteRestaurantRewards(input: $input,condition: $condition) {
      backgroundColor
      isActive
      name
      restaurantID
      id
    }
  }
`;

export const updateRestaurantRewardsById = /* GraphQL */gql`
  mutation UpdateRewardsById($input: UpdateRestaurantRewardsInput!,$condition: ModelRestaurantRewardsConditionInput) {
    updateRestaurantRewards(input: $input,condition: $condition) {
      id
      name
      restaurantID
    }
  }
`;
