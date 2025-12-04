import { Check, X } from "lucide-react"

function FeatureItem({ children, available = true }: { children: React.ReactNode; available?: boolean }) {
    return (
        <div className={`flex items-start transition-opacity ${available ? '' : 'opacity-50'}`}>
            {available ? (
                <Check className="flex-shrink-0 h-5 w-5 text-accent mt-1" />
            ) : (
                <X className="flex-shrink-0 h-5 w-5 text-accent mt-1" />
            )}
            <p className={`ml-3 text-base text-foreground ${!available ? 'line-through' : (available ? 'font-medium' : '')}`}>
                {children}
            </p>
        </div>)
}
;

export default FeatureItem