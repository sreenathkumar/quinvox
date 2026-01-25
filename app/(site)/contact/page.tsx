import { Card } from "@/components/ui/card";
import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import ContactForm from "./components/contact-form";
import ContactInfoItem from "./components/contact-info-item";
import FAQ from "./components/faq-section";

function ContactPage() {
    return (
        <main className="min-h-screen bg-background flex flex-col py-16">
            <section className="container mx-auto px-4 pb-16 flex flex-col flex-1 sm:px-6 lg:px-8">

                <div className="text-center mb-12">
                    <h1 className="text-4xl text-foreground sm:text-5xl font-extrabold leading-tight">
                        Get In Touch
                    </h1>
                    <p className="mt-4 text-muted-foreground text-xl max-w-2xl mx-auto">
                        We're here to help you with any questions about invoicing, payments, or upgrading your account.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-3">
                        <Card className="p-6 md:p-10">
                            <h2 className="text-2xl font-bold text-foreground mb-6 flex items-center">
                                Send us a message <MessageSquare className="w-6 h-6 ml-3 text-accent" />
                            </h2>
                            <ContactForm />
                        </Card>
                    </div>

                    <div className="lg:col-span-2 space-y-8 mt-4 lg:mt-0">
                        <Card className=" text-white shadow-xl border p-6 md:p-8 space-y-6">
                            <h3 className="text-xl font-bold border-b border-white/20 pb-4">
                                General Support
                            </h3>
                            <ContactInfoItem
                                icon={Mail}
                                title="Email Us"
                                content={<a href="mailto:support@quinvox.app" className="hover:underline">support@quinvox.app</a>}
                            />
                            {/* <ContactInfoItem
                                icon={Phone}
                                title="Call Us"
                                content="Mon-Fri, 9am - 5pm GMT"
                            /> */}
                            <ContactInfoItem
                                icon={MapPin}
                                title="Visit Us"
                                content="Satkhira, Khulna, Bangladesh"
                            />
                        </Card>
                    </div>
                </div>

            </section>
            <FAQ />
        </main>
    )
}

export default ContactPage