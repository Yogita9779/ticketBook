import type { Metadata } from "next";
import { AuthPagePanel } from "@/components/auth/AuthPagePanel";

export const metadata: Metadata = {
  title: "Sign In or Create Account",
  description: "Sign in to your TicketHub account or create a new account.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return <main className="min-h-screen bg-[#f7f8fa]"><AuthPagePanel /></main>;
}
