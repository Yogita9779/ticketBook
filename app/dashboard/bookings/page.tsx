import type { Metadata } from "next";
import { BookingsView } from "@/components/dashboard/BookingsView";

export const metadata: Metadata = {
  title: "My bookings",
  description: "Upcoming, past and cancelled Bookora bookings.",
};

export default function BookingsPage() {
  return <BookingsView />;
}
