let bitgo = require('bitgo');
let WalletService = require('../../../../services/bitGo/WalletService');

describe('WalletService', () => {
  var walletService;
  var testWalletId = Math.random();

  beforeEach(() => {
    sessionMock = mockSession(testWalletId);
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

  const mockSession = (walletId) => {
    return {
      coin: jest.fn(() => {
        return { wallets: mockWallets(walletId) };
      })
    };
  };

  const mockWallets = (walletId) => {
    var walletData = {
      _wallet: {
        id: walletId
      }
    };
    return jest.fn(() => {
      return {
        get: (walletId) => Promise.resolve(walletData)
      };
    });
  };
});
