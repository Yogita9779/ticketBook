import type { Metadata } from "next";
import { getEvents } from "@/lib/api";
import { DashboardContent } from "@/components/dashboard/DashboardContent";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your TicketHub bookings and account.",
};

export default async function DashboardPage() {
  const events = await getEvents();
  return <DashboardContent events={events} />;
}
