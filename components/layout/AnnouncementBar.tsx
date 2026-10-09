"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const STORAGE_KEY = "tickethub-announcement-dismissed";

export function AnnouncementBar() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.localStorage.getItem(STORAGE_KEY) === "1") {
      setVisible(false);
    }
  }, []);

  if (!visible || pathname.startsWith("/dashboard")) return null;

  return (
    <div className="bg-brand text-white">
      <div className="container-page relative flex h-9 items-center justify-center">
        <Link
          href="/search?type=events&category=Festivals"
          className="text-xs font-semibold tracking-wide underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
        >
          #AccessInTheWild
        </Link>
        <button
          type="button"
          aria-label="Dismiss announcement"
          className="absolute right-4 top-1/2 flex h-7 w-7 -translate-y-1/2 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          onClick={() => {
            window.localStorage.setItem(STORAGE_KEY, "1");
            setVisible(false);
          }}
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
