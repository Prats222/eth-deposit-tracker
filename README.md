# Ethereum Deposit Tracker

### A real-time Ethereum deposit tracker that monitors transactions on the Beacon Deposit Contract and displays the latest deposits on the frontend. The application also includes Telegram notifications for real-time deposit alerts.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies](#technologies)
4. [Setup Instructions](#setup-instructions)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Environment Variables](#environment-variables)
6. [Running the Application](#running-the-application)
7. [Usage](#usage)
   - [Real-Time Deposits](#real-time-deposits)
   - [Fixed Transactions](#fixed-transactions)
8. [Telegram Notification Setup](#telegram-notification-setup)
9. [Examples](#examples)
10. [Contributing](#contributing)
11. [License](#license)

---

## Overview

The **Ethereum Deposit Tracker** monitors the Beacon Deposit Contract for new Ethereum deposits in real-time, displays the most recent 20 transactions on the web page, and provides Telegram notifications for detected deposits.

This application is built using the **MERN stack** (MongoDB, Express, React, Node.js) and uses **Alchemy** for interacting with the Ethereum blockchain.

---

## Features

- Monitors the **Beacon Deposit Contract** for Ethereum deposits.
- Displays the **most recent 20 transactions** on the web page.
- Shows **two fixed transactions** on top, followed by 18 real-time transactions.
- Sends **real-time notifications** to a **Telegram bot** when a deposit is detected.
- Aesthetic page design with a **deep blue background** and **animated gradient flow**.

---

## Technologies

- **Frontend**: React, CSS (for animation and styling)
- **Backend**: Node.js, Express
- **Database**: MongoDB (MongoDB Atlas)
- **Blockchain Interaction**: Alchemy SDK
- **Notifications**: Telegram Bot API

---

## Setup Instructions

### Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- **Node.js** (v14.x or higher)
- **MongoDB Atlas** (or local MongoDB)
- **NPM** (Node Package Manager)
- **Alchemy API** account for interacting with the Ethereum blockchain

### Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/yourusername/eth-deposit-tracker.git
   cd eth-deposit-tracker
   ```

2. **Install dependencies for both the server and client**:

   - Server:
     ```bash
     npm install
     ```

   - Client:
     ```bash
     cd client
     npm install
     cd ..
     ```

---

## Environment Variables

You need to configure the following environment variables in a `.env` file in the root of the project.

```bash
# .env file
MONGO_URI=your_mongodb_atlas_connection_string
RPC_URL=https://eth-mainnet.alchemyapi.io/v2/your_alchemy_key
PORT=5000
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id
```

- **MONGO_URI**: The connection string to your MongoDB Atlas cluster.
- **RPC_URL**: The Alchemy API endpoint to interact with the Ethereum network.
- **PORT**: The port on which your server will run (default: 5000).
- **TELEGRAM_BOT_TOKEN**: The token for your Telegram bot created via BotFather.
- **TELEGRAM_CHAT_ID**: Your chat ID or group ID where the notifications will be sent.

---

## Running the Application

1. **Run the MongoDB database** (if you're using a local MongoDB):

   ```bash
   mongod
   ```

2. **Start the development server**:

   ```bash
   npm run dev
   ```

   This command will start both the backend server (on `localhost:5000`) and the React frontend (on `localhost:3000`) concurrently.

---

## Usage

### Real-Time Deposits

- The web page will display the **two fixed transactions** at the top, followed by the **last 18 real-time transactions**. New transactions will be added to the top of the list, and older ones will be removed to maintain a count of 20 transactions in total.

### Fixed Transactions

- The two fixed transactions are always displayed at the top, as per the example given in the task document.

### Web Page Design

- The page has a **deep blue background** with an **animated gradient flow** for aesthetics.
- There is a **notification bell icon** (🔔) that, when clicked, displays the last 10 block numbers received.
![image](https://github.com/user-attachments/assets/fa1f9dcd-ea96-46d0-b8d4-2f815bd6b82a)

---

## Telegram Notification Setup

### Steps to Configure Telegram Notifications

1. **Create a Telegram Bot** using **BotFather**:
   - Open Telegram and search for `@BotFather`.
   - Use the `/newbot` command to create a new bot.
   - Save the **Bot Token** provided by BotFather.

2. **Get Your Telegram Chat ID**:
   - Start a conversation with your bot, then get your Chat ID by visiting the following URL in your browser:
     ```
     https://api.telegram.org/bot<YourBotToken>/getUpdates
     ```
   - Look for `"id"` in the response JSON, which will be your **Chat ID**.
![image](https://github.com/user-attachments/assets/ff9256bb-73bd-4ecd-999d-c86fb11452c8)

3. **Add the Bot Token and Chat ID** to the `.env` file as explained in the [Environment Variables](#environment-variables) section.

---

## Examples

### Web Interface

When you run the application, the web page will show the following:

- **Fixed Transactions**: The top two transactions specified in the document.
- **Real-Time Transactions**: The latest 18 real-time Ethereum deposit transactions, updating dynamically.

### Telegram Notifications

Example notification sent via Telegram for a new Ethereum deposit:

```
🚀 New Ethereum Deposit Detected! 🚀

Block Number: 123456
Transaction Hash: 0x1391be19259f10e01336a383217cf35344dd7aa157e95030f46235448ef5e5d6
Fee: 0.02 ETH
Sender Address: 0xabcdef1234567890
Block Timestamp: 2024-09-09 14:45:32
```

---

