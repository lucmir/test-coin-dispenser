var FaucetService = require('../../../services/FaucetService');

describe('FaucetService', () => {
  let faucetWalletId = process.env.FAUCET_WALLET_ID;
  let testWalletAddress = process.env.TEST_WALLET_ADDRESS;
  let faucetService = FaucetService();

  beforeAll(() => {
    jest.setTimeout(30000); // 30s
  });

  describe('#getFaucetWalletInfo', () => {
    it('gets wallet info', (done) => {
      faucetService.getFaucetWalletInfo().then(walletInfo => {
        expect(walletInfo.id).toBe(faucetWalletId);
        done();
      }).catch();
    });
  });

  describe('#send', () => {
    it('transfers and returns transfer info', (done) => {
      let littleAmount = 10000;
      faucetService.transfer(testWalletAddress, littleAmount).then(
        transferInfo => {
          expect(transferInfo).toBeDefined();
          expect(transferInfo.txid).toBeDefined();
          expect(transferInfo.status).toBe('signed');
          done();
        }).catch();
    });

    it('fails if address is wrong', (done) => {
      let littleAmount = 10000;
      faucetService.transfer('wrong-address', littleAmount)
        .then().catch(response => {
          expect(response.result.error).toBe('invalid address');
          done();
      });
    });
  });
});
