import type { FaqItem } from "@/types";

export const faqs: FaqItem[] = [
  {
    id: "faq-1",
    topic: "Tickets",
    question: "How do I receive my tickets after booking?",
    answer:
      "Most tickets are issued as instant e-tickets. As soon as checkout is confirmed, we email a PDF and a QR code to the address you entered. You can also open the order from the confirmation screen and save it to your phone. A few venue-collect shows are labelled clearly before you pay.",
  },
  {
    id: "faq-2",
    topic: "Tickets",
    question: "Can I change the name on a ticket?",
    answer:
      "Name changes depend on the organiser. General admission tickets can usually be updated up to 24 hours before the event from the confirmation email. VIP and membership packages may be locked to the original buyer. If the option is not shown, contact us with your order number.",
  },
  {
    id: "faq-3",
    topic: "Payments",
    question: "Which payment methods do you accept?",
    answer:
      "TicketHub accepts Visa, Mastercard and Instant EFT. Your card details are used only to authorise the mock checkout in this prototype. A service fee of 8% is shown in the order summary before you confirm.",
  },
  {
    id: "faq-4",
    topic: "Payments",
    question: "Why was a service fee added?",
    answer:
      "The service fee covers payment processing, e-ticket delivery and customer support. It is calculated as 8% of the ticket subtotal and is displayed before you pay. The fee is not charged on voucher purchases that are already marked as fee-inclusive.",
  },
  {
    id: "faq-5",
    topic: "Refunds",
    question: "What is the refund policy if an event is cancelled?",
    answer:
      "If an organiser cancels or postpones an event, TicketHub emails every ticket holder with the next step. Cancelled events are refunded to the original payment method, including the service fee. Postponed events keep your ticket valid for the new date unless you request a refund.",
  },
  {
    id: "faq-6",
    topic: "Refunds",
    question: "Can I return tickets if I can no longer attend?",
    answer:
      "Tickets are generally non-refundable once the order is confirmed, because the organiser has reserved the seat. If the event page offers a resale window, you can list the ticket from your confirmation email. Travel bookings follow the fare rules shown on the deal.",
  },
  {
    id: "faq-7",
    topic: "Travel",
    question: "Do flight prices include baggage?",
    answer:
      "The fare shown is the from-price for a seat in economy and includes airport taxes displayed by the airline in this prototype. Checked baggage is only included when the deal card says so. Add baggage with the airline after you have your booking reference.",
  },
  {
    id: "faq-8",
    topic: "Travel",
    question: "How early should I arrive for a bus departure?",
    answer:
      "Arrive at the coach stop at least 30 minutes before departure with the same photo ID used at booking. Doors close five minutes before the scheduled time. Your e-ticket QR code is scanned as you board.",
  },
  {
    id: "faq-9",
    topic: "Stores",
    question: "Can I collect tickets from a TicketHub store?",
    answer:
      "Yes. Choose store collection when it is offered, then bring your order number and a photo ID to the branch. Store hours are listed on the Find a Store page. Collection opens two hours after the booking confirmation email arrives.",
  },
  {
    id: "faq-10",
    topic: "Account",
    question: "I did not receive my confirmation email. What should I do?",
    answer:
      "Check spam and promotions folders for a message from info@example.com. Confirmation can take a couple of minutes. If it is still missing, contact us with the name, phone number and approximate time of the booking so we can resend the e-ticket.",
  },
];
