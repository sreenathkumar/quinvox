import { CloudAlert, MonitorX, TrendingDown } from "lucide-react"
import Link from "next/link"
import FOMOItem from "./fomo-item"


function FOMOSection() {
    return (
        <section className="py-16 bg-accent/80 text-foreground md:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
                    Don't Let Your Invoicing Slow You Down
                </h2>
                <p className="text-lg opacity-80">
                    While the Free plan gets you started, relying on limited features means:
                </p>
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <FOMOItem heading="Lose Important Data" description="Your invoices are not backed up on the Free plan. One browser crash or device reset, your data is gone." Icon={MonitorX} />
                    <FOMOItem heading="No Cloud Sync" description="Your invoices aren’t syncing across devices. Free plan stores everything locally on one device/browser." Icon={CloudAlert} />
                    <FOMOItem heading="Limited Growth" description="No saved clients on Free. Upgrade to Pro for instant autofill and faster invoicing." Icon={TrendingDown} />
                </div>
                <Link href={'/contact'} className="block mt-10 max-w-sm mx-auto text-background bg-foreground p-4 rounded-md hover:bg-foreground/70" >
                    Unlock Unlimited Growth with Premium Pro
                </Link>
            </div>
        </section>
    )
}

export default FOMOSection