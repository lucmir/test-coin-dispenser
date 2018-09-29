const FaucetService = (
  SessionService = require('./bitGo/SessionService'),
  WalletService = require('./bitGo/WalletService')) => {

  let accessToken = process.env.BITGO_ACCESS_TOKEN;
  let faucetWalletId = process.env.FAUCET_WALLET_ID;
  let faucetWalletPassPhrase = process.env.FAUCET_WALLET_PASSPHRASE;

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

  const transfer = (toAddress, amount) => {
    var params =[
      faucetWalletId,
      toAddress,
      amount,
      faucetWalletPassPhrase
    ];
    return new Promise((resolve, reject) => {
      SessionService(accessToken).createSession().then(session => {
        WalletService(session).send(...params)
          .then(transferInfo => {
            resolve(transferInfo);
          });
      });
    });
  };

  return {
    getFaucetWalletInfo,
    transfer
  };
};

module.exports = FaucetService;
