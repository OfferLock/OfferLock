# OfferLock
OfferLock: Trustless Study Abroad Payment Protocol


## 零风险留学支付托管协议
Code is Law. Trustless Study Abroad Payment. 代码即法律。让留学支付不再有信任危机。

[Kite AI Chain](https://img.shields.io/badge/Network-Kite%20AI%20Testnet-blue)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌟 1. Project Overview / 项目概述

OfferLock is a decentralized escrow protocol designed for the **$50B study abroad service market**. By combining **AI Oracles** and **Kite AI Smart Contracts**, we solve the trust deficit between students and agencies through a risk-reversed payment model.

OfferLock 是一款专为 **500 亿美元留学服务市场** 打造的去中心化托管协议。我们通过 **AI 预言机 (Oracle)** 与 **Kite AI 智能合约** 的结合，利用风险反转的支付模型，彻底解决留学生与中介机构之间的信任缺口。

### The 40-30-30 "Safety First" Model / 40-30-30 风险反转模型

<p align="center">
  <img src="images/433.gif" 
       width="300" 
       alt="40-30-30 风险反转模型示意：安全优先">
  <br>
  <small>40% 签约启动 → 30% AI核验 → 30% 入学结案</small>
</p>

- **40% Signing (签约启动)** : Funds released to secure the agreement and cover initial operations. / 签约即释放，保障服务正式启动及基础运营成本。
- **30% AI Verified (AI 自动核验)** : Automatically released only when the **AI Oracle** validates the university offer letter's authenticity. / 当 **AI 预言机** 验证录取通知书真实性后自动释放，实现硬核风控。
- **30% Completion (入学结案)** : Released upon successful enrollment to close the service loop. / 学生确认入学后释放尾款，确保服务最终闭环。

## 🛠 2. Technical Stack / 技术架构

Built with a focus on **"Invisible Web3 Experience"**, we deeply leverage the core components of the Kite AI ecosystem:

本项目专注于构建“无感 Web3 体验”，深度应用了 Kite AI 生态核心组件：

- **Settlement Layer (结算层)**  
  Deployed on Kite AI Testnet.  
  Non-custodial escrow ensures platform-level security.  
  **部署于 Kite AI 测试网，采用非托管协议确保资金不被平台挪用。**

- **UX Innovation (体验层)**  
  Integrated Kite Account Abstraction (AA) SDK for Gasless Payments.  
  Allows students to pay with USDT without holding native tokens.  
  **集成 Kite 账户抽象 SDK，通过 Paymaster 实现免 Gas 费支付，留学生无需持有原生代币即可完成。**

- **Verification Layer (验证层)**  
  An LLM-based AI Oracle that converts off-chain PDF data into on-chain trust signals.  
  **基于大语言模型的 AI 预言机，将 PDF 录取通知书转化为链上可信信号，触发合约状态变更。**

## 🚀 3. Quick Start / 快速开始

### Deployment Information / 部署信息

- **Contract Address (合约地址)**: `0xDECEd7A01D61aCcE2C51F86f6a816757E762d1F0`
- **Network (网络)**: Kite AI Testnet (Chain ID: 2368)
- **Explorer (浏览器)**: Verified Contract on [Kitescan](https://testnet.kitescan.ai/address/0xDECEd7A01D61aCcE2C51F86f6a816757E762d1F0)  
  （直接点击查看合约代码、交易记录等）

### Local Development / 本地开发

```bash
# Clone the repository (replace with your actual GitHub repo URL once created)
git clone https://github.com/yanzhuchen96-creator/offerlock.git

# or if using SSH:
# git clone git@github.com:[your-username]/offerlock.git

cd offerlock

# Install dependencies
npm install

# Start development server (usually opens at http://localhost:5173 or similar)
npm run dev
```
## 👥 4. Team / 团队成员

We are a passionate, multi-disciplinary team building the future of Invisible Web3 experiences on Kite AI.

我们是一支跨领域、充满热情的团队，致力于在 Kite AI 上打造无感 Web3 体验。

| Role / 角色                              | Name / 姓名          | X (Twitter)                          | Telegram             | Bio Snippet / 简介 |
|------------------------------------------|----------------------|--------------------------------------|----------------------|--------------------|
| Product Strategist & Business Architect<br>产品战略与商业架构设计 | Alex Fan            | [@itsAlexFan](https://x.com/itsAlexFan) | @itsAlexFan         | Cornell alum | Law + Finance + Web3 + AI |
| Project Design & Industry Analyst<br>项目核心构想设计与行业分析 | Riley琦琦           | [@rileyqiqi](https://x.com/rileyqiqi)   | @rrrileywang        | — |
| Technical Support & Product Promotion<br>技术支持与产品宣传 | Fred Huang          | [@FrankFred834567](https://x.com/FrankFred834567) | @frankhyn123     | Web3 / Blockchain / Crypto Community Builder |
| Smart Contract Development & On-chain Integration<br>智能合约开发与链上集成 | Joe Chen            | [@cyz496](https://x.com/cyz496)         | @cydot0906          | Web3 新人｜PolyU 元宇宙科技 |
| Web3 Frontend Development & UI/UX<br>Web3前端开发 & UI/UX | 虎虎 (ToraInX)      | [@planning8848](https://x.com/planning8848) | —                | — |

### Connect with the team / 联系我们
Feel free to reach out on X or Telegram for collaborations, feedback, or just to say hi! 🚀

我们欢迎任何合作、反馈或交流～

Built with ❤️ by the OfferLock team on Kite AI Testnet.

