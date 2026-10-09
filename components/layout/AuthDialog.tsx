"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authSchema } from "@/lib/schemas";

const registerSchema = authSchema.extend({
  name: z.string().min(2, "Enter your name"),
});

type SignInValues = z.infer<typeof authSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function AuthDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign in / Register</DialogTitle>
          <DialogDescription>Use your email to book tickets, travel and vouchers.</DialogDescription>
        </DialogHeader>
        <Tabs defaultValue="sign-in">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="sign-in">Sign in</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="sign-in">
            <SignInForm onDone={() => onOpenChange(false)} />
          </TabsContent>
          <TabsContent value="register">
            <RegisterForm onDone={() => onOpenChange(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function SignInForm({ onDone }: { onDone: () => void }) {
  const [pending, setPending] = useState(false);
  const form = useForm<SignInValues>({
    resolver: zodResolver(authSchema),
    defaultValues: { email: "", password: "" },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async () => {
        setPending(true);
        await new Promise((resolve) => setTimeout(resolve, 400));
        setPending(false);
        toast.success("Signed in. Welcome back to Bookora.");
        form.reset();
        onDone();
      })}
      noValidate
    >
      <div>
        <Label htmlFor="signin-email">Email</Label>
        <Input id="signin-email" type="email" autoComplete="email" className="mt-1" {...form.register("email")} />
        <FieldError message={form.formState.errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="signin-password">Password</Label>
        <Input id="signin-password" type="password" autoComplete="current-password" className="mt-1" {...form.register("password")} />
        <FieldError message={form.formState.errors.password?.message} />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}

function RegisterForm({ onDone }: { onDone: () => void }) {
  const [pending, setPending] = useState(false);
  const form = useForm<RegisterValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  return (
    <form
      className="space-y-4"
      onSubmit={form.handleSubmit(async () => {
        setPending(true);
        await new Promise((resolve) => setTimeout(resolve, 400));
        setPending(false);
        toast.success("Account created. You are ready to book.");
        form.reset();
        onDone();
      })}
      noValidate
    >
      <div>
        <Label htmlFor="register-name">Name</Label>
        <Input id="register-name" autoComplete="name" className="mt-1" {...form.register("name")} />
        <FieldError message={form.formState.errors.name?.message} />
      </div>
      <div>
        <Label htmlFor="register-email">Email</Label>
        <Input id="register-email" type="email" autoComplete="email" className="mt-1" {...form.register("email")} />
        <FieldError message={form.formState.errors.email?.message} />
      </div>
      <div>
        <Label htmlFor="register-password">Password</Label>
        <Input id="register-password" type="password" autoComplete="new-password" className="mt-1" {...form.register("password")} />
        <FieldError message={form.formState.errors.password?.message} />
      </div>
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Creating account…" : "Create account"}
      </Button>
    </form>
  );
}
