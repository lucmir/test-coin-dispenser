var SessionService = require('../../../../services/bitGo/SessionService');

describe('SessionService', () => {
  let accessToken = process.env.BITGO_ACCESS_TOKEN;
  let sessionService = SessionService(accessToken);

  beforeAll(() => {
    jest.setTimeout(20000); // 20s
  });

  describe('#createSession', () => {
    it('creates an valid session and returns session info', (done) => {
      sessionService.createSession().then(session => {
        expect(session).toBeDefined();
        expect(session.info).toBeDefined();
        expect(session.info.client).toBe('bitgo');
        done();
      }).catch();
    });
  });
});
