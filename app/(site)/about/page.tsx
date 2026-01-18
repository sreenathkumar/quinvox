import { Button } from '@/components/ui/button'
import { Code2, Heart, Newspaper, Zap } from 'lucide-react'
import Link from 'next/link'

function page() {
    return (
        <main className='flex-1 flex flex-col bg-background py-16 md:py-20'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <section className="text-center space-y-4 mb-16">
                    <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                        Our Story
                    </h2>
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
                        Built by builders, <br />for builders.
                    </h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Quinvox was born out of a simple frustration: invoicing shouldn't be the hardest part of a developer's day.
                    </p>
                </section>

                <div className="flex gap-12 items-center mb-24">
                    <div className="flex gap-16 justify-between items-center space-y-6">
                        <h3 className="text-2xl font-bold tracking-tight text-nowrap">The Pixelated Code Origin</h3>
                        <div className='flex flex-col gap-4'>
                            <p className="text-muted-foreground leading-relaxed">
                                As a development agency at <strong>Pixelated Code</strong>, we spent years using figma templates and excels. We realized that for most freelancers and small teams, invoicing was a tedious, time-consuming task that took away from what they loved most: building software.
                            </p>
                            <p className="text-muted-foreground leading-relaxed">
                                We wanted a tool that was fast, minimalist, and produced invoices that actually looked professional. When we couldn't find it, we built it.
                            </p>
                        </div>
                    </div>
                    {/* <div className="bg-muted rounded-2xl aspect-square flex items-center justify-center border border-dashed border-muted-foreground/50">
                        <span className="text-muted-foreground font-medium italic">Quinvox Design Studio</span>
                    </div> */}
                </div>

                <section className="space-y-12">
                    <div className="text-center">
                        <h3 className="text-3xl font-bold mb-4">Our Philosophy</h3>
                        <p className="text-muted-foreground">Four principles that guide every line of code we write.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                            <Zap className="h-8 w-8 text-primary mb-4" />
                            <h4 className="font-bold text-lg mb-2">Speed over Everything</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                Every millisecond counts. We optimize Quinvox to ensure you can go from "Login" to "Print" in under 60 seconds.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                            <Code2 className="h-8 w-8 text-primary mb-4" />
                            <h4 className="font-bold text-lg mb-2">Developer Experience</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We build with modern tech stacks like Next.js and MongoDB to ensure the interface is as snappy as your favorite IDE.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                            <Newspaper className="h-8 w-8 text-primary mb-4" />
                            <h4 className="font-bold text-lg mb-2">Personalized Experience</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                We understand that every developer's needs are unique. That's why we offer personalized templates, custom branding options with our expert dev team.
                            </p>
                        </div>

                        <div className="p-8 rounded-2xl border bg-card hover:shadow-lg transition-shadow">
                            <Heart className="h-8 w-8 text-primary mb-4" />
                            <h4 className="font-bold text-lg mb-2">Human Support</h4>
                            <p className="text-sm text-muted-foreground leading-relaxed">
                                When you email us, you're talking to the engineers who built the app, not a chatbot. We care about your business success.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="mt-24 p-12 rounded-3xl bg-primary text-primary-foreground text-center space-y-6">
                    <h3 className="text-3xl font-bold">Ready to simplify your billing?</h3>
                    <p className="text-primary-foreground/80 max-w-xl mx-auto">
                        Join hundreds of professionals who have ditched the spreadsheets for Quinvox.
                    </p>
                    <Button className="bg-background text-foreground px-8 py-3 rounded-full font-bold hover:opacity-80 hover:bg-background/80 transition-opacity" asChild>
                        <Link href='/pricing'>
                            Start your 14-day free trial
                        </Link>
                    </Button>
                </section>
            </div>
        </main>
    )
}

export default page