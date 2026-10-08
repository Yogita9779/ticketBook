"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { contactSchema, type ContactValues } from "@/lib/schemas";

const subjects = ["General", "Bookings", "Refunds", "Stores", "Partnerships"];

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const form = useForm<ContactValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", subject: "", message: "" },
  });

  return (
    <form
      className="space-y-4 rounded-card bg-white p-6 shadow-card"
      noValidate
      onSubmit={form.handleSubmit(async () => {
        setPending(true);
        await new Promise((resolve) => setTimeout(resolve, 500));
        setPending(false);
        toast.success("Message sent. We will reply by email.");
        form.reset();
      })}
    >
      <div>
        <Label htmlFor="contact-name">Name</Label>
        <Input id="contact-name" autoComplete="name" className="mt-1" {...form.register("name")} />
        <FieldError message={form.formState.errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="contact-email">Email</Label>
        <Input id="contact-email" type="email" autoComplete="email" className="mt-1" {...form.register("email")} />
        <FieldError message={form.formState.errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="contact-subject">Subject</Label>
        <Select value={form.watch("subject") || undefined} onValueChange={(value) => form.setValue("subject", value, { shouldValidate: true })}>
          <SelectTrigger id="contact-subject" className="mt-1">
            <SelectValue placeholder="Choose a subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <FieldError message={form.formState.errors.subject?.message} />
      </div>
      <div>
        <Label htmlFor="contact-message">Message</Label>
        <textarea
          id="contact-message"
          rows={5}
          className="mt-1 w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          {...form.register("message")}
        />
        <FieldError message={form.formState.errors.message?.message} />
      </div>
      <Button type="submit" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
