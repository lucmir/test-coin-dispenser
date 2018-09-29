let SessionService = require('../../../../services/bitGo/SessionService');
let bitgo = require('bitgo');

describe('SessionService', () => {
  var sessionInfoData = {
    id: 'id',
    client: 'bitgo',
    expires: '2028-09-23T02:25:05.380Z',
    origin: 'test.bitgo.com'
  };

  var sessionService;
  beforeEach(() => {
    mockBitGoSession(false, sessionInfoData);
    sessionService = SessionService('accessToken');
  });

  describe('#createSession', () => {
    it('returns a valid session', (done) => {
      sessionService.createSession().then(session => {
        expect(session).toBeDefined();
        expect(session.info).toBe(sessionInfoData);
        done();
      });
    });
  });

  const mockBitGoSession = (success, sessionData) => {
    var fakeSession = jest.fn().mockImplementation(
      ({}, cb) => { return cb(success, sessionData); }
    );
    var fakeBitGo = jest.fn(() => {
      return { session: fakeSession };
    });
    bitgo.BitGo = fakeBitGo;
  };
});
