'use client'

import { Button } from '@/components/ui/button'
import { useLanguageStore } from '@/store/useLanguageStore'

export function LanguageSwitch() {
    const { language, setLanguage } = useLanguageStore()

    return (
        <div className="flex bg-muted rounded-lg p-1">
            <Button
                variant={language === 'en' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setLanguage('en')}
            >
                EN
            </Button>
            <Button
                variant={language === 'zh' ? 'secondary' : 'ghost'}
                size="sm"
                className="h-7 text-xs"
                onClick={() => setLanguage('zh')}
            >
                中文
            </Button>
        </div>
    )
}
