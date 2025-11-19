'use client';

import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function ErrorPage() {
    const params = useSearchParams();

    const errorCode = params.get('error') || 'Unknown Error';
    const errorMessage = params.get('error_description') || 'An unknown error occurred.';

    return (
        <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-destructive/10 p-4 rounded-full">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-foreground text-center mb-2">
                        {errorCode}
                    </h1>

                    <h2 className="text-xl font-semibold text-foreground text-center mb-3">
                        {errorMessage}
                    </h2>

                    <div className="flex flex-col gap-3">
                        <Link
                            href="/"
                            className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-foreground font-medium py-2.5 px-4 rounded-md transition-colors"
                        >
                            <Home className="w-4 h-4" />
                            Back to Home
                        </Link>

                    </div>
                </div>

                {/* Error Details */}
                {errorMessage && (
                    <div className="mt-6 bg-muted/50 border border-border rounded-lg p-4">
                        <p className="text-xs text-muted-foreground font-mono break-words">
                            <span className="font-semibold">Details:</span> {errorMessage}
                        </p>
                    </div>
                )}
            </div>
        </main>
    )
}

export default ErrorPage