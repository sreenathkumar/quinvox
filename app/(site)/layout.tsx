import Header from "@/components/Header"


function SiteLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Header />
            {children}
        </>
    )
}

export default SiteLayout