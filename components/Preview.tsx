'use client'

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { toast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { formatCurrency } from '@/lib/utils';
import { format, formatDistance } from 'date-fns';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Download, Printer } from 'lucide-react';
import { UseFormReturn } from 'react-hook-form';
import TableRowItem from './TableRowItem';
import { Button } from './ui/button';
import { useReactToPrint } from 'react-to-print';
import { useRef } from 'react';

interface PreviewProps {
    form: UseFormReturn<any>;
    total: number;
    subtotal: number;
    taxAmount: number;
    watchedItems: Array<{
        description: string;
        quantity: number;
        unit_price: number;
    }>;
    watchedTax?: number;
}

function Preview({ form, watchedItems, watchedTax, total, taxAmount, subtotal }: PreviewProps) {
    const pdfRef = useRef(null);
    const handlePrint = useReactToPrint({
        contentRef: pdfRef,
        documentTitle: `Invoice-${form.getValues('invoiceNumber')}`,
        pageStyle: `
      @page { size: auto; margin: 1cm; }
      @media print { body { -webkit-print-color-adjust: exact !important; color-adjust: exact !important; print-color-adjust:exact !important; } }
    `,
    })

    const generatePDF = async () => {
        const invoiceElement = document.getElementById('invoice-pdf');
        if (!invoiceElement) return;

        toast({ title: 'Generating PDF...', description: 'Please wait a moment.' });

        const canvas = await html2canvas(invoiceElement, { scale: 2 });
        const imgData = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save(`Invoice-${form.getValues('invoiceNumber')}.pdf`);
    };

    const logoPlaceholder = PlaceHolderImages.find((p) => p.id === 'logo');
    return (
        <Card>
            <CardHeader className="flex-row items-center justify-between">
                <CardTitle>Preview</CardTitle>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={generatePDF}>
                        <Download className="mr-2 h-4 w-4" /> Download
                    </Button>
                    <Button variant="outline" size="sm" onClick={handlePrint}>
                        <Printer className="mr-2 h-4 w-4" /> Print
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div ref={pdfRef} id='invoice-pdf' className="bg-white p-6">
                    <div className="max-w-4xl mx-auto flex flex-col h-full">
                        {/* Header Section */}
                        <div className="mb-8">
                            <h1 className="text-4xl text-black font-bold mb-8">Invoice</h1>

                            {/* Invoice Details - Top Right */}
                            <div className="grid grid-cols-3 gap-8 mb-12">
                                <div className="space-y-1">
                                    <p className="text-sm text-black font-semibold mb-2">Payable: {formatCurrency(total)}</p>
                                    <p className="text-xs text-gray-600">Dues {format(form.watch('dueDate'), 'P')}</p>
                                    <p className="text-xs text-gray-600">Issued {format(form.watch('date'), 'P')}</p>
                                    <p className="text-xs text-gray-600">Ref. {form.getValues('invoiceNumber')}</p>
                                </div>
                                <div className='space-y-1'>
                                    <p className="text-sm font-semibold text-black mb-2">Billed to</p>
                                    <p className="text-xs font-semibold text-gray-600">{form.watch('clientName')}</p>
                                    <p className="text-xs text-gray-600">{form.watch('clientType')}</p>
                                    <p className="text-xs text-gray-600">{form.watch('clientAddress')}</p>
                                </div>
                                <div className='space-y-1'>
                                    <p className="text-sm font-semibold text-gray-600 mb-2">From</p>
                                    <p className="text-xs font-semibold text-gray-600">{form.watch('billerName')}</p>
                                    <p className="text-xs text-gray-600">{form.watch('billerAddress')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Items Table */}
                        <div className="mb-8 grid md:grid-cols-[116px_repeat(2,minmax(0,1fr))]">
                            <div className='md:col-start-2 md:col-span-2 text-sm md:pl-4 md:border-l-[2px] md:border-[#895af6]'>
                                <table className="w-full mb-8 border-b border-gray-200">
                                    <thead>
                                        <tr>
                                            <th className="text-left font-normal pb-3 pt-1 px-0 text-gray-600 text-xs">ITEM DESCRIPTION</th>
                                            <th className="text-right font-normal pb-3 pt-1 px-4 text-gray-600 text-xs">QTY</th>
                                            <th className="text-right font-normal pb-3 pt-1 px-4 text-gray-600 text-xs">RATE</th>
                                            <th className="text-right font-normal pb-3 pt-1 px-0 text-gray-600 text-xs">AMOUNT</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            watchedItems.map((item, index) => <TableRowItem key={index} description={item.description} quantity={item.quantity} rate={formatCurrency(item.unit_price)} amount={formatCurrency(item.quantity * item.unit_price)} />)
                                        }
                                    </tbody>
                                </table>

                                {/* Summary Section */}
                                <div className="flex flex-col w-full ">
                                    <div className="flex justify-between py-3">
                                        <span className="text-gray-600 text-xs font-semibold ">Subtotal</span>
                                        <span className="text-gray-900 text-xs font-semibold">{formatCurrency(subtotal)}</span>
                                    </div>
                                    <div className="flex justify-between py-3 ">
                                        <span className="text-gray-600 text-xs font-semibold">Tax({watchedTax || 0}%)</span>
                                        <span className="text-gray-900 font-medium">{formatCurrency(taxAmount)}</span>
                                    </div>
                                    <div className="flex justify-between pt-3 pb-1 font-bold text-lg border-t border-gray-300">
                                        <span className="text-gray-900 text-xs font-bold">Total <span className='text-gray-600'>(USD)</span></span>
                                        <span className="text-[#895af6] text-sm font-bold">{formatCurrency(total)}</span>
                                    </div>

                                </div>
                            </div>
                        </div>

                        {/* Payment Details Section */}
                        <div className='grid md:grid-cols-[116px_repeat(2,minmax(0,1fr))] mt-24'>
                            <div className="py-1 md:col-start-2 md:col-span-2 text-sm md:pl-4 md:border-l-[2px] md:border-[#895af6]">
                                <div className='flex justify-between gap-4'>
                                    <div>
                                        <h2 className="text-xs font-bold text-gray-900 mb-1">Payment details</h2>
                                        <p className="text-xs text-gray-600">Please pay within {formatDistance(form.watch('dueDate'), form.watch('date'))} of receiving this invoice.</p>
                                    </div>

                                    <div className="flex flex-col">
                                        <p className="text-xs text-gray-600 mb-1 text-nowrap">Bank name</p>
                                        <p className="text-xs font-semibold text-gray-900">Payoneer</p>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="text-gray-600 mt-10 md:col-start-2 md:col-span-2 text-sm md:pl-4 md:border-l-[2px] md:border-[#895af6]">
                                <div className='flex justify-between'>
                                    <p className='text-left'>{form.watch('notes') || "Thanks for the business."}</p>
                                    <p className='text-center'>{form.watch('billerEmail')}</p>
                                    <p className='text-right'>{form.watch('billerPhone')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}


export default Preview