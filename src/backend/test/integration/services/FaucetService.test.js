var FaucetService = require('../../../services/FaucetService');

describe('FaucetService', () => {
  let faucetWalletId = process.env.FAUCET_WALLET_ID;
  let faucetService = FaucetService();

  beforeAll(() => {
    jest.setTimeout(20000); // 20s
  });

  describe('#getFaucetWalletInfo', () => {
    it('gets wallet info', (done) => {
      faucetService.getFaucetWalletInfo().then(walletInfo => {
        expect(walletInfo.id).toBe(faucetWalletId);
        done();
      }).catch();
    });
  });
});
