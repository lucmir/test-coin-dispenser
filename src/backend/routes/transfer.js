var express = require('express');
const FaucetService = require('../services/FaucetService');
var router = express.Router();

router.post('/', function(req, res) {
  let faucetService = FaucetService();
  let toAddress = req.body.address;
  let amount = process.env.FAUCET_TRANSFER_AMOUNT;

  faucetService.transfer(toAddress, amount)
    .then(transferInfo => {
      transferInfo.amount = amount;
      res.status(201).send(formatTransferInfo(transferInfo));
    }).catch(response => {
      res.status(400).send(formatErrorResponse(response.result.error));
    }
  );
});

const formatTransferInfo = (transferInfo) => (
  {
    id: transferInfo.txid,
    status: transferInfo.status,
    amount: transferInfo.amount 
  }
);

const formatErrorResponse = (msg) => (
  {
    error: msg
  }
);

module.exports = router;
