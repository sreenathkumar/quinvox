import Link from "next/link"

function TermsPage() {
    return (
        <main className="flex-1 flex flex-col bg-background py-16 md:py-20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-start gap-4 mb-20">
                    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
                        Terms of Service (ToS)
                    </h1>
                    <p className="text-xl text-muted-foreground">
                        Last updated: January 2026.
                    </p>
                </div>
                <div className="space-y-16">
                    <section className="space-y-4">
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
                            Agreement to Terms
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">
                            By creating an account on <Link href='https://quinvox.app'><strong>quinvox.app</strong></Link>, you agree to be bound by these Terms of Service. These terms constitute a legally binding agreement between you and Quinvox. If you do not agree to these terms, you must not use the service.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
                            The Quinvox Service
                        </h2>
                        <p>
                            Quinvox is a software-as-a-service (SaaS) platform that allows users to create, manage, and send professional invoices. We grant you a non-exclusive, non-transferable, revocable license to use the software for your internal business purposes.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
                            Billing and Payments (Merchant of Record)
                        </h2>
                        <ul className="my-6 ml-4 list-none [&>li]:mt-3">
                            <li>
                                <strong>Merchant of Record:</strong> Our order process is conducted by our online reseller Paddle.com. Paddle is the Merchant of Record for all our orders. Paddle handles all customer service inquiries regarding billing and returns.
                            </li>
                            <li>
                                <strong>Billing Relationship:</strong> When you subscribe to Quinvox, your transaction is with Paddle. Accordingly, Paddle's <a className="underline" href='https://paddle.com/legal/terms/' target="_blank" rel="noopener noreferrer">Terms of Use</a> and <a className="underline" href='https://paddle.com/legal/privacy/' target="_blank" rel="noopener noreferrer">Privacy Policy</a> also apply to your purchase.
                            </li>
                            <li>
                                <strong>Subscription:</strong> By selecting the "Pro" plan, you authorize Paddle to charge your chosen payment method on a recurring monthly or annual basis until you cancel.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
                            Refund & Cancellation Policy
                        </h2>
                        <ul className="my-6 ml-4 list-none [&>li]:mt-3">
                            <li>
                                <strong>14-Day Money-Back Guarantee:</strong> We offer a full 14-day money-back guarantee for all new subscriptions. If you are unsatisfied for any reason, you are entitled to a full refund within 14 days of your initial purchase.
                            </li>
                            <li>
                                <strong>How to Claim:</strong> To request a refund, please contact Paddle Support or email us at support@quinvox.app with your order ID. Refunds are processed promptly via our Merchant of Record, Paddle.
                            </li>
                            <li>
                                <strong>Cancellation:</strong> You may cancel your subscription at any time through your account settings. After cancellation, you will retain access to Pro features until the end of your current billing cycle.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
                            Ownership and Intellectual Property
                        </h2>

                        <ul className="my-6 ml-4 list-none [&>li]:mt-3">
                            <li>
                                <strong>Our Content:</strong> Quinvox retains all rights, title, and interest in the software, including all code, design, logos, and trademarks.
                            </li>
                            <li>
                                <strong>Your Content:</strong> You retain <strong>100% ownership</strong> of the data you input (client lists, invoice details). You grant us a limited license to host and process this data solely to provide the service to you.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
                            Acceptable Use
                        </h2>
                        <p className="leading-7 [&:not(:first-child)]:mt-6">You agree not to:</p>
                        <ul className="my-6 ml-4 list-none [&>li]:mt-3">
                            <li>
                                Use Quinvox for any fraudulent or illegal financial activities.
                            </li>
                            <li>
                                Attempt to reverse-engineer or "scrape" the software.
                            </li>
                            <li>
                                Upload malicious code or interfere with the service’s infrastructure.
                            </li>
                        </ul>
                    </section>

                    <section className="space-y-4 p-6 rounded-lg bg-muted/50 border border-border">
                        <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
                            Limitation of Liability
                        </h2>
                        <p className="leading-7">
                            To the maximum extent permitted by law, Quinvox shall not be liable for any indirect, incidental, or consequential damages (including loss of profits or data) arising out of your use of the service. The service is provided "as is."
                        </p>
                    </section>

                    <section className="mt-20 ">
                        <p className="text-sm text-muted-foreground">
                            Questions? Contact our team at{" "}
                            <a href="mailto:hello@quinvox.app" className="font-medium underline underline-offset-4">
                                support@quinvox.app
                            </a>
                        </p>
                    </section>
                </div>
            </div>
        </main>
    )
}

export default TermsPage