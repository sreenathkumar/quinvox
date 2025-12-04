'use client'

import { redirect, useSearchParams } from "next/navigation";

function ErrorMessage() {
    const params = useSearchParams();

    const errorCode = params.get('error');
    const errorMessage = params.get('error_description');

    if (!errorCode && !errorMessage) {
        redirect('/');
    }

    return (
        <>
            <h1 className="text-4xl font-bold text-foreground text-center mb-2">
                {errorCode}
            </h1>

            <h2 className="text-xl font-semibold text-foreground text-center mb-3">
                {errorMessage}
            </h2>
        </>
    )
}


export default ErrorMessage