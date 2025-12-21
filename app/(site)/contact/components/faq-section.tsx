import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
    {
        id: 1,
        category: "General",
        question: "What is Quinvox?",
        answer: "Quinvox is a high-speed web app designed for freelancers to generate professional invoices. It replaces manual design tools with a streamlined workflow that saves you time."
    },
    {
        id: 2,
        category: "Pricing",
        question: "Is Quinvox free to use?",
        answer: "Yes! You can generate and download PDF invoices for free. Free users store data locally in their browser, while Pro users enjoy secure cloud storage and cross-device sync."
    },
    {
        id: 3,
        category: "Storage",
        question: "Where is my data saved?",
        answer: "For free users, data is saved in your browser's local storage. For Pro users, all invoices, profiles, and client data are securely backed up in the cloud, allowing you to access them from any device."
    },
    {
        id: 4,
        category: "Features",
        question: "How does the 'One-Click Autofill' work?",
        answer: "Pro users can save client details to their database. When creating a new invoice, simply select a client from the dropdown, and Quinvox instantly populates all their information."
    },
    {
        id: 5,
        category: "Storage",
        question: "Will I lose my data if I clear my browser cache?",
        answer: "Free users will lose their local data if the browser cache is cleared. We recommend the Pro plan for permanent, worry-free cloud backups of your financial history."
    },
    {
        id: 6,
        category: "Features",
        question: "Can I download invoices as PDFs?",
        answer: "Absolutely. Every invoice generated on Quinvox can be downloaded as a clean, professional PDF ready to be sent to your clients."
    },
    {
        id: 7,
        category: "Security",
        question: "Is my financial data secure?",
        answer: "Yes. We prioritize your privacy. Pro data is encrypted and stored securely, and we never share your client or billing information with third parties."
    },
    {
        id: 8,
        category: "Pro Plan",
        question: "What are the main benefits of Quinvox Pro?",
        answer: "Pro unlocks the full power of Quinvox: Cloud saving, invoice history tracking, business profile management, and a permanent client database for maximum efficiency."
    }
];

function FAQ() {
    return (
        <section className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-foreground mb-3">Frequently Asked Questions</h2>
                <p className="text-muted-foreground">Everything you need to know about Quinvox</p>
            </div>
            <Accordion type="multiple" className="space-y-4">
                {faqs.map((faq) => (
                    <FAQItem key={faq.id} faq={faq} />
                ))}
            </Accordion>
        </section>
    )
}

function FAQItem({ faq }: { faq: { id: number, category: string, question: string, answer: string } }) {
    return (
        <AccordionItem
            value={`${faq.category}-${faq.id}`}
            className="border border-border rounded-lg px-6 bg-card"
        >
            <AccordionTrigger className="text-left font-medium hover:no-underline">
                {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
        </AccordionItem>
    )
}

export default FAQ