"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CircleUserRound, Eye, EyeOff, Headphones, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { FieldError } from "@/components/ui/FieldError";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAccount } from "@/lib/account-store";
import { createPasswordCredential, derivePasswordHash } from "@/lib/password-auth";
import { authSchema } from "@/lib/schemas";

const registerSchema = z.object({
  firstName: z.string().min(2, "Enter your first name"),
  lastName: z.string().min(2, "Enter your last name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Za-z]/, "Include at least one letter")
    .regex(/\d/, "Include at least one number")
    .regex(/[^A-Za-z0-9\s]/, "Include at least one symbol"),
  confirmPassword: z.string().min(8, "Confirm your password"),
  terms: z.boolean().refine((accepted) => accepted, "Please accept the terms and conditions"),
}).refine((values) => values.password === values.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

type SignInValues = z.infer<typeof authSchema>;
type RegisterValues = z.infer<typeof registerSchema>;

export function AuthPagePanel() {
  const router = useRouter();
  const [tab, setTab] = useState("sign-in");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const isSignIn = tab === "sign-in";

  return (
    <>
      <section className="relative h-[250px] overflow-hidden bg-gradient-to-r from-rose-600 via-rose-900 to-slate-950 text-white sm:h-[295px]" aria-label="Bookora account">
        <CircleUserRound className="absolute -right-5 top-8 h-48 w-48 text-white/[0.09] sm:right-8 sm:top-6 sm:h-56 sm:w-56" strokeWidth={1.4} aria-hidden="true" />
        <div className="container-page relative pt-10 sm:pt-12">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{isSignIn ? "Sign In" : "Create Account"}</h1>
          <p className="mt-3 max-w-2xl text-sm text-white/85 sm:text-base">{isSignIn ? "Sign in to your account to access your orders, saved items, and profile." : "Create an account to start booking events, managing your tickets, and more."}</p>
        </div>
      </section>

      <div className="container-page relative z-10 -mt-16">
        <section className="mx-auto w-full max-w-2xl rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_14px_35px_rgba(15,23,42,0.12)] sm:p-7" aria-label="Sign in or create an account">
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="grid w-fit grid-cols-2 rounded-xl bg-[#f3f3f5]">
              <TabsTrigger value="sign-in" className="rounded-lg">Sign In</TabsTrigger>
              <TabsTrigger value="register" className="rounded-lg">Create Account</TabsTrigger>
            </TabsList>
            <TabsContent value="sign-in"><SignInForm key={registeredEmail} initialEmail={registeredEmail} onSuccess={() => router.push("/dashboard")} /></TabsContent>
            <TabsContent value="register"><RegisterForm onRegistered={(email) => { setRegisteredEmail(email); setTab("sign-in"); }} /></TabsContent>
          </Tabs>
        </section>
      </div>

      <section className="container-page mx-auto mt-14 max-w-3xl pb-14" aria-label="Account support">
        <div className="flex flex-col gap-5 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex items-center gap-4"><span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-rose-50 text-rose-600"><Headphones className="h-6 w-6" /></span><div><h2 className="font-bold text-slate-900">Need Help?</h2><p className="mt-1 text-sm leading-5 text-slate-500">If you’re experiencing issues with logging in or creating an account, our support team is ready to assist you.</p></div></div>
          <Button asChild className="shrink-0 rounded-xl bg-rose-600 hover:bg-rose-700"><a href="/contact">Contact Support <span aria-hidden="true" className="ml-2">→</span></a></Button>
        </div>
      </section>
    </>
  );
}

function SignInForm({ onSuccess, initialEmail }: { onSuccess: () => void; initialEmail: string }) {
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<SignInValues>({ resolver: zodResolver(authSchema), defaultValues: { email: initialEmail, password: "" } });

  return (
    <form className="mt-5 space-y-4" noValidate onSubmit={form.handleSubmit(async (values) => {
      setPending(true);
      await new Promise((resolve) => setTimeout(resolve, 350));
      const accountKey = values.email.trim().toLowerCase();
      const credential = useAccount.getState().credentialsByEmail[accountKey];
      if (!credential) {
        setPending(false);
        toast.error("No account found. Create an account first.");
        return;
      }
      const passwordHash = await derivePasswordHash(values.password, credential.salt);
      const signedIn = useAccount.getState().signIn(values.email, passwordHash);
      setPending(false);
      if (!signedIn) {
        toast.error("Incorrect email or password.");
        return;
      }
      toast.success("Signed in. Welcome back to Bookora.");
      form.reset();
      onSuccess();
    })}>
      <Field label="Email Address" id="login-email" icon={<Mail className="h-4 w-4" />} error={form.formState.errors.email?.message}>
        <Input id="login-email" type="email" autoComplete="email" placeholder="Enter your email" className="h-7 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" {...form.register("email")} />
      </Field>
      <Field label="Password" id="login-password" icon={<LockKeyhole className="h-4 w-4" />} error={form.formState.errors.password?.message}>
        <Input id="login-password" type={showPassword ? "text" : "password"} autoComplete="current-password" placeholder="Enter your password" className="h-7 border-0 bg-transparent px-0 pr-9 shadow-none focus-visible:ring-0" {...form.register("password")} />
        <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
      </Field>
      <div className="flex items-center justify-between gap-3 text-sm"><label className="inline-flex items-center gap-2 text-slate-700"><input type="checkbox" className="h-4 w-4 accent-rose-600" />Remember me</label><button type="button" onClick={() => toast.info("Please contact support to reset your password.")} className="font-medium text-rose-600 hover:text-rose-700">Forgot password?</button></div>
      <Button type="submit" disabled={pending} className="h-12 w-full rounded-xl bg-rose-600 text-base font-semibold hover:bg-rose-700">{pending ? "Signing in…" : "Sign In"}</Button>
      <SocialDivider action="Sign in" />
    </form>
  );
}

function RegisterForm({ onRegistered }: { onRegistered: (email: string) => void }) {
  const [pending, setPending] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const form = useForm<RegisterValues>({ resolver: zodResolver(registerSchema), defaultValues: { firstName: "", lastName: "", email: "", password: "", confirmPassword: "", terms: false } });

  return (
    <form className="mt-5 space-y-3.5" noValidate onSubmit={form.handleSubmit(async (values) => {
      setPending(true);
      await new Promise((resolve) => setTimeout(resolve, 350));
      const profile = {
        name: `${values.firstName} ${values.lastName}`,
        email: values.email,
        phone: "",
        avatar: "",
      };
      const credential = await createPasswordCredential(values.password);
      const registered = useAccount.getState().registerAccount(profile, credential);
      setPending(false);
      if (!registered) {
        toast.error("An account with this email already exists. Please sign in.");
        return;
      }
      toast.success("Account created. Sign in to continue.");
      form.reset();
      onRegistered(values.email);
    })}>
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="First Name" id="signup-first-name" error={form.formState.errors.firstName?.message}><Input id="signup-first-name" autoComplete="given-name" placeholder="John" className="h-7 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" {...form.register("firstName")} /></Field>
        <Field label="Last Name" id="signup-last-name" error={form.formState.errors.lastName?.message}><Input id="signup-last-name" autoComplete="family-name" placeholder="Doe" className="h-7 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" {...form.register("lastName")} /></Field>
      </div>
      <Field label="Email Address" id="signup-email" icon={<Mail className="h-4 w-4" />} error={form.formState.errors.email?.message}><Input id="signup-email" type="email" autoComplete="email" placeholder="john.doe@example.com" className="h-7 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0" {...form.register("email")} /></Field>
      <Field label="Password" id="signup-password" icon={<LockKeyhole className="h-4 w-4" />} error={form.formState.errors.password?.message}>
        <Input id="signup-password" type={showPassword ? "text" : "password"} autoComplete="new-password" placeholder="Create a password" className="h-7 border-0 bg-transparent px-0 pr-9 shadow-none focus-visible:ring-0" {...form.register("password")} />
        <button type="button" aria-label={showPassword ? "Hide password" : "Show password"} onClick={() => setShowPassword((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
      </Field>
      <Field label="Confirm Password" id="signup-confirm-password" icon={<LockKeyhole className="h-4 w-4" />} error={form.formState.errors.confirmPassword?.message}>
        <Input id="signup-confirm-password" type={showConfirm ? "text" : "password"} autoComplete="new-password" placeholder="Confirm your password" className="h-7 border-0 bg-transparent px-0 pr-9 shadow-none focus-visible:ring-0" {...form.register("confirmPassword")} />
        <button type="button" aria-label={showConfirm ? "Hide password" : "Show password"} onClick={() => setShowConfirm((value) => !value)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700">{showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button>
      </Field>
      <div><div className="flex items-center gap-1.5 text-sm text-slate-700"><label className="inline-flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-rose-600" {...form.register("terms")} />I agree to the</label><a href="/legal" className="font-medium text-rose-600 hover:underline">Terms and Conditions</a></div><FieldError message={form.formState.errors.terms?.message} /></div>
      <Button type="submit" disabled={pending} className="h-12 w-full rounded-xl bg-rose-600 text-base font-semibold hover:bg-rose-700">{pending ? "Creating account…" : "Create Account"}</Button>
      <SocialDivider action="Sign up" />
    </form>
  );
}

function Field({ label, id, icon, error, children }: { label: string; id: string; icon?: ReactNode; error?: string; children: ReactNode }) {
  return <div><div className="relative rounded-xl bg-[#f3f3f5] px-3 py-2"><Label htmlFor={id} className="text-[11px] font-semibold text-slate-500">{label}<span className="text-rose-600">*</span></Label><div className="relative flex items-center gap-2">{icon ? <span className="text-slate-400">{icon}</span> : null}<div className="min-w-0 flex-1">{children}</div></div></div><FieldError message={error} /></div>;
}

function SocialDivider({ action }: { action: "Sign in" | "Sign up" }) {
  return <><div className="flex items-center gap-3 py-1 text-xs text-slate-400"><span className="h-px flex-1 bg-slate-200" />or<span className="h-px flex-1 bg-slate-200" /></div><Button type="button" variant="outline" className="h-12 w-full rounded-xl border-slate-300 font-medium" onClick={() => toast.info("Google sign-in is not connected in this demo.")}><span className="mr-2 font-bold text-blue-600">G</span>{action} with Google</Button></>;
}
