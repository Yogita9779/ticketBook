"use client";

import { useEffect, useState } from "react";
import { useAccountReady } from "@/hooks/use-hydrated";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { FieldError } from "@/components/ui/FieldError";
import { Avatar } from "@/components/dashboard/DashboardShell";
import { dashCard } from "@/components/dashboard/ui";
import { useAccount } from "@/lib/account-store";
import { profileSchema, type ProfileValues } from "@/lib/schemas";

export function ProfileForm() {
  const profile = useAccount((state) => state.profile);
  const updateProfile = useAccount((state) => state.updateProfile);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [avatarError, setAvatarError] = useState("");
  const form = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: profile.name, email: profile.email, phone: profile.phone },
  });
  const ready = useAccountReady();
  const name = form.watch("name");

  useEffect(() => {
    if (!ready) return;
    const current = useAccount.getState().profile;
    form.reset({ name: current.name, email: current.email, phone: current.phone });
    setAvatar(current.avatar);
  }, [form, ready]);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Profile</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Your name and photo show on the dashboard welcome banner.</p>
      </div>
      <form
        className={`${dashCard} space-y-4 p-5 sm:p-6`}
        noValidate
        onSubmit={form.handleSubmit((values) => {
          updateProfile({ ...values, avatar });
          toast.success("Profile saved");
        })}
      >
        <div className="flex items-center gap-4">
          <Avatar name={name || profile.name} avatar={avatar} className="h-16 w-16 text-lg" />
          <div>
            <label className="inline-flex h-10 cursor-pointer items-center rounded-xl bg-rose-600 px-4 text-sm font-semibold text-white">
              Upload photo
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                className="sr-only"
                onChange={async (event) => {
                  const file = event.target.files?.[0];
                  event.target.value = "";
                  if (!file) return;
                  if (file.size > 5_000_000) {
                    setAvatarError("Choose an image under 5 MB.");
                    return;
                  }
                  try {
                    setAvatar(await resizeAvatar(file));
                    setAvatarError("");
                  } catch {
                    setAvatarError("Could not read that image.");
                  }
                }}
              />
            </label>
            {avatar ? (
              <button type="button" onClick={() => setAvatar("")} className="ml-3 text-sm font-semibold text-slate-500 hover:text-rose-600">Remove</button>
            ) : null}
            <FieldError message={avatarError} />
          </div>
        </div>
        <label className="block text-sm font-semibold">Name
          <input className={fieldClass} {...form.register("name")} />
          <FieldError message={form.formState.errors.name?.message} />
        </label>
        <label className="block text-sm font-semibold">Email
          <input type="email" className={fieldClass} {...form.register("email")} />
          <FieldError message={form.formState.errors.email?.message} />
        </label>
        <label className="block text-sm font-semibold">Phone
          <input className={fieldClass} {...form.register("phone")} />
          <FieldError message={form.formState.errors.phone?.message} />
        </label>
        <button type="submit" className="h-12 rounded-2xl bg-rose-600 px-5 text-sm font-bold text-white">Save profile</button>
      </form>
    </div>
  );
}

export function SettingsPanel() {
  const theme = useAccount((state) => state.theme);
  const setTheme = useAccount((state) => state.setTheme);
  const emailAlerts = useAccount((state) => state.emailAlerts);
  const bookingReminders = useAccount((state) => state.bookingReminders);
  const setEmailAlerts = useAccount((state) => state.setEmailAlerts);
  const setBookingReminders = useAccount((state) => state.setBookingReminders);
  const signOut = useAccount((state) => state.signOut);

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">Settings</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Appearance and alerts stay on this device.</p>
      </div>
      <section className={`${dashCard} space-y-4 p-5 sm:p-6`}>
        <h2 className="text-lg font-bold">Appearance</h2>
        <div className="flex gap-2">
          {(["light", "dark"] as const).map((mode) => (
            <button key={mode} type="button" aria-pressed={theme === mode} onClick={() => { setTheme(mode); toast.success(`${mode === "dark" ? "Dark" : "Light"} mode on`); }} className={`h-11 rounded-xl px-4 text-sm font-semibold capitalize ${theme === mode ? "bg-rose-600 text-white" : "border border-slate-200 dark:border-white/10"}`}>
              {mode}
            </button>
          ))}
        </div>
        <label className="flex items-center justify-between gap-4 text-sm font-semibold">
          Email alerts
          <input type="checkbox" checked={emailAlerts} onChange={(event) => { setEmailAlerts(event.target.checked); toast.success("Email alert preference saved"); }} className="h-5 w-5 accent-rose-600" />
        </label>
        <label className="flex items-center justify-between gap-4 text-sm font-semibold">
          Booking reminders
          <input type="checkbox" checked={bookingReminders} onChange={(event) => { setBookingReminders(event.target.checked); toast.success("Reminder preference saved"); }} className="h-5 w-5 accent-rose-600" />
        </label>
      </section>
      <section className={`${dashCard} p-5 sm:p-6`}>
        <h2 className="text-lg font-bold">Session</h2>
        <p className="mt-2 text-sm text-slate-500">Sign out of this demo account on this browser.</p>
        <button type="button" onClick={() => { signOut(); toast.success("Signed out"); window.location.href = "/login"; }} className="mt-4 h-11 rounded-xl border border-rose-200 px-4 text-sm font-semibold text-rose-600">Logout</button>
      </section>
    </div>
  );
}

const fieldClass = "mt-1 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-600 dark:border-white/10 dark:bg-[#0c0e14]";

function resizeAvatar(file: File) {
  return new Promise<string>((resolve, reject) => {
    const image = new Image();
    const url = URL.createObjectURL(file);
    image.onload = () => {
      const size = 160;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (!context) {
        reject(new Error("canvas"));
        return;
      }
      const scale = Math.max(size / image.width, size / image.height);
      const width = image.width * scale;
      const height = image.height * scale;
      context.drawImage(image, (size - width) / 2, (size - height) / 2, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL("image/jpeg", 0.82));
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("image"));
    };
    image.src = url;
  });
}
