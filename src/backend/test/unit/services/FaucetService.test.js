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

  describe('#getFaucetWalletInfo', () => {
    it('returns a faucet wallet info', (done) => {
      faucetService = FaucetService(mockSessionService(), mockWalletService());
      faucetService.getFaucetWalletInfo().then(walletInfo => {
        expect(walletInfo).toEqual(walletData);
        done();
      });
    });
  });

  describe('#transfer', () => {
    it('sends transfer request and get transfer info', (done) => {
      faucetService = FaucetService(mockSessionService(), mockWalletService());
      faucetService.transfer('to-address', 10000).then(transferInfo => {
        expect(transferInfo.txid).toBe('id');
        expect(transferInfo.tx).toBe('a-big-hash');
        done();
      });
    });

    it('fails when address is wrong', (done) => {
      faucetService = FaucetService(mockSessionService(), mockWalletService(false));
      faucetService.transfer('to-address', 10000).then().catch(response => {
        expect(response).toBeDefined();
        expect(response.result.error).toBe('invalid address');
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

  const mockWalletService = (success = true) => {
    return () => {
      return  {
        getWalletInfo: (_walletId) => Promise.resolve({
          id: walletData.id,
          balance: walletData.balance,
          otherAttribute: 'other'
        }),
        send: mockSend(success)
      };
    };
  };

  const mockSend = (success) => {
    var fakeSend = null;
    if(success) {
      fakeSend = (_walletId, _toAddress, _amount, _passphrase) => Promise.resolve( 
        transferData
      );
    } else {
      fakeSend = (_address, _amount, _passphrase) => Promise.reject({
        result: {
          error: 'invalid address'
        }
      });
    }
    return fakeSend;
  };
});
