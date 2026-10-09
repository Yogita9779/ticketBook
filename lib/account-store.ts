"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  AccountNotice,
  AccountProfile,
  ActivityItem,
  Attendee,
  Booking,
  BookingStatus,
  EventItem,
  TicketTierName,
} from "@/types";

interface AccountState {
  signedIn: boolean;
  theme: "light" | "dark";
  sidebarCollapsed: boolean;
  emailAlerts: boolean;
  bookingReminders: boolean;
  profile: AccountProfile;
  profilesByEmail: Record<string, AccountProfile>;
  accountDataByEmail: Record<string, AccountData>;
  bookings: Booking[];
  activity: ActivityItem[];
  notices: AccountNotice[];
  signIn: (patch?: Partial<AccountProfile>) => void;
  signOut: () => void;
  setTheme: (theme: "light" | "dark") => void;
  toggleSidebar: () => void;
  setEmailAlerts: (value: boolean) => void;
  setBookingReminders: (value: boolean) => void;
  updateProfile: (profile: AccountProfile) => void;
  addBooking: (input: {
    event: EventItem;
    tierName: TicketTierName;
    unitPrice: number;
    quantity: number;
    attendee: Attendee;
  }) => Booking;
  cancelBooking: (id: string) => void;
  markNoticeRead: (id: string) => void;
  markAllNoticesRead: () => void;
  logActivity: (item: Omit<ActivityItem, "id" | "at">) => void;
}

interface AccountData {
  bookings: Booking[];
  activity: ActivityItem[];
  notices: AccountNotice[];
}

const defaultProfile: AccountProfile = {
  name: "",
  email: "",
  phone: "",
  avatar: "",
};

function accountDataFrom(state: Pick<AccountState, "bookings" | "activity" | "notices">): AccountData {
  return {
    bookings: state.bookings,
    activity: state.activity,
    notices: state.notices,
  };
}

function snapshot(event: EventItem, extra: Partial<Booking> & Pick<Booking, "id" | "status" | "quantity" | "createdAt">): Booking {
  return {
    eventId: event.id,
    slug: event.slug,
    title: event.title,
    image: event.image,
    venue: event.venue,
    city: event.city,
    date: extra.date ?? event.date,
    category: event.category,
    tierName: extra.tierName ?? "General",
    unitPrice: extra.unitPrice ?? event.priceFrom,
    attendee: extra.attendee ?? {
      name: defaultProfile.name,
      email: defaultProfile.email,
      phone: defaultProfile.phone,
    },
    id: extra.id,
    status: extra.status,
    quantity: extra.quantity,
    createdAt: extra.createdAt,
  };
}

function uid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function nameFromEmail(email: string) {
  const localPart = email.trim().split("@")[0] ?? "";
  const name = localPart
    .replace(/[._-]+/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toLocaleUpperCase() + part.slice(1))
    .join(" ");
  return name || "there";
}

export function createBookingId() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let body = "";
  for (let index = 0; index < 6; index += 1) {
    body += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `TH-${body}`;
}

