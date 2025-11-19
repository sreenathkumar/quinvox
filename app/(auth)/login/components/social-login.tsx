'use client';

import { Button } from "@/components/ui/button";
import authClient from "@/lib/auth-client";
import { redirect } from "next/navigation";

function SocialLogin() {
    async function handleSocialSignup(provider: string) {
        switch (provider) {
            case 'Google':
                const googleResponse = await authClient.signIn.social({
                    provider: 'google',
                });

                if (googleResponse.error) {
                    redirect('/error');
                }

                if (googleResponse.data?.url) {
                    redirect(googleResponse.data.url);
                }
                break;

            case 'Facebook':
                const fbResponse = await authClient.signIn.social({
                    provider: 'facebook',
                });

                if (fbResponse.error) {
                    redirect('/error');
                }

                if (fbResponse?.data?.url) {
                    redirect(fbResponse.data.url);
                }
                break;

            case 'Linkedin':
                const liResponse = await authClient.signIn.social({
                    provider: 'linkedin',
                });

                if (liResponse.data?.url) {
                    redirect(liResponse.data.url);
                }
                break;
            default:
                console.log(`Social signup with ${provider} is not implemented yet.`);
        }
    }

    return (
        <div className="space-y-3">
            <Button
                onClick={() => handleSocialSignup('Google')}
                variant="outline"
                className="w-full border-border hover:bg-muted text-foreground"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35 11.1h-9.17v2.73h6.51c-.33 3.81-3.5 5.44-6.5 5.44C8.36 19.27 5 16.25 5 12c0-4.1 3.2-7.27 7.2-7.27c3.09 0 4.9 1.97 4.9 1.97L19 4.72S16.56 2 12.1 2C6.42 2 2.03 6.8 2.03 12c0 5.05 4.13 10 10.22 10c5.35 0 9.25-3.67 9.25-9.09c0-1.15-.15-1.81-.15-1.81" /></svg>
                Google
            </Button>

            <Button
                onClick={() => handleSocialSignup('Facebook')}
                variant="outline"
                className="w-full border-border hover:bg-muted text-foreground"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path strokeDasharray="24" strokeDashoffset="24" d="M17 4l-2 0c-2.5 0 -4 1.5 -4 4v12"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="24;0" /></path><path strokeDasharray="8" strokeDashoffset="8" d="M8 12h7"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.5s" dur="0.2s" values="8;0" /></path></g></svg>
                Facebook
            </Button>

            <Button
                onClick={() => handleSocialSignup('Linkedin')}
                variant="outline"
                className="w-full border-border hover:bg-muted text-foreground"
            >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><circle cx="4" cy="4" r="2" fill="currentColor" fillOpacity="0"><animate fill="freeze" attributeName="fill-opacity" dur="0.15s" values="0;1" /></circle><g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4"><path strokeDasharray="12" strokeDashoffset="12" d="M4 10v10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.15s" dur="0.2s" values="12;0" /></path><path strokeDasharray="12" strokeDashoffset="12" d="M10 10v10"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.45s" dur="0.2s" values="12;0" /></path><path strokeDasharray="24" strokeDashoffset="24" d="M10 15c0 -2.76 2.24 -5 5 -5c2.76 0 5 2.24 5 5v5"><animate fill="freeze" attributeName="stroke-dashoffset" begin="0.65s" dur="0.2s" values="24;0" /></path></g></svg>
                LinkedIn
            </Button>
        </div>
    )
}

export default SocialLogin