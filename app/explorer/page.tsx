'use client'

import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Search, Filter, BookOpen } from 'lucide-react'

// Mock Data
const OFFERS = [
    { university: "Stanford University", major: "Computer Science", degree: "MS", gpa: "3.95", toefl: "115", date: "2024-03-15", status: "Accepted" },
    { university: "MIT", major: "EECS", degree: "PhD", gpa: "4.0", toefl: "118", date: "2024-02-10", status: "Accepted" },
    { university: "Carnegie Mellon", major: "HCI", degree: "MS", gpa: "3.8", toefl: "110", date: "2024-03-20", status: "Accepted" },
    { university: "UC Berkeley", major: "Data Science", degree: "MS", gpa: "3.88", toefl: "112", date: "2024-03-05", status: "Waitlisted" },
    { university: "Columbia University", major: "Financial Engineering", degree: "MS", gpa: "3.9", toefl: "114", date: "2024-02-28", status: "Accepted" },
    { university: "Cornell University", major: "CS", degree: "MEng", gpa: "3.75", toefl: "108", date: "2024-04-01", status: "Accepted" },
    { university: "UPenn", major: "CIS", degree: "MS", gpa: "3.85", toefl: "111", date: "2024-03-12", status: "Rejected" },
    { university: "Harvard", major: "Data Science", degree: "MS", gpa: "3.98", toefl: "119", date: "2024-03-10", status: "Waitlisted" },
]

export default function Explorer() {
    const [searchTerm, setSearchTerm] = useState('')
    const [degreeFilter, setDegreeFilter] = useState('All')

    const filteredOffers = OFFERS.filter(offer => {
        const matchesSearch = offer.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
            offer.major.toLowerCase().includes(searchTerm.toLowerCase())
        const matchesDegree = degreeFilter === 'All' || offer.degree === degreeFilter
        return matchesSearch && matchesDegree
    })

    return (
        <div className="container py-10 space-y-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Alumni Offer Archive</h1>
                    <p className="text-muted-foreground">Verified offers from past students using OfferLock.</p>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-5 h-5" /> Database
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Filters */}
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search university or major..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={e => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <Select value={degreeFilter} onValueChange={setDegreeFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Degree" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="All">All Degrees</SelectItem>
                                <SelectItem value="MS">Master's (MS)</SelectItem>
                                <SelectItem value="PhD">PhD</SelectItem>
                                <SelectItem value="MEng">MEng</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="rounded-md border">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>University</TableHead>
                                    <TableHead>Major</TableHead>
                                    <TableHead>Degree</TableHead>
                                    <TableHead>Stats (GPA/TOEFL)</TableHead>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredOffers.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                                            No offers found matching your criteria.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    filteredOffers.map((offer, i) => (
                                        <TableRow key={i}>
                                            <TableCell className="font-medium">{offer.university}</TableCell>
                                            <TableCell>{offer.major}</TableCell>
                                            <TableCell>{offer.degree}</TableCell>
                                            <TableCell>{offer.gpa} / {offer.toefl}</TableCell>
                                            <TableCell>{offer.date}</TableCell>
                                            <TableCell>
                                                <Badge variant={
                                                    offer.status === 'Accepted' ? 'default' :
                                                        offer.status === 'Waitlisted' ? 'secondary' : 'destructive'
                                                }>
                                                    {offer.status}
                                                </Badge>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
