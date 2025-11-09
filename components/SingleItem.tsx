'use client'

import { formatCurrency } from "@/lib/utils"
import { Trash2 } from "lucide-react"
import { UseFormReturn } from "react-hook-form"
import { FormFieldWrapper } from "./FormFieldWrapper"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface SingleItemProps {
  form: UseFormReturn<any>
  onRemove?: () => void,
  isFirst?: boolean,
  index: number
}

function SingleItem({ form, onRemove, isFirst, index }: SingleItemProps) {
  const quantity = form.watch(`items.${index}.quantity`) || 1;
  const unitPrice = form.watch(`items.${index}.unit_price`) || 0;
  return (
    <div className="space-y-3 mb-10">
      <FormFieldWrapper
        control={form.control}
        name={`items.${index}.description`}
        label="Description"
        component={Input}
        placeholder="Item Description"
      />
      <div className="grid grid-cols-3 gap-3">
        <FormFieldWrapper
          control={form.control}
          name={`items.${index}.quantity`}
          label="Quantity"
          type="number"
          component={Input}
          placeholder="1"
          min={1}
        />
        <FormFieldWrapper
          control={form.control}
          name={`items.${index}.unit_price`}
          label="Price"
          type="number"
          component={Input}
          placeholder="10"
        />

        <div className="flex items-center justify-between bg-muted px-4 rounded-md">
          {/* {isFirst && <FormLabel>&nbsp;</FormLabel>} */}
          <span aria-label="item_price" className="text-sm font-medium">
            {formatCurrency(quantity * unitPrice)}
          </span>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-destructive hover:text-destructive/80 p-0 h-auto w-auto"
            onClick={onRemove}
            aria-label="remove-item"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default SingleItem