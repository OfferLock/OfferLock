export function OfferLockLogo({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
        >
            {/* Lock Body */}
            <rect x="5" y="11" width="14" height="10" rx="2" />

            {/* Lock Shackle - stylized as a head/shoulders or protected person */}
            {/* Represents the "Student" being protected */}
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />

            {/* Simple Face/Person "Line Art" element inside the lock */}
            <circle cx="12" cy="16" r="1.5" />
            <path d="M10 19c0-1.1 0.9-2 2-2s2 0.9 2 2" />
        </svg>
    )
}
