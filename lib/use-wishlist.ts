"use client";

import { useEffect, useState } from "react";
import { useAccount } from "@/lib/account-store";

const KEY_PREFIX = "tickethub-wishlist:";
const EVENT_PREFIX = "tickethub-wishlist-change:";
const LEGACY_KEY = "tickethub-wishlist";

function readIds(key: string) {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function useWishlist() {
  const email = useAccount((state) => state.profile.email);
  const accountId = email.trim().toLowerCase() || "guest";
  const key = `${KEY_PREFIX}${encodeURIComponent(accountId)}`;
  const eventName = `${EVENT_PREFIX}${encodeURIComponent(accountId)}`;
  const [stored, setStored] = useState<{ key: string; ids: string[] }>({ key: "", ids: [] });
  const ready = stored.key === key;
  const ids = ready ? stored.ids : [];

  useEffect(() => {
    const sync = () => setStored({ key, ids: readIds(key) });
    window.localStorage.removeItem(LEGACY_KEY);
    sync();
    window.addEventListener(eventName, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(eventName, sync);
      window.removeEventListener("storage", sync);
    };
  }, [eventName, key]);

  const toggle = (id: string) => {
    const current = readIds(key);
    const next = current.includes(id) ? current.filter((item) => item !== id) : [...current, id];
    window.localStorage.setItem(key, JSON.stringify(next));
    setStored({ key, ids: next });
    window.dispatchEvent(new Event(eventName));
  };

  return {
    ready,
    has: (id: string) => ids.includes(id),
    toggle,
  };
}
