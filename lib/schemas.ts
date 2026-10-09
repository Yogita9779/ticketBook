import { z } from "zod";

export const newsletterSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});

export const authSchema = z.object({
  name: z.string().optional(),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export const contactSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  subject: z.string().min(1, "Choose a subject"),
  message: z.string().min(20, "Message should be at least 20 characters"),
});

export const checkoutSchema = z.object({
  name: z.string().min(2, "Enter the name on the booking"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\s()-]{10,18}$/, "Enter a valid phone number"),
  cardNumber: z
    .string()
    .min(1, "Card number is required")
    .refine((value) => /^\d{16}$/.test(value.replace(/\s+/g, "")), "Enter a 16-digit card number"),
  expiry: z
    .string()
    .regex(/^(0[1-9]|1[0-2])\/\d{2}$/, "Use MM/YY")
    .refine((value) => {
      const [month, year] = value.split("/").map(Number);
      const expiry = new Date(2000 + year, month, 1);
      return expiry > new Date();
    }, "Card expiry must be in the future"),
  cvc: z.string().regex(/^\d{3}$/, "Enter a 3-digit CVC"),
});

export const attendeeSchema = z.object({
  name: z.string().min(2, "Enter the attendee name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\s()-]{10,18}$/, "Enter a valid phone number"),
});

export const paymentSchema = checkoutSchema.pick({
  cardNumber: true,
  expiry: true,
  cvc: true,
}).extend({
  cardName: z.string().min(2, "Enter the name on the card"),
});

export const profileSchema = z.object({
  name: z.string().min(2, "Enter your name"),
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  phone: z
    .string()
    .min(10, "Enter a valid phone number")
    .regex(/^[0-9+\s()-]{10,18}$/, "Enter a valid phone number"),
});

export type NewsletterValues = z.infer<typeof newsletterSchema>;
export type ContactValues = z.infer<typeof contactSchema>;
export type CheckoutValues = z.infer<typeof checkoutSchema>;
export type AttendeeValues = z.infer<typeof attendeeSchema>;
export type PaymentValues = z.infer<typeof paymentSchema>;
export type ProfileValues = z.infer<typeof profileSchema>;
