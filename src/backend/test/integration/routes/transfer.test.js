var request = require('supertest');
var app = require('../../../app');

describe('TransferRoute', () => {
  let testWalletAddress = process.env.TEST_WALLET_ADDRESS;

  beforeAll(() => {
    jest.setTimeout(30000); // 30s
  });

  describe('POST /transfer', () => {
    let requestData = {
      address: testWalletAddress
    };

    it('returns status 201 (CREATED) and content type json', (done) => {
      request(app).get('/')
        .expect('Content-Type', /json/)
        .expect(201, done);
    });

    it('returns response with faucet wallet info', (done) => {
      request(app)
        .post('/transfer')
        .send(requestData).end((err, res) => {
          var transferInfo = res.body;
          expect(transferInfo).toBeDefined();
          expect(transferInfo.id).toBeDefined();
          expect(transferInfo.status).toBe('signed');
          done();
        });
    });
  });
});
