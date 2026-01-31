'use client'

import { useAccount, useConnect, useDisconnect, useSwitchChain, useChainId } from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from '@/components/ui/button'
import { useLanguageStore } from '@/store/useLanguageStore'
import { Wallet, LogOut, Network } from 'lucide-react'
import { KITE_AI_TESTNET_ID } from '@/constants/contracts'

export function WalletConnect() {
    const { address, isConnected } = useAccount()
    const { connect } = useConnect()
    const { disconnect } = useDisconnect()
    const { switchChain } = useSwitchChain()
    const chainId = useChainId()
    const { t } = useLanguageStore()

    const handleConnect = () => {
        connect({ connector: injected() })
    }

    const handleSwitchNetwork = () => {
        switchChain({ chainId: KITE_AI_TESTNET_ID })
    }

    if (!isConnected) {
        return (
            <Button onClick={handleConnect} className="gap-2">
                <Wallet className="w-4 h-4" />
                {t('nav.connect')}
            </Button>
        )
    }

    if (chainId !== KITE_AI_TESTNET_ID) {
        return (
            <Button variant="destructive" onClick={handleSwitchNetwork} className="gap-2">
                <Network className="w-4 h-4" />
                {t('nav.switch')} (KiteAI)
            </Button>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                {address?.slice(0, 6)}...{address?.slice(-4)}
            </div>
            <Button variant="outline" size="icon" onClick={() => disconnect()}>
                <LogOut className="w-4 h-4" />
            </Button>
        </div>
    )
}
