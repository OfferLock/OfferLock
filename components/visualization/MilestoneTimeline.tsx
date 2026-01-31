'use client'

import { motion } from 'framer-motion'
import { Check, Euro, Circle, Clock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { formatEther } from 'viem'

interface MilestoneTimelineProps {
    milestones: bigint[] // amounts
    currentMilestone: number
    status: number // 0-4
}

export function MilestoneTimeline({ milestones, currentMilestone, status }: MilestoneTimelineProps) {
    // Status: 0 Created, 1 Funded, 2 InProgress, 3 Completed, 4 Refunded

    return (
        <div className="relative py-8">
            {/* Connector Line */}
            <div className="absolute left-[28px] top-0 bottom-0 w-0.5 bg-border -z-10" />

            <div className="space-y-8">
                {milestones.map((amount, index) => {
                    const isCompleted = index < currentMilestone
                    const isCurrent = index === currentMilestone && status === 2 // InProgress
                    const isPending = index > currentMilestone

                    return (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-start gap-6"
                        >
                            <div className={cn(
                                "w-14 h-14 rounded-full flex items-center justify-center border-4 bg-background transition-colors",
                                isCompleted ? "border-primary text-primary" :
                                    isCurrent ? "border-blue-500 text-blue-500 animate-pulse" : "border-muted text-muted-foreground"
                            )}>
                                {isCompleted ? <Check className="w-6 h-6" /> :
                                    isCurrent ? <Clock className="w-6 h-6" /> :
                                        <Circle className="w-6 h-6" />}
                            </div>

                            <div className="flex-1 pt-1">
                                <div className="flex justify-between items-center mb-1">
                                    <h3 className={cn("font-bold text-lg", isCurrent && "text-blue-500")}>
                                        Milestone {index + 1}
                                    </h3>
                                    <span className="font-mono text-sm bg-muted px-2 py-1 rounded">
                                        {formatEther(amount)} KITE
                                    </span>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {isCompleted ? "Funds Released" :
                                        isCurrent ? "Currently In Progress" :
                                            "Locked in Escrow"}
                                </p>
                                {/* Progress bar for this milestone if current? Maybe too complex without reliable % data */}
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}
