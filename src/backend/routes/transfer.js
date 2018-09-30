var express = require('express');
const FaucetService = require('../services/FaucetService');
var router = express.Router();

router.post('/', function(req, res) {
  let transferAmount = process.env.FAUCET_TRANSFER_AMOUNT || 10000;
  let faucetService = FaucetService();
  let toAddress = req.body.address;

  faucetService.transfer(toAddress, transferAmount)
    .then(transferInfo => {
      res.status(201).send(formatTransferInfo(transferInfo));
    }).catch();
});

const formatTransferInfo = (transferInfo) => (
  {
    id: transferInfo.txid,
    status: transferInfo.status,
    amount: transferAmount
  }
);

module.exports = router;
