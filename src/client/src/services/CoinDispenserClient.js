import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000';

class CoinDispenserClient {

  transfer(toAddress) {
    var request_url = `${API_BASE_URL}/transfer`; 
    var request_body = {
      address: toAddress
    };
    return axios.post(request_url, request_body); 
  }
}

export default new CoinDispenserClient;
