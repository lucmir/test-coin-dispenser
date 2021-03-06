var express = require('express');
const FaucetService = require('../services/FaucetService');
var router = express.Router();

router.get('/', function(req, res) {
  let faucetService = FaucetService();
  faucetService.getFaucetWalletInfo().then(walletInfo => {
    res.status(200).send(formatFaucetWalletInfo(walletInfo));
  }).catch(response => {
    res.status(503).send(formatErrorResponse(response.result.error));
  });
});

const formatFaucetWalletInfo = (walletInfo) => (
  {
    id: walletInfo.id,
    balance: walletInfo.balance
  }
);

const formatErrorResponse = (msg) => (
  {
    error: msg
  }
);

module.exports = router;
