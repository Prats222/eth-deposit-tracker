const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const { Alchemy, Network } = require('alchemy-sdk');
const axios = require('axios');

// Import the deposit model
const Deposit = require('./models/Deposit');
const app = express();
const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.log(err));

// Alchemy Settings for WebSocket
const settings = {
  apiKey: process.env.RPC_URL.split('/').pop(), // Extracting API key from RPC URL
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

// Function to send Telegram notifications
function sendTelegramNotification(deposit) {
  const message = `🚀 New Ethereum Deposit Detected! 🚀\n\n` +
                  `Block Number: ${deposit.blockNumber}\n` +
                  `Transaction Hash: ${deposit.hash}\n` +
                  `Fee: ${deposit.fee} ETH\n` +
                  `Sender Address: ${deposit.pubkey}\n` +
                  `Block Timestamp: ${new Date(deposit.blockTimestamp).toLocaleString()}`;

  // Sending a POST request to Telegram API
  axios.post(`https://api.telegram.org/bot7437430110:AAGgQ9pNFxgMf4WOx0YmfuBM36xTgUY4mN0/sendMessage`, {
    chat_id: '1777835092',  // my chat id
    text: message
  })
  .then(response => {
    console.log('Notification sent to Telegram:', response.data);
  })
  .catch(error => {
    console.error('Error sending Telegram notification:', error.response ? error.response.data : error);
  });
}

// Track Ethereum Deposits
async function trackDeposits(txHash) {
  const tx = await alchemy.core.getTransaction(txHash);
  if (!tx) return;

  // Check if the deposit already exists
  const existingDeposit = await Deposit.findOne({ hash: tx.hash });
  if (existingDeposit) {
    console.log('Deposit already exists:', tx.hash);
    return;  // Avoid adding duplicate
  }

  const gasPriceInEther = tx.gasPrice ? (parseInt(tx.gasPrice, 16) / 1e18).toFixed(6) : '0';

  const newDeposit = new Deposit({
    blockNumber: tx.blockNumber,
    blockTimestamp: new Date(),  // Correct timestamp
    fee: gasPriceInEther,
    hash: tx.hash,
    pubkey: tx.from,
  });

  await newDeposit.save();
  console.log('Deposit saved:', newDeposit);

  // Send a notification to Telegram
  sendTelegramNotification(newDeposit);
}

// WebSocket Real-time monitoring for new blocks
alchemy.ws.on('block', async (blockNumber) => {
  console.log(`New block received: ${blockNumber}`);
  
  // Fetch the block details
  const block = await alchemy.core.getBlockWithTransactions(blockNumber);

  // Iterate through transactions in the block
  block.transactions.forEach(async (tx) => {
    console.log(`Transaction found: ${tx.hash} to ${tx.to}`);  // Log every transaction
    
    // Check if the transaction involves the Beacon Deposit Contract
    if (tx.to && tx.to.toLowerCase() === "0x00000000219ab540356cbb839cbe05303d7705fa") {
      console.log(`New deposit transaction found in block ${blockNumber}: ${tx.hash}`);
      await trackDeposits(tx.hash);  // Process the deposit
    }
    //to get notific
    // await trackDeposits(tx.hash); 
  });
});



// API route to get all deposits
app.get('/api/deposits', async (req, res) => {
  const deposits = await Deposit.find();
  res.json(deposits);
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
