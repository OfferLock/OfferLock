'use client'

import { useState } from 'react'
import { useWriteOfferEscrow, useAuditor } from '@/hooks/useOfferEscrow'
import { parseEther, isAddress } from 'viem'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Plus, Trash, Loader2 } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useRouter } from 'next/navigation'

export default function CreateOrder() {
    const router = useRouter()
    const { address } = useAccount()
    const { data: auditorAddr } = useAuditor()
    const { createOrder, isPending, isConfirmed } = useWriteOfferEscrow()

    const [student, setStudent] = useState('')
    const [provider, setProvider] = useState('')
    const [milestones, setMilestones] = useState<string[]>([''])

    const isAuditor = address && auditorAddr && address.toLowerCase() === auditorAddr.toLowerCase()

    const addMilestone = () => setMilestones([...milestones, ''])
    const removeMilestone = (index: number) => setMilestones(milestones.filter((_, i) => i !== index))
    const updateMilestone = (index: number, val: string) => {
        const newMs = [...milestones]
        newMs[index] = val
        setMilestones(newMs)
    }

    const handleSubmit = async () => {
        if (!isAddress(student) || !isAddress(provider)) {
            alert("Invalid addresses")
            return
        }
        const amounts = milestones.map(m => parseEther(m))
        try {
            await createOrder(student, provider, amounts)
            // Redirect or show success (wait for effect?)
        } catch (e) {
            console.error(e)
        }
    }

    if (isConfirmed) {
        return (
            <div className="container py-20 text-center">
                <h2 className="text-2xl font-bold text-green-500 mb-4">Order Created Successfully!</h2>
                <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            </div>
        )
    }

    if (!isAuditor) {
        return (
            <div className="container py-20 text-center text-muted-foreground">
                Access Restricted: Only the Auditor can create new orders.
            </div>
        )
    }

    return (
        <div className="container max-w-2xl py-10">
            <Card>
                <CardHeader>
                    <CardTitle>Create New Escrow Order</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Student Address</Label>
                        <Input placeholder="0x..." value={student} onChange={e => setStudent(e.target.value)} />
                    </div>

                    <div className="space-y-2">
                        <Label>Provider Address</Label>
                        <Input placeholder="0x..." value={provider} onChange={e => setProvider(e.target.value)} />
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <Label>Milestones (KITE Amount)</Label>
                            <Button size="sm" variant="outline" onClick={addMilestone}>
                                <Plus className="w-4 h-4 mr-1" /> Add
                            </Button>
                        </div>

                        {milestones.map((ms, i) => (
                            <div key={i} className="flex gap-2">
                                <div className="flex items-center justify-center w-8 text-sm text-muted-foreground font-bold">
                                    {i + 1}
                                </div>
                                <Input
                                    placeholder="Amount"
                                    value={ms}
                                    type="number"
                                    onChange={e => updateMilestone(i, e.target.value)}
                                />
                                {milestones.length > 1 && (
                                    <Button variant="ghost" size="icon" onClick={() => removeMilestone(i)}>
                                        <Trash className="w-4 h-4 text-red-500" />
                                    </Button>
                                )}
                            </div>
                        ))}

                        <div className="text-right text-sm text-muted-foreground">
                            Total: {milestones.reduce((acc, val) => acc + Number(val || 0), 0)} KITE
                        </div>
                    </div>

                    <Button className="w-full" onClick={handleSubmit} disabled={isPending}>
                        {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                        Create Order
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
}
