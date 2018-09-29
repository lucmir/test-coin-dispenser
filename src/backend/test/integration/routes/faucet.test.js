var request = require('supertest');
var app = require('../../../app');

describe('FaucetRoute', () => {
  let faucetWalletId = process.env.FAUCET_WALLET_ID;

  beforeAll(() => {
    jest.setTimeout(20000); // 20s
  });

  describe('GET /faucet', () => {
    it('returns status 200 (OK)', (done) => {
      request(app).get('/info')
        .expect(200, done);
    });

    it('returns response with faucet wallet info', (done) => {
      request(app).get('/info').end((err, res) => {
        var walletInfo = res.body;
        expect(walletInfo).toBeDefined();
        expect(walletInfo.id).toBe(faucetWalletId);
        expect(walletInfo.balance).toBeDefined();
        done();
      });
    });
  });

});
