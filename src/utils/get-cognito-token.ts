import * as AmazonCognitoIdentity from 'amazon-cognito-identity-js';
import {
  callbackify,
} from 'util';

type GetCognitoTokenReq = {
  userPoolId: string;
  clientId: string;
  userName: string;
  password: string;
};

const getCognitoToken = async (getCognitoTokenReq: GetCognitoTokenReq): Promise<string> => {
  const {
    userPoolId,
    clientId,
    userName,
    password,
  } = getCognitoTokenReq;
  const userPool = new AmazonCognitoIdentity.CognitoUserPool({
    UserPoolId: userPoolId,
    ClientId: clientId,
  });
  const cognitoUser = new AmazonCognitoIdentity.CognitoUser({
    Username: userName,
    Pool: userPool,
  });
  const authDetails = new AmazonCognitoIdentity.AuthenticationDetails({
    Username: userName,
    Password: password,
  });
  const token = new Promise<string>((resolve) => {
    cognitoUser.authenticateUser(authDetails, {
      onSuccess: async (res) => {
        const refreshTokens = res.getAccessToken().getJwtToken();
        if (refreshTokens === null) {
          const tokens = res.getRefreshToken();
          cognitoUser.refreshSession(tokens, callbackify);
        }
        resolve(refreshTokens);
      },
      onFailure(err: Error) {
        resolve(err.message);
      },
    });
  });
  return token;
};

export default getCognitoToken;
