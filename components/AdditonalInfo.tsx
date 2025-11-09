import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { UseFormReturn } from "react-hook-form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

function AdditonalInfo({ form }: { form: UseFormReturn<any> }) {
    return (
        <div className="flex justify-between gap-4 flex-wrap">
            <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Tax (%)</FormLabel>
                        <FormControl>
                            <Input type="number" placeholder="0" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="notes"
                render={({ field }) => (
                    <FormItem className="grow">
                        <FormLabel>Notes</FormLabel>
                        <FormControl>
                            <Textarea
                                placeholder="Thank you for your business."
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

        </div>
    )
}

export default AdditonalInfo