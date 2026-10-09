import type { Metadata } from "next";
import { SettingsPanel } from "@/components/dashboard/AccountForms";

export const metadata: Metadata = {
  title: "Settings",
  description: "Bookora appearance and notification settings.",
};

export default function SettingsPage() {
  return <SettingsPanel />;
}
