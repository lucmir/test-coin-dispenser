const WalletService = (session) => {
  const OTP = '0000000';
  const DEFAULT_COIN = 'tbtc';

  const getWalletInfo = (walletId, walletCoin = DEFAULT_COIN) => {
    return new Promise((resolve, reject) => {
      _getWallet(walletId, walletCoin).then(wallet => {
        resolve(wallet._wallet);
      }).catch(err => reject(err));
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
        _unlock(session).then(() => {
          wallet.send(params).then(transaction => {
            _lock(session).then(() => {
              resolve(transaction);
            }).catch(
              err => reject(err)
            );
          }).catch(
            err => reject(err)
          );
        }).catch(
          err => reject(err)
        );
      }).catch(
        err => reject(err)
      );
    });
  };

  const _getWallet = (walletId, walletCoin = DEFAULT_COIN) => {
    var wallets = session.coin(walletCoin).wallets();
    return new Promise((resolve, reject) => {
      wallets.get({ id: walletId }).then(wallet => {
        resolve(wallet);
      }).catch(err => reject(err));
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
