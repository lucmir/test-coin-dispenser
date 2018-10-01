/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */

let WalletService = require('../../../../services/bitGo/WalletService');

describe('WalletService', () => {
  var testWalletId = Math.random();

  describe('#getWalletInfo', () => {
    it('returns a wallet information', (done) => {
      var sessionMock = mockSession(testWalletId);
      var walletService = WalletService(sessionMock);

      walletService.getWalletInfo(testWalletId).then(
        walletInfo => {
          expect(walletInfo).toBeDefined();
          expect(walletInfo.id).toBe(testWalletId);
          done();
        });
    });
  });

  describe('#send', () => {
    it('sends cash to an address and returns transfer info', (done) => {
      var sessionMock = mockSession(testWalletId);
      var walletService = WalletService(sessionMock);

      walletService.send(testWalletId, 'address', 0.1, '').then(
        transfer => {
          expect(transfer).toBeDefined();
          expect(transfer.id).toBe('transfer-id');
          done();
        });
    });

    it('rejects when the address parameter is wrong', (done) => {
      var sessionMock = mockSession(testWalletId, false);
      var walletService = WalletService(sessionMock);

      walletService.send(testWalletId, 'wrong-address', 0.1, '')
        .then((response) => {
          done();
        })
        .catch(response => {
          expect(response).toBeDefined();
          expect(response.result.error).toBe('invalid address');
          done();
        }
      );
    });
  });

  const mockSession = (walletId, success = true) => {
    return {
      coin: jest.fn(() => {
        return { wallets: mockWallets(walletId, success) };
      }),
      unlock: () => Promise.resolve({}),
      lock: () => Promise.resolve({})
    };
  };

  const mockWallets = (walletId, success) => {
    var walletData = {
      _wallet: {
        id: walletId
      },
      send: mockSend(success)
    };
    return jest.fn(() => {
      return {
        get: (_walletId) => Promise.resolve(walletData)
      };
    });
  };

  const mockSend = (success) => {
    var fakeSend = null;
    if(success) {
      fakeSend = jest.fn(
        (_address, _amount, _passphrase) => Promise.resolve({
          id: 'transfer-id',
          address: _address
        })
      );
    } else {
      fakeSend = jest.fn(
        (_address, _amount, _passphrase) => Promise.reject({
          result: {
            error: 'invalid address'
          }
        })
      );
    }
    return fakeSend;
  };
});
