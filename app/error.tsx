"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="container-page py-20">
      <div role="alert" className="mx-auto max-w-lg rounded-card border border-rose-200 bg-rose-50 px-6 py-10 text-center">
        <h1 className="text-2xl font-bold text-ink">Something went wrong</h1>
        <p className="mt-2 text-sm text-ink-muted">The page could not be loaded. You can try again.</p>
        <Button type="button" className="mt-6" onClick={() => reset()}>
          Try again
        </Button>
      </div>
    </div>
  );
}