export const useAccount = create<AccountState>()(
  persist(
    (set) => ({
      signedIn: false,
      theme: "light",
      sidebarCollapsed: false,
      emailAlerts: true,
      bookingReminders: true,
      profile: defaultProfile,
      profilesByEmail: {},
      accountDataByEmail: {},
      bookings: [],
      activity: [],
      notices: [],
      signIn: (patch) =>
        set((state) => {
          const email = (patch?.email ?? state.profile.email).trim();
          const accountKey = email.toLowerCase();
          const savedProfile = accountKey ? state.profilesByEmail[accountKey] : undefined;
          const baseProfile = savedProfile ?? {
            ...defaultProfile,
            name: email ? nameFromEmail(email) : state.profile.name,
          };
          const profile: AccountProfile = {
            name: patch?.name ?? baseProfile.name,
            email: email || baseProfile.email,
            phone: patch?.phone ?? baseProfile.phone,
            avatar: patch?.avatar ?? baseProfile.avatar,
          };
          const accountDataByEmail = { ...state.accountDataByEmail };
          const currentKey = state.profile.email.trim().toLowerCase();
          if (currentKey) accountDataByEmail[currentKey] = accountDataFrom(state);
          const accountData = accountKey
            ? accountDataByEmail[accountKey] ?? { bookings: [], activity: [], notices: [] }
            : accountDataFrom(state);
          return {
            signedIn: true,
            profile,
            profilesByEmail: accountKey
              ? { ...state.profilesByEmail, [accountKey]: profile }
              : state.profilesByEmail,
            accountDataByEmail,
            bookings: accountData.bookings,
            activity: accountData.activity,
            notices: accountData.notices,
          };
        }),
      signOut: () =>
        set((state) => {
          const accountKey = state.profile.email.trim().toLowerCase();
          return {
            signedIn: false,
            accountDataByEmail: accountKey
              ? { ...state.accountDataByEmail, [accountKey]: accountDataFrom(state) }
              : state.accountDataByEmail,
          };
        }),
      setTheme: (theme) => set({ theme }),
      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setEmailAlerts: (emailAlerts) => set({ emailAlerts }),
      setBookingReminders: (bookingReminders) => set({ bookingReminders }),
      updateProfile: (profile) =>
        set((state) => {
          const previousKey = state.profile.email.trim().toLowerCase();
          const accountKey = profile.email.trim().toLowerCase();
          const profilesByEmail = { ...state.profilesByEmail };
          const accountDataByEmail = { ...state.accountDataByEmail };
          if (previousKey && previousKey !== accountKey) delete profilesByEmail[previousKey];
          if (accountKey) profilesByEmail[accountKey] = profile;
          if (previousKey && previousKey !== accountKey) delete accountDataByEmail[previousKey];
          if (accountKey) accountDataByEmail[accountKey] = accountDataFrom(state);
          const entry: ActivityItem = {
            id: uid("act"),
            title: "Profile updated",
            detail: `${profile.name} saved account details`,
            at: new Date().toISOString(),
            tone: "slate",
          };
          return {
            profile,
            profilesByEmail,
            accountDataByEmail,
            activity: [entry, ...state.activity].slice(0, 20),
          };
        }),
      addBooking: ({ event, tierName, unitPrice, quantity, attendee }) => {
        const booking = snapshot(event, {
          id: createBookingId(),
          status: "confirmed" satisfies BookingStatus,
          quantity,
          tierName,
          unitPrice,
          attendee,
          createdAt: new Date().toISOString(),
        });
        const entry: ActivityItem = {
          id: uid("act"),
          title: "Booking confirmed",
          detail: `${quantity} ticket${quantity === 1 ? "" : "s"} for ${event.title}`,
          at: booking.createdAt,
          tone: "emerald",
        };
        set((state) => ({
          bookings: [booking, ...state.bookings],
          activity: [entry, ...state.activity].slice(0, 20),
          notices: [
            {
              id: uid("nt"),
              title: "Tickets are ready",
              body: `${event.title} · ${booking.id}`,
              href: `/dashboard/bookings/${booking.id}`,
              at: booking.createdAt,
              read: false,
            },
            ...state.notices,
          ].slice(0, 20),
        }));
        return booking;
      },
      cancelBooking: (id) =>
        set((state) => {
          const booking = state.bookings.find((item) => item.id === id);
          if (!booking || booking.status === "cancelled") return state;
          const at = new Date().toISOString();
          const entry: ActivityItem = {
            id: uid("act"),
            title: "Booking cancelled",
            detail: `${booking.title} · ${booking.id}`,
            at,
            tone: "slate",
          };
          return {
            bookings: state.bookings.map((item) => (item.id === id ? { ...item, status: "cancelled" } : item)),
            activity: [entry, ...state.activity].slice(0, 20),
            notices: [
              {
                id: uid("nt"),
                title: "Booking cancelled",
                body: `${booking.title} is now cancelled.`,
                href: "/dashboard/bookings",
                at,
                read: false,
              },
              ...state.notices,
            ].slice(0, 20),
          };
        }),
      markNoticeRead: (id) =>
        set((state) => ({
          notices: state.notices.map((notice) => (notice.id === id ? { ...notice, read: true } : notice)),
        })),
      markAllNoticesRead: () =>
        set((state) => ({
          notices: state.notices.map((notice) => ({ ...notice, read: true })),
        })),
      logActivity: (item) =>
        set((state) => ({
          activity: [{ ...item, id: uid("act"), at: new Date().toISOString() }, ...state.activity].slice(0, 20),
        })),
    }),
    {
      name: "tickethub-account",
      version: 3,
      skipHydration: true,
      migrate: (persistedState, version) => {
        const state = persistedState as Partial<AccountState>;
        let migrated: Partial<AccountState> = state;
        if (version < 1) {
          const demoBookingIds = new Set(["TH-4K8M2Q", "TH-9P1C7L", "TH-2W6N5A", "TH-7H3D9R"]);
          migrated = {
            ...migrated,
            bookings: (state.bookings ?? []).filter((booking) => !demoBookingIds.has(booking.id)),
            activity: (state.activity ?? []).filter((item) => !["act-1", "act-2", "act-3", "act-4"].includes(item.id)),
            notices: (state.notices ?? []).filter((notice) => !["nt-1", "nt-2"].includes(notice.id)),
          };
        }
        if (version < 2) {
          const oldProfile = state.profile ?? defaultProfile;
          const profile = { ...oldProfile, avatar: "" };
          const accountKey = profile.email.trim().toLowerCase();
          migrated = {
            ...migrated,
            profile,
            profilesByEmail: accountKey ? { [accountKey]: profile } : {},
          };
        }
        if (version < 3) {
          const profile = migrated.profile ?? state.profile ?? defaultProfile;
          const accountKey = profile.email.trim().toLowerCase();
          migrated = {
            ...migrated,
            accountDataByEmail: accountKey
              ? {
                  ...(migrated.accountDataByEmail ?? {}),
                  [accountKey]: {
                    bookings: migrated.bookings ?? state.bookings ?? [],
                    activity: migrated.activity ?? state.activity ?? [],
                    notices: migrated.notices ?? state.notices ?? [],
                  },
                }
              : migrated.accountDataByEmail ?? {},
          };
        }
        return migrated;
      },
    },
  ),
);

export function isUpcoming(booking: Booking, now = Date.now()) {
  return booking.status !== "cancelled" && new Date(booking.date).getTime() >= now;
}

export function isPast(booking: Booking, now = Date.now()) {
  return booking.status !== "cancelled" && new Date(booking.date).getTime() < now;
}

export function ticketCount(bookings: Booking[]) {
  return bookings.filter((booking) => booking.status !== "cancelled").reduce((sum, booking) => sum + booking.quantity, 0);
}
