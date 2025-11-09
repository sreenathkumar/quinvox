import { invoiceSchema } from '@/lib/definitions';
import type { z } from 'zod';

export type InvoiceFormData = z.infer<typeof invoiceSchema>;