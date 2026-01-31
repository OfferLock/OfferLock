'use client'

import { useWatchContractEvent } from 'wagmi'
import { OFFER_ESCROW_ABI, CONTRACT_ADDRESS } from '@/constants/contracts'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Activity, ExternalLink } from 'lucide-react'
import { useState, useEffect } from 'react'
import { formatEther } from 'viem'
import Link from 'next/link'

interface EventLog {
    name: string
    args: any
    transactionHash: string
    blockNumber: bigint
    timestamp: number
}

// Map event names to friendly text
const EVENT_MAP: Record<string, string> = {
    'OrderCreated': 'Order Created',
    'FundDeposited': 'Funds Deposited',
    'MilestoneReleased': 'Milestone Released',
    'Refunded': 'Order Refunded'
}

export function EventFeed({ orderId }: { orderId: bigint }) {
    const [events, setEvents] = useState<EventLog[]>([])

    // We primarily listen to real-time events here. 
    // For a production app, we would query past logs using `usePublicClient().getContractEvents`
    // But for this demo, listening to new events is a good "live" touch.

    useWatchContractEvent({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        eventName: 'OrderCreated',
        onLogs(logs) {
            processLogs(logs, 'OrderCreated')
        },
    })

    useWatchContractEvent({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        eventName: 'FundDeposited',
        onLogs(logs) {
            processLogs(logs, 'FundDeposited')
        },
    })

    useWatchContractEvent({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        eventName: 'MilestoneReleased',
        onLogs(logs) {
            processLogs(logs, 'MilestoneReleased')
        },
    })

    useWatchContractEvent({
        address: CONTRACT_ADDRESS,
        abi: OFFER_ESCROW_ABI,
        eventName: 'Refunded',
        onLogs(logs) {
            processLogs(logs, 'Refunded')
        },
    })

    const processLogs = (logs: any[], name: string) => {
        const relevantLogs = logs.filter(l => {
            // Filter by orderId if available in args
            const id = l.args.orderId
            return id && BigInt(id) === orderId
        })

        const newEvents = relevantLogs.map(l => ({
            name,
            args: l.args,
            transactionHash: l.transactionHash,
            blockNumber: l.blockNumber,
            timestamp: Date.now()
        }))

        if (newEvents.length > 0) {
            setEvents(prev => [...newEvents, ...prev])
        }
    }

    return (
        <Card className="h-[300px] flex flex-col">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Activity className="w-4 h-4 text-primary" />
                    Live Event Feed
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-auto pr-2">
                {events.length === 0 ? (
                    <div className="text-sm text-muted-foreground text-center py-10 opacity-60">
                        Waiting for new events...
                    </div>
                ) : (
                    <div className="space-y-4">
                        {events.map((ev, i) => (
                            <div key={i} className="flex flex-col gap-1 text-sm border-b pb-2 last:border-0 border-border/50">
                                <div className="flex justify-between font-medium">
                                    <span className="text-primary">{EVENT_MAP[ev.name]}</span>
                                    <span className="text-xs text-muted-foreground">
                                        {new Date(ev.timestamp).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div className="text-muted-foreground text-xs font-mono">
                                    {ev.name === 'FundDeposited' && `Amount: ${formatEther(ev.args.amount)} KITE`}
                                    {ev.name === 'MilestoneReleased' && `Ms Index: ${ev.args.milestoneIndex}, Amt: ${formatEther(ev.args.amount)}`}
                                    {ev.name === 'Refunded' && `Refund: ${formatEther(ev.args.amount)} KITE`}
                                </div>
                                <Link
                                    href={`https://testnet.kitescan.ai/tx/${ev.transactionHash}`}
                                    target="_blank"
                                    className="text-xs text-blue-500 hover:underline flex items-center gap-1"
                                >
                                    View Tx <ExternalLink className="w-3 h-3" />
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
