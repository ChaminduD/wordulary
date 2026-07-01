type GoogleIconProps = {
    className?: string;
};

export function GoogleIcon({ className }: GoogleIconProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={className}
        >
            <path
                fill="#4285F4"
                d="M22 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h5.6a4.8 4.8 0 0 1-2.08 3.15v2.62h3.36C20.84 18.24 22 15.53 22 12.27Z"
            />

            <path
                fill="#34A853"
                d="M12 22c2.97 0 5.46-.98 7.28-2.66l-3.36-2.62c-.93.63-2.12 1-3.92 1-3 0-5.54-2.03-6.45-4.77H2.08v2.76A10 10 0 0 0 12 22Z"
            />

            <path
                fill="#FBBC05"
                d="M5.55 12.95A5.98 5.98 0 0 1 5.2 11c0-.68.12-1.33.35-1.95V6.3H2.08A10 10 0 0 0 2 11c0 1.61.39 3.14 1.08 4.5l2.47-1.55Z"
            />

            <path
                fill="#EA4335"
                d="M12 4.97c1.61 0 3.06.56 4.2 1.66l3.15-3.15C17.45 1.67 14.96.5 12 .5A10 10 0 0 0 2.08 6.3l3.47 2.75C6.46 7 9 4.97 12 4.97Z"
            />
        </svg>
    );
}