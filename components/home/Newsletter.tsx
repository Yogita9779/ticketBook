"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { newsletterSchema, type NewsletterValues } from "@/lib/schemas";
import { cn } from "@/lib/utils";

export function NewsletterForm({ variant }: { variant: "band" | "footer" }) {
  const [pending, setPending] = useState(false);
  const form = useForm<NewsletterValues>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { email: "" },
  });
  const inputId = variant === "band" ? "newsletter-band-email" : "newsletter-footer-email";

  return (
    <form
      className="space-y-2"
      noValidate
      onSubmit={form.handleSubmit(async () => {
        setPending(true);
        await new Promise((resolve) => setTimeout(resolve, 450));
        setPending(false);
        toast.success("Subscribed. Look out for Bookora offers.");
        form.reset();
      })}
    >
      <Label htmlFor={inputId} className={cn(variant === "band" ? "text-white" : "text-white")}>
        Email address
      </Label>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Input
          id={inputId}
          type="email"
          autoComplete="email"
          placeholder="you@email.com"
          aria-invalid={Boolean(form.formState.errors.email)}
          className="bg-white text-ink"
          {...form.register("email")}
        />
        <Button type="submit" variant={variant === "band" ? "invert" : "default"} disabled={pending}>
          {pending ? "Subscribing…" : "Subscribe"}
        </Button>
      </div>
      <FieldError message={form.formState.errors.email?.message} />
    </form>
  );
}

export function Newsletter() {
  return (
    <section className="bg-accent text-white" aria-labelledby="newsletter-heading">
      <div className="container-page grid gap-6 py-12 lg:grid-cols-[1.2fr_1fr] lg:items-center">
        <div>
          <h2 id="newsletter-heading" className="text-2xl font-bold sm:text-3xl">
            Get the weekend list
          </h2>
          <p className="mt-2 max-w-xl text-sm text-white/90 sm:text-base">
            New concerts, flight sales and voucher drops, once a week. No noise, unsubscribe any time.
          </p>
        </div>
        <NewsletterForm variant="band" />
      </div>
    </section>
  );
}
