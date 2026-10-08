import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="container-page py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-accent">404</p>
      <h1 className="mt-2 text-3xl font-bold text-ink">We could not find that page</h1>
      <p className="mx-auto mt-3 max-w-md text-sm text-ink-muted">
        The event may have left the catalogue, or the link is out of date.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Back to home</Link>
      </Button>
    </div>
  );
}
