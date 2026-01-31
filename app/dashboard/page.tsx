'use client'

import { useAllOrders } from '@/hooks/useOfferEscrow'
import { OrderCard } from '@/components/dashboard/OrderCard'
import { Skeleton } from '@/components/ui/skeleton'
import { useLanguageStore } from '@/store/useLanguageStore'
import { ShieldAlert, BookOpen, GraduationCap, FileCheck, School, Clock } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from "@/components/ui/progress"
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export default function Dashboard() {
    const { data: orders, isLoading } = useAllOrders()
    const { t } = useLanguageStore()

    // Mock Data for Lily Zhang
    const mockStudent = {
        name: "Lily Zhang",
        program: "CS Undergraduate '26",
        gpa: "3.9/4.0",
        toefl: "115",
        sat: "1540"
    }

    const mockApplications = [
        { school: "Stanford University", major: "Computer Science", status: "Submitted", date: "2025-11-01", color: "text-blue-500" },
        { school: "UC Berkeley", major: "EECS", status: "In Review", date: "2025-11-30", color: "text-yellow-500" },
        { school: "CMU", major: "HCI", status: "Interview", date: "2026-01-15", color: "text-purple-500" },
        { school: "MIT", major: "Computer Science", status: "Rejected", date: "2025-12-15", color: "text-red-500" }
    ]

    return (
        <div className="container py-10 space-y-8">
            {/* Student Profile Header */}
            <div className="flex flex-col md:flex-row items-center gap-6 bg-card border p-8 rounded-xl shadow-sm">
                <div className="relative">
                    <Avatar className="w-24 h-24 border-4 border-background shadow-md">
                        <AvatarImage src="/avatars/01.png" alt="LZ" />
                        <AvatarFallback className="bg-primary/10 text-primary text-xl">LZ</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-4 border-white rounded-full"></div>
                </div>

                <div className="flex-1 text-center md:text-left space-y-2">
                    <h1 className="text-3xl font-bold">{mockStudent.name}</h1>
                    <div className="flex flex-wrap justify-center md:justify-start gap-4 text-muted-foreground text-sm">
                        <div className="flex items-center gap-1">
                            <GraduationCap className="w-4 h-4" /> {mockStudent.program}
                        </div>
                        <div className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" /> GPA: {mockStudent.gpa}
                        </div>
                        <div className="flex items-center gap-1">
                            <FileCheck className="w-4 h-4" /> TOEFL: {mockStudent.toefl} / SAT: {mockStudent.sat}
                        </div>
                    </div>
                </div>

                <div className="flex gap-4 text-center">
                    <div>
                        <div className="text-2xl font-bold">10</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Applied</div>
                    </div>
                    <div className="w-px bg-border h-12"></div>
                    <div>
                        <div className="text-2xl font-bold">3</div>
                        <div className="text-xs text-muted-foreground uppercase tracking-wider">Accepted</div>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Col: Escrow Orders (Real Data) */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <ShieldAlert className="w-5 h-5 text-primary" />
                            OfferLock Escrow Contracts
                        </h2>
                        <Badge variant="outline">On-Chain</Badge>
                    </div>

                    {isLoading ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {[1, 2].map(i => (
                                <Skeleton key={i} className="h-[200px] w-full rounded-xl" />
                            ))}
                        </div>
                    ) : (orders && orders.length > 0) ? (
                        <div className="grid md:grid-cols-2 gap-6">
                            {orders.map((order, index) =>
                                order.status === 'success' ? (
                                    <OrderCard key={index} order={order} id={BigInt(index)} />
                                ) : null
                            )}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground border-2 border-dashed rounded-xl bg-muted/30">
                            <ShieldAlert className="w-12 h-12 mb-4 opacity-30" />
                            <p>No active escrow contracts found.</p>
                        </div>
                    )}
                </div>

                {/* Right Col: Applications (Mock Data) */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <School className="w-5 h-5 text-primary" />
                        Application Status
                    </h2>
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Current Progress</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Applications Submitted</span>
                                    <span className="font-bold">85%</span>
                                </div>
                                <Progress value={85} className="h-2" />
                            </div>

                            <div className="space-y-4">
                                {mockApplications.map((app, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm border-b pb-3 last:border-0 last:pb-0">
                                        <div>
                                            <div className="font-medium">{app.school}</div>
                                            <div className="text-xs text-muted-foreground">{app.major}</div>
                                        </div>
                                        <div className="text-right">
                                            <div className={app.color}>{app.status}</div>
                                            <div className="text-xs text-muted-foreground flex items-center justify-end gap-1">
                                                <Clock className="w-3 h-3" /> {app.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
