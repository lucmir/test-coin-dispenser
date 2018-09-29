var BitGoJS = require('bitgo');

const WalletService = (session) => {

  const getWalletInfo = (walletId, walletCoin = 'tbtc') => {
    return new Promise((resolve, reject) => {
      _getWallet(walletId, walletCoin).then(wallet => {
        resolve(wallet._wallet);
      });
    });
  };

  const _getWallet = (walletId, walletCoin) => {
    var wallets = session.coin(walletCoin).wallets();
    return new Promise((resolve, reject) => {
      wallets.get({ id: walletId }).then(wallet => {
        resolve(wallet);
      });
    });
  };

  return {
    getWalletInfo
  };
};

module.exports = WalletService;
