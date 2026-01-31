'use client'

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { formatEther } from 'viem'
import { ArrowRight, Clock, CheckCircle, AlertCircle } from 'lucide-react'

// Define Status Map
const STATUS_MAP = ['Created', 'Funded', 'InProgress', 'Completed', 'Refunded']
const STATUS_COLORS = ['bg-slate-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-red-500']

export function OrderCard({ order, id }: { order: any, id: bigint }) {
    // Parsing order data from array result
    const [student, provider, totalAmount, deposited, released, currentMilestone, status] = order.result || []

    const statusLabel = STATUS_MAP[status] || 'Unknown'
    const statusColor = STATUS_COLORS[status] || 'bg-gray-500'

    return (
        <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-bold">Order #{id.toString()}</CardTitle>
                <Badge className={statusColor}>{statusLabel}</Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Total:</span>
                    <span className="font-mono font-medium">{totalAmount ? formatEther(totalAmount) : '0'} KITE</span>
                </div>
                <div className="flex justify-between">
                    <span className="text-muted-foreground">Released:</span>
                    <span>{released ? formatEther(released) : '0'} / {totalAmount ? formatEther(totalAmount) : '0'}</span>
                </div>
                <div className="w-full bg-secondary h-2 rounded-full mt-2 overflow-hidden">
                    <div
                        className="bg-primary h-full transition-all"
                        style={{ width: `${totalAmount && released ? (Number(released) / Number(totalAmount)) * 100 : 0}%` }}
                    />
                </div>
            </CardContent>
            <CardFooter>
                <Link href={`/order/${id.toString()}`} className="w-full">
                    <Button variant="outline" className="w-full gap-2">
                        View Details <ArrowRight className="w-4 h-4" />
                    </Button>
                </Link>
            </CardFooter>
        </Card>
    )
}
