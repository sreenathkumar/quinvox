'use client';

import { sendMail } from "@/actions/sendMail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { FormEvent, useState } from "react";


function ContactForm() {
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(e.currentTarget);
    await sendMail(formData);

    setPending(false);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex flex-col gap-3">
        <Label htmlFor="name" >
          Name
        </Label>
        <Input
          name="name"
          id="name"
          placeholder="Jane Doe"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="email">
          Email
        </Label>
        <Input
          type="email"
          name="email"
          id="email"
          placeholder="you@example.com"
        />
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="message">
          Message
        </Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us how we can help..."
        />
      </div>

      <Button
        type="submit"
        className="flex items-center justify-center space-x-2"
      >
        {pending ? (
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

      {/* Submission Status Message
      {status === 'success' && (
        <p className="text-center text-secondary font-semibold mt-4">
          Thank you! Your message has been sent successfully. We will respond shortly.
        </p>
      )}
      {status === 'error' && (
        <p className="text-center text-red-500 font-semibold mt-4">
          Please fill out all fields before submitting.
        </p>
      )} */}
    </form>
  )
}

export default ContactForm