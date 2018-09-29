var express = require('express');
const FaucetService = require('../services/FaucetService');
var router = express.Router();

router.get('/', function(req, res, next) {
  faucetService = FaucetService();
  faucetService.getFaucetWalletInfo().then(walletInfo => {
    res.status(200).send(formatFaucetWalletInfo(walletInfo));
  }).catch();
});

const formatFaucetWalletInfo = (walletInfo) => (
  {
    id: walletInfo.id,
    balance: walletInfo.balance
  }
);

module.exports = router;
