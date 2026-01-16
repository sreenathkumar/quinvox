import Footer from "@/components/Footer"
import Header from "@/components/Header"


function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
            <Footer />
        </>
    )
}

export default SiteLayout