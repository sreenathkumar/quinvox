import { string, z } from "zod";

const ALLOWED_DOMAINS = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com",
  "icloud.com",
  "live.com",
];

export const itemSchema = z.object({
  id: string().uuid(),
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
  clientCountry: z.string().optional().nullable(),
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
  saveClient: z.boolean().optional(),
});

export const contactFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email address." }).min(1, { message: "Email is required." }).refine(
    (email) => {
      const domain = email.split('@').pop()?.toLowerCase();

      return domain && ALLOWED_DOMAINS.includes(domain);
    },
    {
      message: "Please use your primary email domain (e.g., Gmail, Outlook, Yahoo, Hotmail, Icloud, Live).",
    }
  ),
  subject: z.string().min(10, { message: "Subject must be 10 characters." }),
  message: z.string().min(20, { message: "Please describe your project..." })
    .refine((val) => !/https?:\/\//i.test(val), {
      message: "Please do not include links in your initial message."
    }),
});

export const profileSchema = z.object({
  userId: z.string().nullish(),
  name: z.string().min(1, { message: "Client name is required." }),
  email: z.string().email({ message: "Invalid client email." }).min(1, { message: "Client email is required." }),
  address: z.string().min(1, { message: "Client address is required." }),
  country: z.string({ message: "Client country is required." }).min(1).nullish(),
  phone: z.string().nullish(),
  type: z.enum(['Individual', 'Business', 'Company']),
});

export type InvoiceData = z.infer<typeof invoiceSchema>;
export type InvoiceItem = z.infer<typeof itemSchema>;
export type ContactFormData = z.infer<typeof contactFormSchema>;
export type ProfileData = z.infer<typeof profileSchema>;
export type ClientData = z.infer<typeof profileSchema>;
export type BillerData = z.infer<typeof profileSchema>;
export type ServerResponse<T = any> = {
  success: boolean;
  data?: T;
  message: string;
  code?: string;
}
