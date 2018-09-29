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

  describe('#send', () => {
    it('sends cash to an address and returns transfer info', (done) => {
      walletService.send(testWalletId, "address", 0.1, "").then(
        transfer => {
          expect(transfer).toBeDefined();
          expect(transfer.id).toBe("transfer-id");
          done();
        });
    });
  });

  const mockSession = (walletId) => {
    return {
      coin: jest.fn(() => {
        return { wallets: mockWallets(walletId) };
      }),
      unlock: (session) => Promise.resolve({}),
      lock: (session) => Promise.resolve({})
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
        get: (walletId) => Promise.resolve(walletData)
      };
    });
  };

  const mockSend = () => {
    return jest.fn(
      (address, amount, p) => Promise.resolve({
        id: "transfer-id",
        address: address
      })
    );
  };
});
