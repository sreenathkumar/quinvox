import Link from "next/link"

function Footer() {
    return (
        <footer className="bg-background border-t py-4 text-center text-sm text-muted-foreground">
            <div className="container mx-auto flex">
                <div className="text-xs text-muted-foreground">
                    A product of <Link className="underline" href='/'>Pixelated Code</Link>. &copy; {new Date().getFullYear()} All rights reserved.
                </div>
                <div className="ml-auto">
                    <ul className="flex items-center gap-3">
                        <li className="text-xs underline">
                            <Link href='/about-us'>
                                About Us
                            </Link>
                        </li>
                        <li className="text-xs underline">
                            <Link href='/privacy-policy'>
                                Privacy Policy
                            </Link>
                        </li>
                        <li className="text-xs underline">
                            <Link href='/terms-of-services'>
                                Terms of Services
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </footer>
    )
}

export default Footer