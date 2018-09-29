var WalletService = require('../../../../services/bitGo/WalletService');
var SessionService = require('../../../../services/bitGo/SessionService');

describe('WalletService', () => {
  let accessToken = process.env.BITGO_ACCESS_TOKEN;
  let testWalletId = process.env.TEST_WALLET_ID;

  let sessionService = SessionService(accessToken);

  beforeAll(() => {
    jest.setTimeout(20000); // 20s
  });

  describe('#getWalletInfo', () => {
    it('returns wallet information', (done) => {
      sessionService.createSession().then(session => {
        WalletService(session).getWalletInfo(testWalletId)
          .then(walletInfo => {
            expect(walletInfo).toBeDefined();
            expect(walletInfo.id).toBe(testWalletId);
            done();
        }).catch();
      });
    });
  });
});
