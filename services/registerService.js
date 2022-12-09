const { SignUpCommand, CognitoIdentityProviderClient } = require("@aws-sdk/client-cognito-identity-provider");
const { curry, defaultTo } = require("ramda");

const orDefaultRegion = defaultTo(process.env.POOL_REGION);

const createClientForRegion = curry(
    (region, ClientConstructor) =>
        new ClientConstructor({ region: orDefaultRegion(region) })
);

const createClientForDefaultRegion = createClientForRegion(null);
const register = async ({ username, password, email }) => {
    try {
        const client = createClientForDefaultRegion(CognitoIdentityProviderClient);
        let dateTime = Date.now().toString();
        const command = new SignUpCommand({
            ClientId: process.env.CLIENT_ID,
            Username: username,
            Password: password,
            UserAttributes: [
                { Name: "email", Value: email },
                { Name: "address", Value: "dhaka" },
                { Name: "custom:CompanyName", Value: "Test" },
                { Name: "custom:MCDOT", Value: "1234567" },
                { Name: "updated_at", Value: dateTime }
            ],
        });
        let res = await client.send(command);
        return res;
    } catch (error) {
        return { err: error }
    }
};
module.exports ={
    register
}