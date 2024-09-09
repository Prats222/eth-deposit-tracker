import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './DepositList.css';  // Include custom CSS for styling

function DepositList() {
  const [realTimeDeposits, setRealTimeDeposits] = useState([]);  // Real-time transactions
  const [notifications, setNotifications] = useState([]);  // Stores last 10 block numbers
  const [showNotifications, setShowNotifications] = useState(false);  // Toggle notification visibility
  const maxRealTimeTransactions = 18;  // Display 18 real-time transactions
  
  // Two fixed transactions from the document
  const fixedTransactions = [
    {
      blockNumber: 1391,
      fee: '0.01',
      hash: '0x1391be19259f10e01336a383217cf35344dd7aa157e95030f46235448ef5e5d6',
      pubkey: '0x1234567890abcdef',
      blockTimestamp: new Date()
    },
    {
      blockNumber: 53,
      fee: '0.02',
      hash: '0x53c98c3371014fd54275ebc90a6e42dffa2eee427915cab5f80f1e3e9c64eba4',
      pubkey: '0xabcdef1234567890',
      blockTimestamp: new Date()
    }
  ];

  useEffect(() => {
    // Fetch real-time deposits from backend or simulate real-time transaction updates
    const interval = setInterval(() => {
      const newTransaction = {
        blockNumber: Math.floor(Math.random() * 100000),
        fee: (Math.random() * 0.05).toFixed(4),
        hash: `0x${Math.random().toString(16).substring(2, 10)}`,
        pubkey: `0x${Math.random().toString(16).substring(2, 10)}`,
        blockTimestamp: new Date()
      };

      setRealTimeDeposits(prevDeposits => {
        const updatedDeposits = [newTransaction, ...prevDeposits.slice(0, maxRealTimeTransactions - 1)];  // Limit to 18 transactions
        return updatedDeposits;
      });

      setNotifications(prevNotifications => {
        const updatedNotifications = [newTransaction.blockNumber, ...prevNotifications.slice(0, 9)];  // Limiting to 10 blocks
        return updatedNotifications;
      });
    }, 5000);  // Simulating a new transaction every 5 seconds

    return () => clearInterval(interval);
  }, []);

  // Toggle the notification list on bell icon click
  const toggleNotifications = () => {
    setShowNotifications(prevState => !prevState);
  };

  return (
    <div className="page-container">
      <header className="header">
        <h1>Ethereum Deposit Tracker</h1>
      </header>

      <section className="content">
        <h2>Recent Ethereum Deposits</h2>
        
        {/* Display fixed transactions first */}
        <ul className="deposit-list">
          <h3>Top Fixed Transactions</h3>
          {fixedTransactions.map(deposit => (
            <li key={deposit.hash}>
              <p><strong>Block Number:</strong> {deposit.blockNumber}</p>
              <p><strong>Fee:</strong> {deposit.fee} ETH</p>
              <p><strong>Hash:</strong> {deposit.hash}</p>
              <p><strong>Public Key (Sender):</strong> {deposit.pubkey}</p>
              <p><strong>Timestamp:</strong> {new Date(deposit.blockTimestamp).toLocaleString()}</p>
            </li>
          ))}

          {/* Display real-time transactions */}
          <h3>Real-Time Transactions</h3>
          {realTimeDeposits.map(deposit => (
            <li key={deposit.hash}>
              <p><strong>Block Number:</strong> {deposit.blockNumber}</p>
              <p><strong>Fee:</strong> {deposit.fee} ETH</p>
              <p><strong>Hash:</strong> {deposit.hash}</p>
              <p><strong>Public Key (Sender):</strong> {deposit.pubkey}</p>
              <p><strong>Timestamp:</strong> {new Date(deposit.blockTimestamp).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Notification Section */}
      <section className="notifications">
        <div className="notif-icon" onClick={toggleNotifications}>🔔</div>
        {/* Notification list appears only when showNotifications is true */}
        {showNotifications && (
          <div className="notif-list">
            <h3>Last 10 Blocks</h3>
            <ul>
              {notifications.map((block, index) => (
                <li key={index}>Block Number: {block}</li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default DepositList;
