'use client';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import authClient from '@/lib/auth-client';
import { useState } from 'react';
import { ControllerRenderProps, UseFormReturn } from 'react-hook-form';
import SearchClientInput from './SearchClientInput';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import Link from 'next/link';
import { Button } from './ui/button';
import { X } from 'lucide-react';

function CustomerInfo({ form }: { form: UseFormReturn<any> }) {
    const { data: session } = authClient.useSession();
    const [showUpgrade, setShowUpgrade] = useState(false);
    const user = session?.user;

    const handleCheckChange = (field: ControllerRenderProps<any, "saveClient">) => {
        if (!field.value && (user?.plan !== 'pro')) {
            setShowUpgrade(true);
            return;
        }

        field.onChange(!field.value);
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Customer Information</CardTitle>
                <CardDescription>
                    Enter the details of the customer for this invoice.
                </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
                <FormField
                    control={form.control}
                    name='clientType'
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Client Type</FormLabel>
                            <FormControl>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Client type" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Individual">Individual</SelectItem>
                                        <SelectItem value="Business">Business</SelectItem>
                                        <SelectItem value="Company">Company</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clientName"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                {
                                    (user?.plan === 'pro' || user?.role === 'admin') ? (
                                        <SearchClientInput placeholder="Client Name" {...field} setValue={form.setValue} />
                                    ) : (
                                        <Input placeholder="Client Name" {...field} />
                                    )
                                }
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clientAddress"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Address</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Client Address"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="clientEmail"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input
                                    type="email"
                                    placeholder="client@example.com"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="saveClient"
                    render={({ field }) => (
                        <FormItem>
                            <div className='relative flex items-center py-2'>
                                <FormControl>
                                    <Checkbox checked={field.value} onCheckedChange={() => handleCheckChange(field)} />
                                </FormControl>
                                <FormLabel className='ml-2'>Save this client</FormLabel>

                                <UpgradeModal isOpen={showUpgrade} onClose={() => setShowUpgrade(false)} />
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </CardContent>
        </Card>
    )
}

function UpgradeModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
    if (!isOpen) {
        return null;
    }

    return (
        <div className="absolute top-1/2 left-1/2 ml-2 -translate-y-1/2 bg-muted p-4 max-w-64 shadow-lg rounded-md h-auto z-50">
            <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1 w-3 h-3 rotate-45 bg-muted shadow-lg"></div>
            <div className="flex flex-col gap-4 relative">
                <X className='ml-auto size-4 cursor-pointer' role='button' onClick={onClose} />
                <p>
                    Saving clients is a Pro feature. Upgrade to Pro to unlock this feature and more!
                </p>
                <Button size="sm" >
                    <Link href="/pricing">Upgrade now!</Link>
                </Button>
            </div>
        </div>
    )
}

export default CustomerInfo