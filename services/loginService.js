const AmazonCognitoIdentity = require('amazon-cognito-identity-js');
const poolData = {
    UserPoolId: process.env.USER_POOL_ID,
    ClientId: process.env.CLIENT_ID
};
const pool_region = process.env.POOL_REGION;
const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
const login = async (body, callback) => {
    let authenticationDetails = new AmazonCognitoIdentity.AuthenticationDetails({
        Username: body.username,
        Password: body.password
    });
    let userData = {
        Username: body.username,
        Pool: userPool
    }
    let cognitoUser = new AmazonCognitoIdentity.CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
            var accesstoken = result.getAccessToken().getJwtToken();
            callback(null, accesstoken);
        },
        onFailure: (function (err) {
            callback(err);
        })
    })
};
module.exports = {
    login
}