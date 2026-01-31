'use client'

import { useParams } from 'next/navigation' // Corrected import
import { useOrder, useMilestoneAmounts, useWriteOfferEscrow, useAuditor } from '@/hooks/useOfferEscrow'
import { CONTRACT_ADDRESS } from '@/constants/contracts'
import { useAccount } from 'wagmi'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Input } from '@/components/ui/input' // Assuming installed
import { MilestoneTimeline } from '@/components/visualization/MilestoneTimeline'
import { FundFlow } from '@/components/visualization/FundFlow'
import { useLanguageStore } from '@/store/useLanguageStore'
import { formatEther, parseEther } from 'viem'
import { useState } from 'react'
import { ArrowLeft, ExternalLink, Download, Upload, CheckCircle, ShieldAlert } from 'lucide-react'
import Link from 'next/link'
import { EventFeed } from '@/components/visualization/EventFeed'

export default function OrderPage() {
    const params = useParams()
    const orderId = typeof params.id === 'string' ? BigInt(params.id) : BigInt(0)
    const { t } = useLanguageStore()
    const { address } = useAccount()

    const { order, milestoneCount } = useOrder(orderId)
    const { data: milestones } = useMilestoneAmounts(orderId, Number(milestoneCount.data || BigInt(0)))
    const { data: auditorAddr } = useAuditor()

    const { deposit, releaseNextMilestone, refund, isPending } = useWriteOfferEscrow()

    const [depositAmount, setDepositAmount] = useState('')

    // Loading States
    if (order.isLoading || milestoneCount.isLoading) {
        return <div className="container py-10 space-y-6">
            <Skeleton className="h-10 w-1/3" />
            <Skeleton className="h-[200px] w-full" />
        </div>
    }

    // Data parsing
    const orderData = order.data as any
    if (!orderData || !orderData[0]) {
        return <div className="container py-10">Order not found</div>
    }

    // orderData returns array or struct depending on wagmi config, usually array for ABI provided
    // [student, provider, total, deposited, released, currentMilestone, status]
    const [student, provider, total, deposited, released, currentMs, status] = orderData as [string, string, bigint, bigint, bigint, bigint, number]

    const isStudent = address?.toLowerCase() === student.toLowerCase()
    const isAuditor = address && auditorAddr && address.toLowerCase() === auditorAddr.toLowerCase()
    const isProvider = address?.toLowerCase() === provider.toLowerCase()

    // Collect milestone amounts from results
    const milestoneAmounts = milestones?.map(m => m.result as bigint) || []

    // Pending Actions
    const handleDeposit = () => {
        if (!depositAmount) return
        deposit(orderId, parseEther(depositAmount))
    }

    const handleDepositAll = () => {
        const remaining = total - deposited
        if (remaining > BigInt(0)) {
            deposit(orderId, remaining)
        }
    }

    return (
        <div className="container py-10 max-w-4xl">
            <Link href="/dashboard" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6">
                <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
            </Link>

            <div className="grid gap-6">
                {/* Header Card */}
                <Card className="border-t-4 border-t-primary">
                    <CardHeader>
                        <div className="flex justify-between items-start">
                            <div>
                                <CardTitle className="text-2xl">Order #{orderId.toString()}</CardTitle>
                                <div className="text-sm text-muted-foreground mt-1 space-x-4">
                                    <span>Student: {student.slice(0, 6)}...{student.slice(-4)}</span>
                                    <span>Provider: {provider.slice(0, 6)}...{provider.slice(-4)}</span>
                                </div>
                            </div>
                            <div className="text-right">
                                <div className="text-3xl font-bold">{formatEther(total)} KITE</div>
                                <div className="text-sm text-muted-foreground">Total Agreement</div>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <FundFlow total={total} deposited={deposited} released={released} />
                    </CardContent>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                    {/* Main Timeline - 2/3 width */}
                    <Card className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                {t('detail.milestones')}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <MilestoneTimeline
                                milestones={milestoneAmounts}
                                currentMilestone={Number(currentMs)}
                                status={status}
                            />
                        </CardContent>
                    </Card>

                    {/* Action Panel - 1/3 width */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Actions</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {isStudent && (
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">Deposit Funds</label>
                                        <div className="flex gap-2">
                                            <Input
                                                placeholder="Amount"
                                                value={depositAmount}
                                                onChange={e => setDepositAmount(e.target.value)}
                                                type="number"
                                            />
                                        </div>
                                        <Button className="w-full" onClick={handleDeposit} disabled={isPending}>
                                            <Upload className="w-4 h-4 mr-2" /> Deposit
                                        </Button>
                                        <Button variant="outline" size="sm" className="w-full" onClick={handleDepositAll} disabled={isPending}>
                                            Pay Remaining ({formatEther(total - deposited)})
                                        </Button>
                                    </div>
                                )}

                                {isAuditor && (
                                    <div className="space-y-3">
                                        <Button className="w-full" onClick={() => releaseNextMilestone(orderId)} disabled={isPending}>
                                            <CheckCircle className="w-4 h-4 mr-2" /> Release Next Milestone
                                        </Button>
                                        <Button variant="destructive" className="w-full" onClick={() => refund(orderId)} disabled={isPending}>
                                            <ShieldAlert className="w-4 h-4 mr-2" /> Refund Remaining
                                        </Button>
                                    </div>
                                )}

                                {!isStudent && !isAuditor && (
                                    <div className="text-sm text-muted-foreground text-center py-4">
                                        You are viewing this order in read-only mode.
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>On-Chain Data</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <Link href={`https://testnet.kitescan.ai/address/${CONTRACT_ADDRESS}`} target="_blank">
                                    <Button variant="ghost" className="w-full justify-start h-auto py-2">
                                        <ExternalLink className="w-4 h-4 mr-2" /> View Contract
                                    </Button>
                                </Link>
                            </CardContent>
                        </Card>

                        <EventFeed orderId={orderId} />
                    </div>
                </div>
            </div>
        </div>
    )
}

