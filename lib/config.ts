
import { http, createConfig } from 'wagmi'
import { injected } from 'wagmi/connectors'

export const kiteAI = {
    id: 2368,
    name: 'KiteAI Testnet',
    nativeCurrency: { name: 'KITE', symbol: 'KITE', decimals: 18 },
    rpcUrls: {
        default: { http: ['https://rpc-testnet.gokite.ai/'] },
    },
    blockExplorers: {
        default: { name: 'KiteScan', url: 'https://testnet.kitescan.ai/' },
    },
} as const

export const config = createConfig({
    chains: [kiteAI],
    connectors: [
        injected(),
    ],
    transports: {
        [kiteAI.id]: http(),
    },
})
