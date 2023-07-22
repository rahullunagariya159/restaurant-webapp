/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateCardShareById = /* GraphQL */ `
  subscription OnCreateCardShareById($receivedByUser: String!) {
    onCreateCardShareById(receivedByUser: $receivedByUser) {
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
export const onCreateMenuShareById = /* GraphQL */ `
  subscription OnCreateMenuShareById($receivedByUser: String!) {
    onCreateMenuShareById(receivedByUser: $receivedByUser) {
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
export const onCreateNotificationByUserId = /* GraphQL */ `
  subscription OnCreateNotificationByUserId($userId: String) {
    onCreateNotificationByUserId(userId: $userId) {
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
export const onCreateUserInteractionByUserId = /* GraphQL */ `
  subscription OnCreateUserInteractionByUserId($referenceUserKey: String!) {
    onCreateUserInteractionByUserId(referenceUserKey: $referenceUserKey) {
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
export const onUpdateUserInteractionByUserId = /* GraphQL */ `
  subscription OnUpdateUserInteractionByUserId($referenceUserKey: String!) {
    onUpdateUserInteractionByUserId(referenceUserKey: $referenceUserKey) {
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
export const onCreateUserInvite = /* GraphQL */ `
  subscription OnCreateUserInvite {
    onCreateUserInvite {
      id
      phone
      email
      shareId
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateUserInvite = /* GraphQL */ `
  subscription OnUpdateUserInvite {
    onUpdateUserInvite {
      id
      phone
      email
      shareId
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteUserInvite = /* GraphQL */ `
  subscription OnDeleteUserInvite {
    onDeleteUserInvite {
      id
      phone
      email
      shareId
      createdAt
      updatedAt
    }
  }
`;
export const onCreateContent = /* GraphQL */ `
  subscription OnCreateContent($owner: String) {
    onCreateContent(owner: $owner) {
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
export const onUpdateContent = /* GraphQL */ `
  subscription OnUpdateContent($owner: String) {
    onUpdateContent(owner: $owner) {
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
export const onDeleteContent = /* GraphQL */ `
  subscription OnDeleteContent($owner: String) {
    onDeleteContent(owner: $owner) {
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
export const onCreateRestaurantUnapproved = /* GraphQL */ `
  subscription OnCreateRestaurantUnapproved {
    onCreateRestaurantUnapproved {
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
export const onUpdateRestaurantUnapproved = /* GraphQL */ `
  subscription OnUpdateRestaurantUnapproved {
    onUpdateRestaurantUnapproved {
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
export const onDeleteRestaurantUnapproved = /* GraphQL */ `
  subscription OnDeleteRestaurantUnapproved {
    onDeleteRestaurantUnapproved {
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
export const onCreateRestaurant = /* GraphQL */ `
  subscription OnCreateRestaurant($owner: String) {
    onCreateRestaurant(owner: $owner) {
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
export const onUpdateRestaurant = /* GraphQL */ `
  subscription OnUpdateRestaurant($owner: String) {
    onUpdateRestaurant(owner: $owner) {
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
export const onDeleteRestaurant = /* GraphQL */ `
  subscription OnDeleteRestaurant($owner: String) {
    onDeleteRestaurant(owner: $owner) {
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
export const onCreateRestaurantMenu = /* GraphQL */ `
  subscription OnCreateRestaurantMenu($owner: String) {
    onCreateRestaurantMenu(owner: $owner) {
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
export const onUpdateRestaurantMenu = /* GraphQL */ `
  subscription OnUpdateRestaurantMenu($owner: String) {
    onUpdateRestaurantMenu(owner: $owner) {
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
export const onDeleteRestaurantMenu = /* GraphQL */ `
  subscription OnDeleteRestaurantMenu($owner: String) {
    onDeleteRestaurantMenu(owner: $owner) {
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
export const onCreateCuisine = /* GraphQL */ `
  subscription OnCreateCuisine {
    onCreateCuisine {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateCuisine = /* GraphQL */ `
  subscription OnUpdateCuisine {
    onUpdateCuisine {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteCuisine = /* GraphQL */ `
  subscription OnDeleteCuisine {
    onDeleteCuisine {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateDelivery = /* GraphQL */ `
  subscription OnCreateDelivery {
    onCreateDelivery {
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
export const onUpdateDelivery = /* GraphQL */ `
  subscription OnUpdateDelivery {
    onUpdateDelivery {
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
export const onDeleteDelivery = /* GraphQL */ `
  subscription OnDeleteDelivery {
    onDeleteDelivery {
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
export const onCreateMood = /* GraphQL */ `
  subscription OnCreateMood {
    onCreateMood {
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
export const onUpdateMood = /* GraphQL */ `
  subscription OnUpdateMood {
    onUpdateMood {
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
export const onDeleteMood = /* GraphQL */ `
  subscription OnDeleteMood {
    onDeleteMood {
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
export const onCreateDiet = /* GraphQL */ `
  subscription OnCreateDiet {
    onCreateDiet {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateDiet = /* GraphQL */ `
  subscription OnUpdateDiet {
    onUpdateDiet {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteDiet = /* GraphQL */ `
  subscription OnDeleteDiet {
    onDeleteDiet {
      id
      name
      createdAt
      updatedAt
    }
  }
`;
export const onCreateNotification = /* GraphQL */ `
  subscription OnCreateNotification($owner: String) {
    onCreateNotification(owner: $owner) {
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
export const onUpdateNotification = /* GraphQL */ `
  subscription OnUpdateNotification($owner: String) {
    onUpdateNotification(owner: $owner) {
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
export const onDeleteNotification = /* GraphQL */ `
  subscription OnDeleteNotification($owner: String) {
    onDeleteNotification(owner: $owner) {
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
export const onCreateUserProfile = /* GraphQL */ `
  subscription OnCreateUserProfile($owner: String) {
    onCreateUserProfile(owner: $owner) {
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
export const onUpdateUserProfile = /* GraphQL */ `
  subscription OnUpdateUserProfile($owner: String) {
    onUpdateUserProfile(owner: $owner) {
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
export const onDeleteUserProfile = /* GraphQL */ `
  subscription OnDeleteUserProfile($owner: String) {
    onDeleteUserProfile(owner: $owner) {
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
export const onCreateFriendshipConnection = /* GraphQL */ `
  subscription OnCreateFriendshipConnection($owner: String) {
    onCreateFriendshipConnection(owner: $owner) {
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
export const onUpdateFriendshipConnection = /* GraphQL */ `
  subscription OnUpdateFriendshipConnection($owner: String) {
    onUpdateFriendshipConnection(owner: $owner) {
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
export const onDeleteFriendshipConnection = /* GraphQL */ `
  subscription OnDeleteFriendshipConnection($owner: String) {
    onDeleteFriendshipConnection(owner: $owner) {
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
export const onCreateFriendRequestsConnection = /* GraphQL */ `
  subscription OnCreateFriendRequestsConnection($owner: String) {
    onCreateFriendRequestsConnection(owner: $owner) {
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
export const onUpdateFriendRequestsConnection = /* GraphQL */ `
  subscription OnUpdateFriendRequestsConnection($owner: String) {
    onUpdateFriendRequestsConnection(owner: $owner) {
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
export const onDeleteFriendRequestsConnection = /* GraphQL */ `
  subscription OnDeleteFriendRequestsConnection($owner: String) {
    onDeleteFriendRequestsConnection(owner: $owner) {
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
export const onCreateSentFriendRequestsConnection = /* GraphQL */ `
  subscription OnCreateSentFriendRequestsConnection($owner: String) {
    onCreateSentFriendRequestsConnection(owner: $owner) {
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
export const onUpdateSentFriendRequestsConnection = /* GraphQL */ `
  subscription OnUpdateSentFriendRequestsConnection($owner: String) {
    onUpdateSentFriendRequestsConnection(owner: $owner) {
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
export const onDeleteSentFriendRequestsConnection = /* GraphQL */ `
  subscription OnDeleteSentFriendRequestsConnection($owner: String) {
    onDeleteSentFriendRequestsConnection(owner: $owner) {
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
export const onCreateAchievements = /* GraphQL */ `
  subscription OnCreateAchievements($owner: String) {
    onCreateAchievements(owner: $owner) {
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
export const onUpdateAchievements = /* GraphQL */ `
  subscription OnUpdateAchievements($owner: String) {
    onUpdateAchievements(owner: $owner) {
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
export const onDeleteAchievements = /* GraphQL */ `
  subscription OnDeleteAchievements($owner: String) {
    onDeleteAchievements(owner: $owner) {
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
export const onCreateBenchmark = /* GraphQL */ `
  subscription OnCreateBenchmark($owner: String) {
    onCreateBenchmark(owner: $owner) {
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
export const onUpdateBenchmark = /* GraphQL */ `
  subscription OnUpdateBenchmark($owner: String) {
    onUpdateBenchmark(owner: $owner) {
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
export const onDeleteBenchmark = /* GraphQL */ `
  subscription OnDeleteBenchmark($owner: String) {
    onDeleteBenchmark(owner: $owner) {
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
export const onCreateRewardButton = /* GraphQL */ `
  subscription OnCreateRewardButton {
    onCreateRewardButton {
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
export const onUpdateRewardButton = /* GraphQL */ `
  subscription OnUpdateRewardButton {
    onUpdateRewardButton {
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
export const onDeleteRewardButton = /* GraphQL */ `
  subscription OnDeleteRewardButton {
    onDeleteRewardButton {
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
export const onCreateUnapprovedItem = /* GraphQL */ `
  subscription OnCreateUnapprovedItem {
    onCreateUnapprovedItem {
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
export const onUpdateUnapprovedItem = /* GraphQL */ `
  subscription OnUpdateUnapprovedItem {
    onUpdateUnapprovedItem {
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
export const onDeleteUnapprovedItem = /* GraphQL */ `
  subscription OnDeleteUnapprovedItem {
    onDeleteUnapprovedItem {
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
export const onCreateCardPoint = /* GraphQL */ `
  subscription OnCreateCardPoint($owner: String) {
    onCreateCardPoint(owner: $owner) {
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
export const onUpdateCardPoint = /* GraphQL */ `
  subscription OnUpdateCardPoint($owner: String) {
    onUpdateCardPoint(owner: $owner) {
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
export const onDeleteCardPoint = /* GraphQL */ `
  subscription OnDeleteCardPoint($owner: String) {
    onDeleteCardPoint(owner: $owner) {
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
export const onCreateRating = /* GraphQL */ `
  subscription OnCreateRating {
    onCreateRating {
      id
      CardID
      UserID
      score
      createdAt
      updatedAt
    }
  }
`;
export const onUpdateRating = /* GraphQL */ `
  subscription OnUpdateRating {
    onUpdateRating {
      id
      CardID
      UserID
      score
      createdAt
      updatedAt
    }
  }
`;
export const onDeleteRating = /* GraphQL */ `
  subscription OnDeleteRating {
    onDeleteRating {
      id
      CardID
      UserID
      score
      createdAt
      updatedAt
    }
  }
`;
export const onCreateTrending = /* GraphQL */ `
  subscription OnCreateTrending($owner: String) {
    onCreateTrending(owner: $owner) {
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
export const onUpdateTrending = /* GraphQL */ `
  subscription OnUpdateTrending($owner: String) {
    onUpdateTrending(owner: $owner) {
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
export const onDeleteTrending = /* GraphQL */ `
  subscription OnDeleteTrending($owner: String) {
    onDeleteTrending(owner: $owner) {
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
export const onCreateEmojiModel = /* GraphQL */ `
  subscription OnCreateEmojiModel($owner: String) {
    onCreateEmojiModel(owner: $owner) {
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
export const onUpdateEmojiModel = /* GraphQL */ `
  subscription OnUpdateEmojiModel($owner: String) {
    onUpdateEmojiModel(owner: $owner) {
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
export const onDeleteEmojiModel = /* GraphQL */ `
  subscription OnDeleteEmojiModel($owner: String) {
    onDeleteEmojiModel(owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment($owner: String) {
    onCreateComment(owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment($owner: String) {
    onUpdateComment(owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment($owner: String) {
    onDeleteComment(owner: $owner) {
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
export const onCreateTextComment = /* GraphQL */ `
  subscription OnCreateTextComment($owner: String) {
    onCreateTextComment(owner: $owner) {
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
export const onUpdateTextComment = /* GraphQL */ `
  subscription OnUpdateTextComment($owner: String) {
    onUpdateTextComment(owner: $owner) {
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
export const onDeleteTextComment = /* GraphQL */ `
  subscription OnDeleteTextComment($owner: String) {
    onDeleteTextComment(owner: $owner) {
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
export const onCreateUserInteraction = /* GraphQL */ `
  subscription OnCreateUserInteraction($owner: String) {
    onCreateUserInteraction(owner: $owner) {
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
export const onUpdateUserInteraction = /* GraphQL */ `
  subscription OnUpdateUserInteraction($owner: String) {
    onUpdateUserInteraction(owner: $owner) {
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
export const onDeleteUserInteraction = /* GraphQL */ `
  subscription OnDeleteUserInteraction($owner: String) {
    onDeleteUserInteraction(owner: $owner) {
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
export const onCreateUserMood = /* GraphQL */ `
  subscription OnCreateUserMood($owner: String) {
    onCreateUserMood(owner: $owner) {
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
export const onUpdateUserMood = /* GraphQL */ `
  subscription OnUpdateUserMood($owner: String) {
    onUpdateUserMood(owner: $owner) {
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
export const onDeleteUserMood = /* GraphQL */ `
  subscription OnDeleteUserMood($owner: String) {
    onDeleteUserMood(owner: $owner) {
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
export const onCreateCardShare = /* GraphQL */ `
  subscription OnCreateCardShare {
    onCreateCardShare {
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
export const onUpdateCardShare = /* GraphQL */ `
  subscription OnUpdateCardShare {
    onUpdateCardShare {
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
export const onDeleteCardShare = /* GraphQL */ `
  subscription OnDeleteCardShare {
    onDeleteCardShare {
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
export const onCreateMenuShare = /* GraphQL */ `
  subscription OnCreateMenuShare {
    onCreateMenuShare {
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
export const onUpdateMenuShare = /* GraphQL */ `
  subscription OnUpdateMenuShare {
    onUpdateMenuShare {
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
export const onDeleteMenuShare = /* GraphQL */ `
  subscription OnDeleteMenuShare {
    onDeleteMenuShare {
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
export const onCreateRewardModel = /* GraphQL */ `
  subscription OnCreateRewardModel($owner: String) {
    onCreateRewardModel(owner: $owner) {
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
export const onUpdateRewardModel = /* GraphQL */ `
  subscription OnUpdateRewardModel($owner: String) {
    onUpdateRewardModel(owner: $owner) {
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
export const onDeleteRewardModel = /* GraphQL */ `
  subscription OnDeleteRewardModel($owner: String) {
    onDeleteRewardModel(owner: $owner) {
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
