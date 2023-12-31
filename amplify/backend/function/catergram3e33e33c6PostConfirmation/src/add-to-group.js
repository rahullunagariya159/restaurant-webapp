const aws = require('aws-sdk');

const cognitoidentityserviceprovider = new aws.CognitoIdentityServiceProvider({
  apiVersion: '2016-04-18',
});

/**
 * @type {import('@types/aws-lambda').PostConfirmationTriggerHandler}
 */
exports.handler = async event => {
  if(event.request.userAttributes["profile"]) {
  const groupParams = {
    GroupName: event.request.userAttributes["profile"],
    UserPoolId: event.userPoolId,
  };
  const addUserParams = {
    GroupName: event.request.userAttributes["profile"],
    UserPoolId: event.userPoolId,
    Username: event.userName,
  };
  /**
   * Check if the group exists; if it doesn't, create it.
   */
  try {
    await cognitoidentityserviceprovider.getGroup(groupParams).promise();
  } catch (e) {
    await cognitoidentityserviceprovider.createGroup(groupParams).promise();
  }
  /**
   * Then, add the user to the group.
   */
  await cognitoidentityserviceprovider.adminAddUserToGroup(addUserParams).promise();
}
  return event;
};
