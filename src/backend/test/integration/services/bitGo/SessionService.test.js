var SessionService = require('../../../../services/bitGo/SessionService');

describe('SessionService', () => {
  beforeAll(() => {
    jest.setTimeout(20000); // 20s
  });

  describe('#createSession', () => {
    it('creates an valid session and returns session info', (done) => {
      let accessToken = process.env.BITGO_ACCESS_TOKEN;
      let sessionService = SessionService(accessToken);

      sessionService.createSession().then(session => {
        expect(session).toBeDefined();
        expect(session.info).toBeDefined();
        expect(session.info.client).toBe('bitgo');
        done();
      }).catch();
    });

    it('rejects if an invalid access token', (done) => {
      let accessToken = 'invalid access token';
      let sessionService = SessionService(accessToken);

      sessionService.createSession().then().catch(response => {
        expect(response.result.error).toBe('unauthorized');
        done();
      });
    });
  });
});
