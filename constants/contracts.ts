export const KITE_AI_TESTNET_ID = 2368;
export const CONTRACT_ADDRESS = "0xDECEd7A01D61aCcE2C51F86f6a816757E762d1F0" as const;

export const OFFER_ESCROW_ABI = [
    // Read Functions
    {
        inputs: [],
        name: "auditor",
        outputs: [{ internalType: "address", name: "", type: "address" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [],
        name: "nextOrderId",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "orders",
        outputs: [
            { internalType: "address", name: "student", type: "address" },
            { internalType: "address", name: "provider", type: "address" },
            { internalType: "uint256", name: "totalAmount", type: "uint256" },
            { internalType: "uint256", name: "depositedAmount", type: "uint256" },
            { internalType: "uint256", name: "releasedAmount", type: "uint256" },
            { internalType: "uint256", name: "currentMilestone", type: "uint256" },
            { internalType: "uint8", name: "status", type: "uint8" },
            { internalType: "bool", name: "exists", type: "bool" }
        ],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "getMilestoneCount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    {
        inputs: [
            { internalType: "uint256", name: "orderId", type: "uint256" },
            { internalType: "uint256", name: "idx", type: "uint256" }
        ],
        name: "getMilestoneAmount",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "view",
        type: "function",
    },
    // Write Functions
    {
        inputs: [
            { internalType: "address", name: "student", type: "address" },
            { internalType: "address", name: "provider", type: "address" },
            { internalType: "uint256[]", name: "milestoneAmounts", type: "uint256[]" }
        ],
        name: "createOrder",
        outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "deposit",
        outputs: [],
        stateMutability: "payable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "releaseNextMilestone",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "uint256", name: "orderId", type: "uint256" }],
        name: "refund",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    {
        inputs: [{ internalType: "address", name: "newAuditor", type: "address" }],
        name: "changeAuditor",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
    // Events
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: true, internalType: "address", name: "student", type: "address" },
            { indexed: true, internalType: "address", name: "provider", type: "address" },
            { indexed: false, internalType: "uint256", name: "totalAmount", type: "uint256" }
        ],
        name: "OrderCreated",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: true, internalType: "address", name: "student", type: "address" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "FundDeposited",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "milestoneIndex", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "MilestoneReleased",
        type: "event",
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: "uint256", name: "orderId", type: "uint256" },
            { indexed: false, internalType: "uint256", name: "amount", type: "uint256" }
        ],
        name: "Refunded",
        type: "event",
    },
] as const;
