'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { Textarea } from "./ui/textarea";
import SearchProfileInput from './SearchProfileInput';
import { InvoiceData } from "@/lib/definitions";
import { User } from "@/lib/auth";

function BillerInfo({ form, user }: { form: UseFormReturn<InvoiceData>, user?: User }) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Biller Information</CardTitle>
        <CardDescription>Enter information about the biller.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={form.control}
          name="billerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                {
                  (user?.plan === 'pro' || user?.role === 'admin') ? (
                    <SearchProfileInput
                      {...field}
                      placeholder="Biller Name"
                      setValue={form.setValue}
                      profile="biller"
                      className='capitalize'
                      autoComplete="off"
                    />
                  ) : (
                    <Input placeholder="Biller Name" {...field} />
                  )
                }
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billerEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone</FormLabel>
              <FormControl>
                <Input placeholder="+1 (555) 123-4567" {...field} value={field.value ?? ""} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="billerAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Your Address"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  )
}

export default BillerInfo