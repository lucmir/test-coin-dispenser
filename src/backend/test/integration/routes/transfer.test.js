var request = require('supertest');
var app = require('../../../app');

describe('TransferRoute', () => {
  let testWalletAddress = process.env.TEST_WALLET_ADDRESS;

  beforeAll(() => {
    jest.setTimeout(30000); // 30s
  });

  describe('POST /transfer', () => {
    it('returns 201 response with faucet wallet info', (done) => {
      let requestData = {
        address: testWalletAddress
      };
      request(app)
        .post('/transfer')
        .send(requestData).end((err, res) => {
          var transferInfo = res.body;
          expect(transferInfo).toBeDefined();
          expect(transferInfo.id).toBeDefined();
          expect(transferInfo.amount).toBeDefined();
          expect(transferInfo.status).toBe('signed');
          expect(res.status).toBe(201);
          done();
        });
    });

    it('returns 400 (Bad request) with error msg if address is wrong', (done) => {
      let requestData = {
        address: 'wrong-address'
      };
      request(app)
        .post('/transfer')
        .send(requestData).end((err, res) => {
          var body = res.body;
          expect(body).toBeDefined();
          expect(body.error).toBe('invalid address');
          expect(res.status).toBe(400);
          done();
        });
    });
  });
});
