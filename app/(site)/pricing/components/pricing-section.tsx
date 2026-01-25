import { PlanProvider } from "@/contexts/PlanProvider"
import FeatureItem from "./feature-item"
import PricingPlan from "./pricing-plan"
import SwitchPlan from "./switch-plan"

function PricingSection() {
    return (
        <section className="py-16 md:py-20">
            <div className="container mx-auto px-4 flex flex-col gap-10 sm:px-6 lg:px-8">
                <PlanProvider>
                    <SwitchPlan />
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                        <PricingPlan
                            name='free'
                            heading=''
                            description=''
                            price='0'
                            cta="Start for free"
                        >
                            <FeatureItem available={true}>Create & edit invoices</FeatureItem>
                            <FeatureItem available={true}>Local storage only</FeatureItem>
                            <FeatureItem available={true}>Export as PDF</FeatureItem>
                            <FeatureItem available={false}>Multi-device sync</FeatureItem>
                            <FeatureItem available={false}>Saved clients & reusable biller profiles</FeatureItem>
                            <FeatureItem available={false}>Multiple templates</FeatureItem>
                            <FeatureItem available={false}>Data backup + restore</FeatureItem>
                        </PricingPlan>
                        <PricingPlan
                            name='pro'
                            heading='Pro Plan'
                            description='Ideal for growing businesses that need more features.'
                            price={'10'}
                            note='14-day free trial. Cancel anytime.'
                            bedge='Recommended'
                            cta='Contact Sales'
                        >
                            <FeatureItem available={true}>Create & edit invoices</FeatureItem>
                            <FeatureItem available={true}>Local and Cloud storage</FeatureItem>
                            <FeatureItem available={true}>Export and Print as PDF</FeatureItem>
                            <FeatureItem available={true}>Cloud sync on all devices (2 devices)</FeatureItem>
                            <FeatureItem available={true}>Saved clients, biller profiles & autofill</FeatureItem>
                            <FeatureItem available={true}>Multiple premium templates</FeatureItem>
                            <FeatureItem available={true}>Data backup + restore</FeatureItem>
                        </PricingPlan>
                    </div>
                </PlanProvider>
            </div>
        </section>
    )
}

export default PricingSection