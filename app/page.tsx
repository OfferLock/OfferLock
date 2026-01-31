'use client'

import { Button } from '@/components/ui/button'
import { useLanguageStore } from '@/store/useLanguageStore'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Lock, CheckCircle, Search } from 'lucide-react'
import { StudentPattern } from '@/components/ui/StudentPattern'

export default function Home() {
  const { t } = useLanguageStore()

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] relative">
      <StudentPattern className="z-0 text-black" />

      {/* Hero Section */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-32 z-10">
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          className="max-w-4xl space-y-8"
        >
          <div className="inline-block px-4 py-1.5 bg-black/5 backdrop-blur-sm border border-black/10 text-primary rounded-full text-sm font-semibold mb-6">
            OfferLock on KiteAI Testnet
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground bg-clip-text">
            {t('landing.title')}
          </h1>
          <p className="text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {t('landing.subtitle')}
          </p>
          <div className="flex gap-4 justify-center pt-8">
            <Link href="/dashboard">
              <Button size="lg" className="h-12 px-8 text-lg gap-2 shadow-lg hover:shadow-xl transition-all">
                View My Dashboard <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/explorer">
              <Button size="lg" variant="outline" className="h-12 px-8 text-lg gap-2 backdrop-blur-sm bg-white/50">
                Alumni Offers <Search className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Feature Section: 3 Value Props */}
      <section className="py-24 px-4 relative z-10 bg-white/80 backdrop-blur-sm border-t">
        <div className="container max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                icon: <Lock className="w-6 h-6" />,
                title: "Secure 4-3-3 Escrow Model",
                desc: "Funds are secured on-chain and released only upon verified milestones, ensuring mutual trust between families and agencies."
              },
              {
                icon: <CheckCircle className="w-6 h-6" />,
                title: "Eliminate Counterparty Risk",
                desc: "Smart contracts prevent funds from disappearing. Payments are strictly tied to performance, solving the 'runaway agent' problem."
              },
              {
                icon: <Search className="w-6 h-6" />,
                title: "Transparent & Verifiable",
                desc: "Every contract term and transaction is immutable and publicly auditible on KiteAI, guaranteeing total transparency."
              }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white p-8 rounded-2xl border shadow-sm hover:shadow-md transition-all group"
              >
                <div className="w-14 h-14 bg-black/5 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
