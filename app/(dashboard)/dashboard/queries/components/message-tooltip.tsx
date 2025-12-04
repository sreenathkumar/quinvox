import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { truncate } from "@/lib/utils"

function MessageTooltip({ content, length = 50 }: { content: string, length?: number }) {
    if (content.length <= length) {
        return content
    }
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <p>{truncate(content, length)}</p>
            </TooltipTrigger>
            <TooltipContent>
                <p>{content}</p>
            </TooltipContent>
        </Tooltip>
    )
}

export default MessageTooltip