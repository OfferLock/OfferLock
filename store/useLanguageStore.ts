import { create } from 'zustand'

type Language = 'en' | 'zh'

interface LanguageState {
    language: Language
    setLanguage: (lang: Language) => void
    t: (key: string) => string
}

const translations = {
    en: {
        'nav.connect': 'Connect Wallet',
        'nav.switch': 'Switch Network',
        'status.created': 'Created',
        'status.funded': 'Funded',
        'status.inprogress': 'In Progress',
        'status.completed': 'Completed',
        'status.refunded': 'Refunded',
        'role.auditor': 'Auditor',
        'role.student': 'Student',
        'role.provider': 'Provider',
        'btn.deposit': 'Deposit',
        'btn.release': 'Release Next',
        'btn.refund': 'Refund',
        'btn.create': 'Create Order',
        'landing.title': 'Trustless Study Abroad Payment',
        'landing.subtitle': 'Powered by AI Oracle & Kite Account Abstraction',
        'dashboard.title': 'My Orders',
        'detail.milestones': 'Milestone Timeline',
        'detail.funds': 'Funds Flow',
    },
    zh: {
        'nav.connect': '连接钱包',
        'nav.switch': '切换网络',
        'status.created': '已创建',
        'status.funded': '已托管',
        'status.inprogress': '进行中',
        'status.completed': '已完成',
        'status.refunded': '已退款',
        'role.auditor': '审计员',
        'role.student': '学生',
        'role.provider': '服务商',
        'btn.deposit': '存入资金',
        'btn.release': '释放款项',
        'btn.refund': '发起退款',
        'btn.create': '创建订单',
        'landing.title': '按里程碑的可信支付',
        'landing.subtitle': 'KiteAI 链上的 40-30-30 风险反转模型',
        'dashboard.title': '我的订单',
        'detail.milestones': '里程碑进度',
        'detail.funds': '资金流向',
    }
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
    language: 'en',
    setLanguage: (lang) => set({ language: lang }),
    t: (key) => {
        const lang = get().language
        // @ts-ignore
        return translations[lang][key] || key
    }
}))
