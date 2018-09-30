var express = require('express');
const FaucetService = require('../services/FaucetService');
var router = express.Router();

const TRANSFER_AMOUNT = process.env.FAUCET_TRANSFER_AMOUNT;

router.post('/', function(req, res) {
  let faucetService = FaucetService();
  let toAddress = req.body.address;

  faucetService.transfer(toAddress, TRANSFER_AMOUNT)
    .then(transferInfo => {
      res.status(201).send(formatTransferInfo(transferInfo));
    }).catch();
});

const formatTransferInfo = (transferInfo) => (
  {
    id: transferInfo.txid,
    status: transferInfo.status,
    amount: TRANSFER_AMOUNT
  }
);

module.exports = router;
