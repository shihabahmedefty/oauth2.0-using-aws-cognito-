const { SignUpCommand, CognitoIdentityProviderClient } = require("@aws-sdk/client-cognito-identity-provider");
const { curry, defaultTo } = require("ramda");

const orDefaultRegion = defaultTo(process.env.POOL_REGION);

const createClientForRegion = curry(
    (region, ClientConstructor) =>
        new ClientConstructor({ region: orDefaultRegion(region) })
);

const createClientForDefaultRegion = createClientForRegion(null);
const register = async (user) => {
    try {
        const client = createClientForDefaultRegion(CognitoIdentityProviderClient);
        const command = new SignUpCommand({
            ClientId: process.env.CLIENT_ID,
            Username: user.username,
            Password: user.password,
            UserAttributes: [
                { Name: "email", Value: user.email },
                { Name: "address", Value: user.address },
                { Name: "custom:CompanyName", Value: user.companyName },
                { Name: "custom:MCDOT", Value: user.mc },
                { Name: "updated_at", Value: Date.now().toString() }
            ],
        });
        let res = await client.send(command);
        return res;
    } catch (error) {
        return { err: error }
    }
};
module.exports = {
    register
}