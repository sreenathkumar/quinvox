
interface ContactInfoItemProps {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    title: string;
    content: React.ReactNode;
}
function ContactInfoItem({ icon: Icon, title, content }: ContactInfoItemProps) {
    return (
        <div className="flex items-start space-x-4">
            <div className="flex-shrink-0 p-3 bg-accent rounded-full text-foreground shadow-lg">
                <Icon className="w-5 h-5" />
            </div>
            <div>
                <p className="text-lg font-semibold text-foreground">{title}</p>
                <p className="text-muted-foreground">{content}</p>
            </div>
        </div>)
}
export default ContactInfoItem