import { string, z } from "zod";

export const itemSchema = z.object({
  id: string().optional().nullable(),
  description: z.string().min(1, { message: "Description is required." }),
  quantity: z.coerce.number().min(0.01, { message: "Quantity is required." }),
  unit_price: z.coerce.number().min(0, { message: "Price is required." }),
});

export const invoiceSchema = z.object({
  id: z.string().optional(),
  userId: z.string().optional(),
  invoiceNumber: z.string().min(1, { message: "Invoice number is required." }),
  billerName: z.string().min(1, { message: "Biller name is required." }),
  billerEmail: z.string().email({ message: "Invalid Biller email." }).min(1, { message: "Biller email is required." }),
  billerPhone: z.string().nullable().optional(),
  billerAddress: z.string().min(1, { message: "Biller address is required." }),
  clientType: z.enum(['Individual', 'Business', 'Company']),
  clientName: z.string().min(1, { message: "Client name is required." }),
  clientAddress: z.string().min(1, { message: "Client address is required." }),
  clientEmail: z.string().email({ message: "Invalid client email." }).min(1, { message: "Client email is required." }),
  date: z.date({
    required_error: "Invoice date is required.",
  }),
  dueDate: z.date({
    required_error: "Due date is required.",
  }),
  items: z.array(itemSchema).min(1, { message: "Please add at least one item." }),
  tax: z.coerce.number().min(0).max(100).default(0).optional().nullable(),
  notes: z.string().optional().nullable(),
});

export type Invoice = z.infer<typeof invoiceSchema>;
export type InvoiceItem = z.infer<typeof itemSchema>;
