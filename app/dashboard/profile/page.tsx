import type { Metadata } from "next";
import { ProfileForm } from "@/components/dashboard/AccountForms";

export const metadata: Metadata = {
  title: "Profile",
  description: "Update your Bookora profile.",
};

export default function ProfilePage() {
  return <ProfileForm />;
}
