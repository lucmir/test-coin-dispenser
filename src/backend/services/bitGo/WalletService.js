var BitGoJS = require('bitgo');

const WalletService = (session) => {
  const OTP = '0000000';
  const DEFAULT_COIN = 'tbtc';

  const getWalletInfo = (walletId, walletCoin = DEFAULT_COIN) => {
    return new Promise((resolve, reject) => {
      _getWallet(walletId, walletCoin).then(wallet => {
        resolve(wallet._wallet);
      });
    });
  };

  const send = (fromWalletId, toAddress, amount, walletPassphrase) => {
    let params = {
      amount: amount,
      address: toAddress,
      walletPassphrase: walletPassphrase
    };
    return new Promise((resolve, reject) => {
      _getWallet(fromWalletId).then(wallet => {
        _unlock(session).then(response => {
          wallet.send(params).then(transaction => {
            _lock(session).then(response => {
              resolve(transaction);
            });
          });
        });
      });
    });
  };

  const _getWallet = (walletId, walletCoin = DEFAULT_COIN) => {
    var wallets = session.coin(walletCoin).wallets();
    return new Promise((resolve, reject) => {
      wallets.get({ id: walletId }).then(wallet => {
        resolve(wallet);
      });
    });
  };

  const _unlock = (session) => {
    return session.unlock({ otp: OTP });
  };

  const _lock = (session) => {
    return session.lock({ otp: OTP });
  };

  return {
    getWalletInfo,
    send
  };
};

module.exports = WalletService;
