const BitGoJS = require('bitgo');

const SessionService = (accessToken) => {

  var bitgo = new BitGoJS.BitGo({
    env: 'test',
    accessToken: accessToken
  });

  const createSession = () => {
    return new Promise((resolve, reject) => {
      bitgo.session({}, (err, sessionInfo) => {
        if (err) {
          reject();
        }
        bitgo.info = sessionInfo;
        resolve(bitgo);
      });
    });
  };

  return {
    createSession,
  };
};

module.exports = SessionService;
