/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */

let WalletService = require('../../../../services/bitGo/WalletService');

describe('WalletService', () => {
  var walletService;
  var testWalletId = Math.random();

  beforeEach(() => {
    var sessionMock = mockSession(testWalletId);
    walletService = WalletService(sessionMock);
  });

  describe('#getWalletInfo', () => {
    it('returns a wallet information', (done) => {
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
      walletService.send(testWalletId, 'address', 0.1, '').then(
        transfer => {
          expect(transfer).toBeDefined();
          expect(transfer.id).toBe('transfer-id');
          done();
        });
    });
  });

  const mockSession = (walletId) => {
    return {
      coin: jest.fn(() => {
        return { wallets: mockWallets(walletId) };
      }),
      unlock: () => Promise.resolve({}),
      lock: () => Promise.resolve({})
    };
  };

  const mockWallets = (walletId) => {
    var walletData = {
      _wallet: {
        id: walletId
      },
      send: mockSend()
    };
    return jest.fn(() => {
      return {
        get: (_walletId) => Promise.resolve(walletData)
      };
    });
  };

  const mockSend = () => {
    return jest.fn(
      (_address, _amount, _passphrase) => Promise.resolve({
        id: 'transfer-id',
        address: _address
      })
    );
  };
});
