import { render, screen } from "@testing-library/react"
import { describe, test, expect } from "vitest";
import BillerInfo from "./BillerInfo";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InvoiceData, invoiceSchema } from "@/lib/definitions";
const defaultValues: InvoiceData = {
    invoiceNumber: `INV-${new Date().getTime().toString().slice(-6)}`,
    billerName: '',
    billerAddress: '',
    billerEmail: '',
    billerPhone: '',
    clientType: 'Individual',
    clientName: '',
    clientAddress: '',
    clientEmail: '',
    date: new Date(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)),
    items: [{ id: '', description: '', quantity: 1, unit_price: 0 }],
    tax: 0,
    notes: '',
};
function Wrapper() {
    const form = useForm<InvoiceData>({
        resolver: zodResolver(invoiceSchema),
        defaultValues
    });

    return <FormProvider {...form}><BillerInfo form={form} /></FormProvider>
}

describe("Test: BillerInfo Component", () => {
    test("should render BillerInfo component correctly", () => {
        //render the component
        render(<Wrapper />);
        //check the required fields are present
        expect(screen.getByLabelText("Name")).toBeDefined();
        expect(screen.getByLabelText("Email")).toBeDefined();
        expect(screen.getByLabelText("Phone")).toBeDefined();
        expect(screen.getByLabelText("Address")).toBeDefined();
        expect(screen.getByLabelText("Country")).toBeDefined();
    });
});