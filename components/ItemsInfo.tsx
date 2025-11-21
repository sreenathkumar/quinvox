'use client'

import { Plus } from "lucide-react"
import SingleItem from "./SingleItem"
import { Button } from "./ui/button"
import { FormMessage } from "./ui/form"
import { useFieldArray, UseFormReturn } from "react-hook-form"
import { InvoiceFormData } from "@/types"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const defaultItem = {
    description: '',
    quantity: 1,
    unit_price: 0,
}

function ItemsInfo({ form }: { form: UseFormReturn<InvoiceFormData> }) {
    const { fields, append, remove } = useFieldArray({
        control: form.control,
        name: 'items',
    });
    return (
        <Card>
            <CardHeader>
                <CardTitle>Items</CardTitle>
                <CardDescription>
                    Add items to your invoice including description, quantity, and price.
                </CardDescription>
            </CardHeader>
            <CardContent>
                {fields.map((items, index: number) => (
                    <SingleItem key={index} form={form} index={index} isFirst={index === 0} onRemove={() => remove(index)} />
                ))}

                <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-4 w-full"
                    onClick={() => append({
                        id: crypto.randomUUID(), ...defaultItem,
                    })}
                >
                    <Plus className="mr-2 h-4 w-4" /> Add Item
                </Button>
                <FormMessage>{form.formState.errors.items?.message}</FormMessage>
            </CardContent>
        </Card>
    )
}

export default ItemsInfo