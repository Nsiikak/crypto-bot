# 💰 Crypto Price Agent (Mastra x Telex)

A lightweight AI agent built with **Mastra** that fetches real-time cryptocurrency prices from the **CoinGecko API**.  
Designed for integration with **Telex.im** to respond to user messages like:

price bitcoin
price ethereum

and instantly return the live USD price.

---

## 🚀 Features

- 🔹 Real-time crypto price lookup using the [CoinGecko API](https://www.coingecko.com/en/api)
- 🔹 Built with **Mastra**, an intelligent agent framework for Node.js
- 🔹 Integrates easily with **Telex.im** via A2A (Agent-to-Agent) protocol
- 🔹 Supports deployment on Railway, Render, or any Node.js-compatible host

---

## 🧱 Project Structure

crypto-bot/
├── src/
│ ├── mastra/
│ │ ├── agents/
│ │ │ └── cryptoAgent.ts
│ │ └── tools/
│ │ └── cryptoPriceTool.ts
│ └── index.ts
├── package.json
└── README.md

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Nsiikak/crypto-bot.git
cd crypto-bot
2️⃣ Install dependencies
npm install
3️⃣ Run locally
npm run dev
Mastra will start on:
http://localhost:4111
You can test it with:
curl -X POST http://localhost:4111/api/agents/cryptoAgent/generate \
-H "Content-Type: application/json" \
-d '{"input": "price bitcoin"}'
Expected response:
{
  "response": "Bitcoin: $69342 USD 💰"
}
🌐 Deployment (Railway or Render)
Push your repo to GitHub
Go to Railway.app
Create a new project → “Deploy from GitHub”
Select this repo (crypto-bot)
Railway automatically detects Node.js and deploys it
Once deployed, Railway gives you a live domain:
https://crypto-bot-production.up.railway.app
🔗 Telex Workflow Setup
To integrate with Telex.im:
Go to https://telex.im
Open Workflows → Create New Workflow
Paste the JSON below (edit the URL to match your Railway domain):
{
  "active": true,
  "category": "utilities",
  "description": "Get real-time crypto prices from CoinGecko.",
  "id": "cryptoPriceBot",
  "long_description": "Provides live crypto prices using the CoinGecko API. Ask: 'price bitcoin' or 'price ethereum'.",
  "name": "crypto_price_agent",
  "nodes": [
    {
      "id": "crypto_agent_node",
      "name": "Crypto Price Agent Node",
      "parameters": {},
      "position": [800, -100],
      "type": "a2a/mastra-a2a-node",
      "typeVersion": 1,
      "url": "https://crypto-bot-production.up.railway.app/api/agents/cryptoAgent/generate"
    }
  ],
  "settings": {
    "executionOrder": "v1"
  },
  "short_description": "Check live crypto prices 💰"
}
Save → Activate → Test by typing:
price bitcoin
🧠 Tech Stack
Mastra — for AI agent orchestration
Node.js — runtime environment
CoinGecko API — live cryptocurrency data
Telex.im — messaging and automation platform
Railway — hosting and deployment
👨‍💻 Author
Nsikak Ebong
Full Stack Developer | AI Enthusiast | Telex Backend Stage 3
GitHub: @Nsiikak
🪙 Example Output
User: price bitcoin
Bot: Bitcoin: $69,342 USD 💰
📜 License
This project is open source under the MIT License.
