import { getAnalytics } from "@/actions/Analytics"
import BillingProfileCard from "./components/billing-profile-card"
import ClientStat from "./components/client-stat"
import StatCard from "./components/dashboard-stat-card"
import RecentInvoicesCard from "./components/recent-invoices-card"
import RevenueCard from "./components/revenue-stat-card"

async function Dashboard() {
  const statistics = await getAnalytics();
  return (
    <div className="flex flex-col gap-10 px-5 py-6">
      {/* stat overview cards */}
      <section className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 ">
        {
          (statistics && statistics?.length > 0) ? statistics.map((stat) => (
            <StatCard key={stat.title} title={stat.title} value={stat.value} growth={stat.growth} />
          )) : <p>No statistics available</p>
        }
      </section>
      <section className="flex flex-col gap-6">
        <RevenueCard />
        <div className="grid gap-6 lg:grid-cols-3 items-start">
          <RecentInvoicesCard />
          <div className="space-y-6">
            <ClientStat />
            <BillingProfileCard />
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard