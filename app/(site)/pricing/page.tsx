import FOMOSection from './components/fomo-section';
import PricingSection from './components/pricing-section';
import Link from 'next/link';

function PricingPage() {
    return (
        <main className="flex-1 flex flex-col bg-background py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h1 className="text-4xl sm:text-5xl font-extrabold text-foreground leading-tight">
                    Simple Pricing Powerful Invoicing
                </h1>
                <p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
                    Choose the package that fits your business, whether you're just starting out or managing large-scale operations.
                </p>
            </div>
            <PricingSection />
            <FOMOSection />
            <section className="pt-16 mt-auto md:pt-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold text-foreground">Need more features?</h2>
                    <p className="mt-4 text-muted-foreground">A detailed breakdown of the features included in each plan.</p>

                    <Link href="/contact" className="mt-6 inline-block text-accent font-medium hover:text-accent/90 transition duration-150">
                        Contact Us for a Custom Quote &rarr;
                    </Link>
                    <br />
                </div>
            </section>
        </main>
    )
}

export default PricingPage