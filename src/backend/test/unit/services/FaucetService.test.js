let FaucetService = require('../../../services/FaucetService');
let SessionService = require('../../../services/bitGo/SessionService');
let WalletService = require('../../../services/bitGo/WalletService');

describe('FaucetService', () => {
  var faucetService;

  var walletData = {
    id: "wallet-id",
    balance: 1
  };

  var transferData = {
    txid: 'id',
    tx: 'a-big-hash',
    status: 'signed'
  };

  beforeAll(() => {
    faucetService = FaucetService(mockSessionService(), mockWalletService());
  });

  describe('#getFaucetWalletInfo', () => {
    it('returns a faucet wallet info', (done) => {
      faucetService.getFaucetWalletInfo().then(walletInfo => {
        expect(walletInfo).toEqual(walletData);
        done();
      });
    });
  });

  const mockSessionService = () => {
    return () => {
      return  {
        createSession: (token) => Promise.resolve({})
      };
    };
  };

  const mockWalletService = () => {
    return () => {
      return  {
        getWalletInfo: (walletId) => Promise.resolve({
          id: walletData.id,
          balance: walletData.balance,
          otherAttribute: "other"
        }),
        send: (walletId, toAddress, amount, passphrase) => Promise.resolve(
          transferData
        )
      };
    };
  };
});
