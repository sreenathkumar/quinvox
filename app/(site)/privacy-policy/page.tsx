import Link from "next/link"

function PrivacyPage() {
  return (
    <main className="flex-1 flex flex-col bg-background py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start gap-4 mb-20">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-xl text-muted-foreground">
            Last updated: January 2026. This policy describes how Quinvox handles your data.
          </p>
        </div>
        <div className="space-y-16">
          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
              Overview
            </h2>
            <p className="leading-7 [&:not(:first-child)]:mt-6">
              Quinvox is committed to protecting your privacy and personal information. This policy explains the specific data we collect to provide and improve our invoicing services.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
              Information We Collect
            </h2>
            <ul className="my-6 list-none [&>li]:mt-3">
              <li><strong>Account Data:</strong> Your name and email address provided during registration.</li>
              <li><strong>Invoice Data:</strong> Details of your clients, line items, and financial totals stored securely to provide the service.</li>
              <li><strong>Usage Data:</strong> Anonymized technical logs (IP address, browser type) to improve platform performance.</li>
            </ul>
          </section>

          <section className="space-y-4 p-6 rounded-lg bg-muted/50 border border-border">
            <h2 className="scroll-m-20 text-xl font-semibold tracking-tight">
              Payment Processing
            </h2>
            <p className="leading-7">
              Our order process is conducted by our online reseller <Link href='https://paddle.com'><strong>Paddle.com</strong></Link>. Paddle is the Merchant of Record for all our orders. They handle your payment data and global tax compliance. We do not store your credit card information on our servers.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
              Third-Party Services
            </h2>
            <p className="leading-7">
              We use the following processors to power Quinvox:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 border rounded-md">
                <p className="font-bold">MongoDB Atlas</p>
                <p className="text-sm text-muted-foreground">Your business data and invoices are stored in an encrypted database managed by MongoDB. Data is encrypted at rest using AES-256 and in transit via TLS 1.3.</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="font-bold">Vercel</p>
                <p className="text-sm text-muted-foreground">Your application interface is served via Vercel’s global edge network. This includes technical logs and temporary session tokens.</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="font-bold">Merchant of Record (Paddle)</p>
                <p className="text-sm text-muted-foreground">Paddle is the reseller of our software. They collect your credit card data and billing address. Quinvox never sees or stores your full credit card number.</p>
              </div>
              <div className="p-4 border rounded-md">
                <p className="font-bold">Google Analytics</p>
                <p className="text-sm text-muted-foreground">Analzing the user behaviour to improve the app performence and user experience.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
              Data Retention & Deletion
            </h2>
            <p className="leading-7 text-muted-foreground">
              We don't keep data forever. We follow a strict lifecycle
            </p>
            <ul className="my-6 ml-4 list-none [&>li]:mt-3">
              <li>
                <strong>Active Accounts:</strong> Data is stored indefinitely while your account is in good standing.
              </li>
              <li>
                <strong>Account Cancellation:</strong> If you cancel your subscription, we keep your data for 6 months in case you choose to reactivate. You may request immediate deletion at any time.
              </li>
              <li>
                <strong>The "30-Day Cleanup":</strong> For free trial accounts that never upgrade and show no login activity for 30 days, we reserve the right to purge all data to minimize our "data footprint."
              </li>
              <li>
                <strong>Tax Records:</strong> Note that Paddle may retain transaction records for up to 7 years to comply with global tax laws.
              </li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight border-b pb-2">
              Your Rights (The GDPR/CCPA Clause)
            </h2>
            <p className="leading-7 text-muted-foreground">
              Regardless of your location, we provide these rights to all users:
            </p>
            <ul className="my-6 ml-4 list-none [&>li]:mt-3">
              <li>
                <strong>Right to Access:</strong> Export a JSON copy of all your invoice data (under development).
              </li>
              <li>
                <strong>Right to Rectification:</strong> Update any incorrect business or tax info via your settings (under development).
              </li>
              <li>
                <strong>Right to Erasure:</strong> Click "Delete Account" to trigger the permanent purging of your records from MongoDB Atlas (under development).
              </li>
            </ul>
          </section>

          <section className="mt-20 pt-10 border-t">
            <p className="text-sm text-muted-foreground">
              Questions? Contact our privacy team at{" "}
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

export default PrivacyPage