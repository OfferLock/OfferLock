# OfferLock
OfferLock: Trustless Study Abroad Payment Protocol


## 零风险留学支付托管协议
Code is Law. Trustless Study Abroad Payment. 代码即法律。让留学支付不再有信任危机。

[Kite AI Chain](https://img.shields.io/badge/Network-Kite%20AI%20Testnet-blue)

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Demo 视频

点击图片观看完整演示（YouTube）：

[![Demo Video](https://img.youtube.com/vi/TvpC55reank/maxresdefault.jpg)](https://youtu.be/TvpC55reank)

## 演示文稿 (PPT)

点击下方图片在线查看完整 PPT（Google Slides，可直接翻页浏览）：

[![PPT 演示文稿封面](ppt-cover.png)](https://docs.google.com/presentation/d/1rDBksBbcsruE9Eu1aFiEAl0PmBiHjx8vF8pqxRf-1c4/view?usp=sharing)

或者点击这里打开：[在线查看 PPT](https://docs.google.com/presentation/d/1rDBksBbcsruE9Eu1aFiEAl0PmBiHjx8vF8pqxRf-1c4/view?usp=sharing)

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

## 📖 2. 项目白皮书 & 核心逻辑 / Product Whitepaper & Core Logic

**Code is Law. Trustless Study Abroad Payment.**  
基于 Kite AI 链的留学资金可编程托管协议，用代码重构 500 亿美金市场的支付信任。

### 1. 为什么做这个？(Vision & Pain Points)

我们不是在做一个简单的支付工具，我们是在解决“信任危机”。

痛点一：资金裸奔  
* 传统模式下，学生需预付 100% 费用给中介。一旦中介跑路或服务注水，学生面临全额损失（行业退费纠纷率 >15%）。  
* OfferLock 方案：资金不进中介口袋，而是锁定在链上合约。

痛点二：交付无标准  
* 中介服务是“非标品”，结果难以量化。  
* OfferLock 方案：引入 AI 验证层，把Offer变成触发打款的唯一标准。

痛点三：门槛过高  
* 留学生不懂 Crypto，没有 Gas 费。  
* OfferLock 方案：使用 Kite AI Account Abstraction SDK，实现无感支付（Gasless）

### 2. 核心机制：三阶段资金释放模型 (The 40-30-30 Protocol)

我们重构了传统留学中介的收费模式，提出 "Risk-Reversal"（风险反转） 商业模型。通过智能合约，将原本由学生承担的 100% 风险，转变为按交付结果付费的公平博弈。

Stage 1: 启动与签约 (Initiation) —— 释放 40%  
* 触发条件：学生存入资金并签署合约。  
* 资金流向：40% 立即释放给服务方。  
* 商业逻辑：覆盖中介的基础人力成本（文书、选校、沟通），确保服务商有动力启动服务，不饿死优质中介。

Stage 2: 核心交付 (The "AI Moment") —— 释放 30%  
* 触发条件：AI Oracle 验证通过（学生上传 Offer PDF -> AI 识别真伪 -> 触发链上信号）。  
* 资金流向：30% 释放给服务方。  
* 商业逻辑：这是服务的核心价值点。“不见兔子不撒鹰”，彻底杜绝虚假承诺。

<p align="center">
  <img src="images/AIverify.gif" 
       width="500" 
  <br>
</p>

Stage 3: 完美结案 (Enrollment) —— 释放 30%  
* 触发条件：学生确认入学或服务期结束无异议。  
* 资金流向：剩余 30% 释放。  
* 商业逻辑：确保服务的完整性（协助签证、宿舍等后续事宜），防止“管杀不管埋”。

### 3. 法律与合规设计 (Legal Engineering)

资金非托管 (Non-Custodial)：OfferLock 平台不触碰用户资金。所有资金锁定在智能合约中，只有代码逻辑（Code）能移动资金，平台倒闭不影响用户资产安全。

### 4. 市场策略 (Go-to-Market)

我们不试图说服傲慢的传统巨头，我们旨在赋能挑战者。

* 目标客户：独立留学顾问、精品工作室、Web3 社区教育机构。  
* 核心价值："Trust as a Service" (以信任为服务)。  
  * 对于中小中介：使用 OfferLock = 获得银行级的信任背书 = 降低获客成本。  
  * 对于学生：获得 100% 的资金安全感。

### 5. 路线图 (Roadmap)

* Phase 1 (Hackathon MVP)：  
  * 实现核心 40-30-30 资金流转。  
  * 跑通 PDF 上传 -> AI 验证 -> 自动打款流程。  
  * 完成 Kite AI 账户抽象集成。

* Phase 2 (V2.0)：  
  * SLA Editor：允许中介自定义分期比例（如 50-50）。  
  * Reputation System：基于链上交付记录的中介信用评分体系。

## 🛠 3. Technical Stack / 技术架构

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

#### 合约验证与释放逻辑 / Contract Verification & Release Logic

核心释放函数 `releaseNextMilestone` 由 auditor 调用，包含多重验证，确保只有在条件满足时才释放资金给中介。

**🔍 关键验证点（verify 部分）总结：**

- `onlyAuditor`：只有 auditor 能调用（这是最主要的“验证权限”控制）
- `onlyExistingOrder`：订单必须存在
- `require(o.status == Funded || InProgress)`：订单必须已 Funded 或进行中
- `require(o.currentMilestone < milestoneAmounts.length)`：还有未完成的里程碑
- `require(o.depositedAmount - o.releasedAmount >= amount)`：剩余余额足够本次释放

这些检查点共同实现了“AI 验证后触发释放”的安全闭环，防止未授权、余额不足或状态错误的资金释放。

## 🚀 4. Quick Start / 快速开始

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
## 👥 5. Team / 团队成员

We are a passionate, multi-disciplinary team building the future of Invisible Web3 experiences on Kite AI.

我们是一支跨领域、充满热情的团队，致力于在 Kite AI 上打造无感 Web3 体验。

| Role / 角色                              | Name / 姓名          | X (Twitter)                          | Telegram             | Bio Snippet / 简介 |
|------------------------------------------|----------------------|--------------------------------------|----------------------|--------------------|
| Product Strategist & Business Architect<br>产品战略与商业架构设计 | Alex Fan            | [@itsAlexFan](https://x.com/itsAlexFan) | @itsAlexFan         | Cornell University 
| Project Design & Industry Analyst<br>项目核心构想设计与行业分析 | Riley琦琦           | [@rileyqiqi](https://x.com/rileyqiqi)   | @rrrileywang        | University of Edinburgh |
| Technical Support & Product Promotion<br>技术支持与产品宣传 | Fred Huang          | [@FrankFred834567](https://x.com/FrankFred834567) | @frankhyn123     | The Hong Kong Polytechnic University (PolyU) |
| Smart Contract Development & On-chain Integration<br>智能合约开发与链上集成 | Joe Chen            | [@cyz496](https://x.com/cyz496)         | @cydot0906          | The Hong Kong Polytechnic University (PolyU) |
| Web3 Frontend Development & UI/UX<br>Web3前端开发 & UI/UX | 虎虎 (ToraInX)      | [@planning8848](https://x.com/planning8848) | —                | Tongji University |

### Connect with the team / 联系我们
Feel free to reach out on X or Telegram for collaborations, feedback, or just to say hi! 🚀

我们欢迎任何合作、反馈或交流～

Built with ❤️ by the OfferLock team on Kite AI Testnet.

## 📄6. License / 开源协议

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

本项目采用 MIT 许可协议 - 详细内容请参阅仓库中的 [LICENSE](LICENSE) 文件。
