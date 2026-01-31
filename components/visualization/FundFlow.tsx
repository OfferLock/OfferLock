'use client'

import { formatEther } from 'viem'
import { cn } from '@/lib/utils'

interface FundFlowProps {
    total: bigint
    deposited: bigint
    released: bigint
}

export function FundFlow({ total, deposited, released }: FundFlowProps) {
    const totalEth = Number(formatEther(total || BigInt(0)))
    const depositedEth = Number(formatEther(deposited || BigInt(0)))
    const releasedEth = Number(formatEther(released || BigInt(0)))

    // Calculate percentages
    // Released is part of Deposited.
    // Deposited is part of Total (or can be more? No, usually deposited <= total)

    const releasedPct = totalEth > 0 ? (releasedEth / totalEth) * 100 : 0
    const escrowPct = totalEth > 0 ? ((depositedEth - releasedEth) / totalEth) * 100 : 0
    const pendingPct = totalEth > 0 ? 100 - releasedPct - escrowPct : 100

    return (
        <div className="space-y-4">
            <div className="flex justify-between text-sm text-muted-foreground">
                <span>Funds Overview</span>
                <span>{depositedEth} / {totalEth} KITE Deposited</span>
            </div>

            <div className="h-4 w-full rounded-full flex overflow-hidden bg-secondary">
                {/* Released (Green) */}
                <div
                    className="bg-green-500 h-full transition-all duration-1000"
                    style={{ width: `${releasedPct}%` }}
                    title={`Released: ${releasedEth} KITE`}
                />

                {/* In Escrow (Blue) */}
                <div
                    className="bg-blue-500 h-full transition-all duration-1000"
                    style={{ width: `${escrowPct}%` }}
                    title={`Escrow: ${depositedEth - releasedEth} KITE`}
                />

                {/* Pending Deposit (Gray) - automatically fills remainder */}
            </div>

            <div className="flex gap-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                    <span>Released to Provider</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                    <span>Locked in Escrow</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-secondary" />
                    <span>Not Yet Deposited</span>
                </div>
            </div>
        </div>
    )
}
