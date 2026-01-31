'use client'

import Link from 'next/link'
import { WalletConnect } from '@/components/web3/WalletConnect'
import { LanguageSwitch } from '@/components/layout/LanguageSwitch'
import { OfferLockLogo } from '@/components/ui/OfferLockLogo'

export function Navbar() {
    return (
        <nav className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
            <div className="container flex h-16 items-center justify-between">
                <div className="flex items-center gap-8">
                    <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                        <OfferLockLogo className="w-8 h-8 text-primary" />
                        <span>OfferLock</span>
                    </Link>
                    <div className="hidden md:flex gap-6 text-sm font-medium">
                        <Link href="/dashboard" className="transition-colors hover:text-primary">
                            Dashboard
                        </Link>
                        <Link href="/create" className="transition-colors hover:text-primary">
                            Create Order
                        </Link>
                        <Link href="https://testnet.kitescan.ai/" target="_blank" className="transition-colors hover:text-primary">
                            Explorer
                        </Link>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <LanguageSwitch />
                    <WalletConnect />
                </div>
            </div>
        </nav>
    )
}
