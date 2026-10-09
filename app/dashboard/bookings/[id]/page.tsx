import type { Metadata } from "next";
import { TicketView } from "@/components/dashboard/TicketView";

export const metadata: Metadata = {
  title: "Ticket",
  description: "Print or save your Bookora ticket.",
};

export default function TicketPage({ params }: { params: { id: string } }) {
  return <TicketView id={decodeURIComponent(params.id)} />;
}
