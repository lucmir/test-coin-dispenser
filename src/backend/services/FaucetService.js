const FaucetService = (
  SessionService = require('./bitGo/SessionService'),
  WalletService = require('./bitGo/WalletService')) => {

  let accessToken = process.env.BITGO_ACCESS_TOKEN;
  let faucetWalletId = process.env.FAUCET_WALLET_ID;

  const getFaucetWalletInfo = () => {
    return new Promise((resolve, reject) => {
      SessionService(accessToken).createSession().then(session => {
        WalletService(session).getWalletInfo(faucetWalletId)
          .then(walletInfo => {
            resolve({
              id: walletInfo.id,
              balance: walletInfo.balance
            });
          });
      });
    });
  };

  return {
    getFaucetWalletInfo
  };
};

module.exports = FaucetService;
