# OfferLock
OfferLock: Trustless Study Abroad Payment Protocol


## 零风险留学支付托管协议
Code is Law. Trustless Study Abroad Payment.代码即法律。让留学支付不再有信任危机。

[Kite AI Chain](https://img.shields.io/badge/Network-Kite%20AI%20Testnet-blue)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🌟 1. Project Overview / 项目概述

OfferLock is a decentralized escrow protocol designed for the **$50B study abroad service market**. By combining **AI Oracles** and **Kite AI Smart Contracts**, we solve the trust deficit between students and agencies through a risk-reversed payment model.

OfferLock 是一款专为 **500 亿美元留学服务市场** 打造的去中心化托管协议。我们通过 **AI 预言机 (Oracle)** 与 **Kite AI 智能合约** 的结合，利用风险反转的支付模型，彻底解决留学生与中介机构之间的信任缺口。

### The 40-30-30 "Safety First" Model / 40-30-30 风险反转模型

<p align="center">
  <img src="images/433.gif" 
       width="400" 
       alt="40-30-30 风险反转模型示意：安全优先">
  <br>
  <small>40% 签约启动 → 30% AI核验 → 30% 入学结案</small>
</p>

- **40% Signing (签约启动)** : Funds released to secure the agreement and cover initial operations. / 签约即释放，保障服务正式启动及基础运营成本。
- **30% AI Verified (AI 自动核验)** : Automatically released only when the **AI Oracle** validates the university offer letter's authenticity. / 当 **AI 预言机** 验证录取通知书真实性后自动释放，实现硬核风控。
- **30% Completion (入学结案)** : Released upon successful enrollment to close the service loop. / 学生确认入学后释放尾款，确保服务最终闭环。

- ## 🛠 Technical Stack / 技术架构

Built with a focus on **"Invisible Web3 Experience"**, we deeply leverage the core components of the Kite AI ecosystem:

本项目专注于构建**“无感 Web3 体验”**，深度应用了 Kite AI 生态核心组件：

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
