const google = require('googleapis').google;
const MESSAGING_SCOPE = 'https://www.googleapis.com/auth/firebase.messaging';
const SCOPES = [MESSAGING_SCOPE]

const getAccessToken = () => new Promise((resolve, reject) => {
  const key = require('../firebase-key.json');
  const jwtClient = new google.auth.JWT(
    key.client_email,
    null,
    key.private_key,
    SCOPES,
    null
  );

  jwtClient.authorize((err, tokens) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(tokens.access_token);
  });
});

module.exports = getAccessToken;
