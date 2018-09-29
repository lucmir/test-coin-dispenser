/*eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }]*/

let FaucetService = require('../../../services/FaucetService');

describe('FaucetService', () => {
  var faucetService;

  var walletData = {
    id: 'wallet-id',
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
        createSession: (_token) => Promise.resolve({})
      };
    };
  };

  const mockWalletService = () => {
    return () => {
      return  {
        getWalletInfo: (_walletId) => Promise.resolve({
          id: walletData.id,
          balance: walletData.balance,
          otherAttribute: 'other'
        }),
        send: (_walletId, _toAddress, _amount, _passphrase) => Promise.resolve( 
          transferData
        )
      };
    };
  };
});
