import mockAxios from "axios";
import CoinDispenserClient from './CoinDispenserClient';

describe('CoinDispenserClient', () => {
  describe('#transfer', () => {
    const transferData = {
      id: "transfer-id",
      status: "signed",
      amount: "10000"
    };

    describe('When request is successful', () => {
      it('should reply with 201 status code (Created)', (done) => {
        mockSuccessResponse();
        CoinDispenserClient.transfer('address').then((transferInfo) => {
          expect(transferInfo.status).toBe(201);
          done();
        });
      });

      it('should return transfer information', (done) => {
        mockSuccessResponse();
        CoinDispenserClient.transfer('address').then((transferInfo) => {
          expect(transferInfo.data.id).toEqual(transferData.id);
          expect(transferInfo.data.status).toEqual(transferData.status);
          expect(transferInfo.data.amount).toEqual(transferData.amount);
          done();
        });
      });

      const mockSuccessResponse = () => {
        mockAxios.post.mockImplementationOnce(response => {
          return Promise.resolve({
            data: transferData,
            status: 201
          });
        });
      };
    });

    describe('When address parameter is wrong', () => {
      it('should reply with 400 (Bad parameter)', (done) => {
        mockBadParameterResponse();
        CoinDispenserClient.transfer('address').then((transferInfo) => {
          expect(transferInfo.status).toBe(400);
          done();
        });
      });

      it('should return error message', (done) => {
        mockBadParameterResponse();
        CoinDispenserClient.transfer('address').then((response) => {
          expect(response.data.msg).toEqual("Address is invalid");
          done();
        });
      });

      const mockBadParameterResponse = () => {
        mockAxios.post.mockImplementationOnce(response => {
          return Promise.resolve({
            data: {
              msg: "Address is invalid"
            },
            status: 400
          });
        });
      };
    });
  });
});
