import { AlertCircle, Home } from "lucide-react";
import Link from "next/link";
import ErrorMessage from "./components/error-message";
import { Suspense } from "react";

function ErrorPage() {
    return (
        <main className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-card border border-border rounded-lg shadow-lg p-8">
                    <div className="flex justify-center mb-6">
                        <div className="bg-destructive/10 p-4 rounded-full">
                            <AlertCircle className="w-8 h-8 text-destructive" />
                        </div>
                    </div>
                    <Suspense fallback={null}>
                        <ErrorMessage />
                    </Suspense>
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
            </div>
        </main>
    )
}

export default ErrorPage