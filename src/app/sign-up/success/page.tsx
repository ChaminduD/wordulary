export default function SignUpSuccessPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="max-w-md text-center space-y-4">
                <h1 className="text-2xl font-bold">
                    Check Your Email
                </h1>

                <p className="text-muted-foreground">
                    We sent you a verification link.
                    Please verify your email address
                    before signing in.
                </p>
            </div>
        </main>
    );
}