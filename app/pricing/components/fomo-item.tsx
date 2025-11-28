import { LucideIcon } from "lucide-react"

function FOMOItem({ heading, description, Icon }: { heading: string, description: string, Icon?: LucideIcon }) {
    return (
        <div className="bg-background p-6 rounded-xl shadow-lg flex flex-col items-center">
            {Icon && <Icon className="w-8 h-8 mb-3 text-muted-foreground" />}
            <h3 className="font-bold text-xl mb-1">{heading}</h3>
            <p className="text-sm text-muted-foreground">{description}</p>
        </div>
    )
}

export default FOMOItem