"use client";

import { Check, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function StayAvailabilityCheck({ isAvailable }: { isAvailable: boolean }) {
  const [checked, setChecked] = useState(false);

  return (
    <div className="mt-5">
      <Button type="button" onClick={() => setChecked(true)} className="h-12 w-full bg-rose-600 font-semibold hover:bg-rose-700">
        Check availability
      </Button>
      <p aria-live="polite" className={`mt-3 flex min-h-5 items-center justify-center gap-1.5 text-center text-sm font-semibold ${checked ? (isAvailable ? "text-emerald-700" : "text-rose-700") : "text-slate-500"}`}>
        {checked ? (
          isAvailable ? <><Check className="h-4 w-4" aria-hidden="true" />This stay is available.</> : <><X className="h-4 w-4" aria-hidden="true" />This stay is not available right now.</>
        ) : "Availability is checked for this stay."}
      </p>
    </div>
  );
}
