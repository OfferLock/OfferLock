export function StudentPattern({ className }: { className?: string }) {
    return (
        <div className={`absolute inset-0 pointer-events-none opacity-[0.03] overflow-hidden ${className}`}>
            <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <pattern id="student-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                        {/* Simple line art representations - Abstracted */}
                        <path d="M20 20 C 20 10 30 10 30 20 V 30 H 20 Z" stroke="currentColor" fill="none" strokeWidth="2" />
                        <circle cx="25" cy="15" r="3" stroke="currentColor" fill="none" strokeWidth="2" />

                        <path d="M60 60 L 70 50 L 80 60" stroke="currentColor" fill="none" strokeWidth="2" />
                        <rect x="65" y="45" width="10" height="15" stroke="currentColor" fill="none" strokeWidth="2" />

                        <path d="M10 80 Q 25 90 40 80 T 70 80" stroke="currentColor" fill="none" strokeWidth="2" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#student-pattern)" />
            </svg>
        </div>
    )
}
