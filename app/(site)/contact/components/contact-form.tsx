'use client';

import { saveUserQuery } from "@/actions/userQuery";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ContactFormData, contactFormSchema } from "@/lib/definitions";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

const defaultValues: ContactFormData = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

function ContactForm() {
  const [status, setStatus] = useState<undefined | { type: string, message: string }>();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues,
  })

  const handleSubmit: SubmitHandler<ContactFormData> = async (data) => {
    //save response to database
    const result = await saveUserQuery(data);

    if (result.success) {
      setStatus({
        type: 'success',
        message: 'Your message is reveived. We will get back to you shortly.'
      })
    } else {
      setStatus({
        type: 'error',
        message: result.error || 'An error occurred while submitting the form. Please try again later.'
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}
        id="contact-form"
        className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Jane Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="you@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl>
                <Input placeholder="Purchase the Pro plan." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Tell us how we can help..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="flex items-center justify-center space-x-2"
        >
          {form.formState.isSubmitting ? (
            <>
              {/* Simple Loading Spinner */}
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Submit Message</span>
            </>
          )}
        </Button>
        {status?.type === 'success' && (
          <p className="text-center text-green-500 font-semibold mt-4">
            {status.message}
          </p>
        )}
        {status?.type === 'error' && (
          <p className="text-center text-red-500 font-semibold mt-4">
            {status.message}
          </p>
        )}
      </form>
    </Form>

  )
}

export default ContactForm