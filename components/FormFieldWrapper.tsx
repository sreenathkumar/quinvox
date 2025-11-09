// components/FormFieldWrapper.tsx
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { InputHTMLAttributes } from "react";

interface FormFieldWrapperProps extends InputHTMLAttributes<HTMLInputElement> {
  control: any;
  name: string;
  label: string;
  component: React.ElementType;
  placeholder?: string;
  type?: string;
  className?: string;
}

export function FormFieldWrapper({
  control,
  name,
  label,
  component: Component,
  placeholder,
  type,
  className,
  ...rest
}: FormFieldWrapperProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Component {...field} {...rest} type={type} placeholder={placeholder} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
