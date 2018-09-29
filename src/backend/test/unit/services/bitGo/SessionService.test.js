let bitgo = require('bitgo');
let SessionService = require('../../../../services/bitGo/SessionService');

describe('SessionService', () => {
  var sessionService;
  var sessionInfoData = {
    id: 'id',
    client: 'bitgo',
    expires: '2030-09-29T02:21:05.320Z',
    origin: 'test.bitgo.com'
  };

  beforeEach(() => {
    mockBitGoSession(false, sessionInfoData);
    sessionService = SessionService('accessToken');
  });

  describe('#createSession', () => {
    it('creates a session and returns session info', (done) => {
      sessionService.createSession().then(session => {
        expect(session).toBeDefined();
        expect(session.info).toBe(sessionInfoData);
        done();
      });
    });
  });

  const mockBitGoSession = (success, sessionData) => {
    var fakeSession = jest.fn().mockImplementation(
      (obj, cb) => { return cb(success, sessionData); }
    );
    var fakeBitGo = jest.fn(() => {
      return { session: fakeSession };
    });
    bitgo.BitGo = fakeBitGo;
  };
});
