var WalletService = require('../../../../services/bitGo/WalletService');
var SessionService = require('../../../../services/bitGo/SessionService');

describe('WalletService', () => {
  let accessToken = process.env.BITGO_ACCESS_TOKEN;
  let testWalletId = process.env.TEST_WALLET_ID;
  let testWalletAddress = process.env.TEST_WALLET_ADDRESS;
  let faucetWalletId = process.env.FAUCET_WALLET_ID;
  let faucetWalletPassphrase = process.env.FAUCET_WALLET_PASSPHRASE;

  let sessionService = SessionService(accessToken);

  beforeAll(() => {
    jest.setTimeout(30000); // 30s
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

  describe('#send', () => {
    it('sends cash and returns transfer info', (done) => {
      let amount = 10000;
      params = [
        faucetWalletId,
        testWalletAddress,
        amount,
        faucetWalletPassphrase
      ];
      sessionService.createSession().then(session => {
        WalletService(session).send(...params).then(transfer => {
          expect(transfer).toBeDefined();
          expect(transfer.txid).toBeDefined();
          expect(transfer.status).toBe('signed');
          done();
        }).catch();
      });
    });
  });
});
