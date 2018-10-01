/* eslint no-unused-vars: ["error", { "argsIgnorePattern": "^_" }] */

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

  describe('#createSession', () => {
    it('creates a session and returns session info', (done) => {
      mockBitGoSession(false, sessionInfoData);
      sessionService = SessionService('accessToken');

      sessionService.createSession().then(session => {
        expect(session).toBeDefined();
        expect(session.info).toBe(sessionInfoData);
        done();
      });
    });

    it('fails if unauthorized (wrong api token)', (done) => {
      mockFailBitGoSession();
      sessionService = SessionService('wrong-accessToken');

      sessionService.createSession().then().catch(response => {
        expect(response.result.error).toBe('unauthorized');
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

  const mockFailBitGoSession = () => {
    var fakeSession = jest.fn(
      (_error) => Promise.reject({
        result: {
          error: 'unauthorized'
        }
      })
    );
    var fakeBitGo = jest.fn(() => {
      return { session: fakeSession };
    });
    bitgo.BitGo = fakeBitGo;
  };
});
