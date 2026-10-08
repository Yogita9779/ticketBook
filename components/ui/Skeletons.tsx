import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

function Bone({ className }: { className?: string }) {
  return <div className={cn("motion-safe:animate-pulse rounded-md bg-neutral-200", className)} />;
}

export function EventCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-card" aria-hidden="true">
      <Bone className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-4">
        <Bone className="h-4 w-20" />
        <Bone className="h-5 w-full" />
        <Bone className="h-5 w-4/5" />
        <Bone className="h-4 w-2/3" />
        <Bone className="h-5 w-24" />
      </div>
    </div>
  );
}

export function EventRowSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="flex gap-4 overflow-hidden" aria-busy="true" aria-label="Loading events">
      {Array.from({ length: count }, (_, index) => (
        <div key={index} className="w-[17rem] shrink-0 sm:w-[19rem]">
          <EventCardSkeleton />
        </div>
      ))}
    </div>
  );
}

export function EventGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4" aria-busy="true" aria-label="Loading events">
      {Array.from({ length: count }, (_, index) => (
        <EventCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function DealCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-card bg-white shadow-card" aria-hidden="true">
      <Bone className="aspect-[16/10] rounded-none" />
      <div className="space-y-3 p-4">
        <Bone className="h-5 w-3/4" />
        <Bone className="h-4 w-1/2" />
        <Bone className="h-5 w-24" />
      </div>
    </div>
  );
}

export function DealGridSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" aria-busy="true" aria-label="Loading deals">
      {Array.from({ length: 6 }, (_, index) => (
        <DealCardSkeleton key={index} />
      ))}
    </div>
  );
}

export function CategoryGridSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4" aria-busy="true" aria-label="Loading categories">
      {Array.from({ length: 8 }, (_, index) => (
        <Bone key={index} className="aspect-[4/3] rounded-card" />
      ))}
    </div>
  );
}

export function TrendingSkeleton() {
  return (
    <div className="grid gap-3 lg:grid-cols-2" aria-busy="true" aria-label="Loading trending events">
      {Array.from({ length: 6 }, (_, index) => (
        <div key={index} className="flex gap-4 rounded-card bg-white p-3 shadow-card">
          <Bone className="h-16 w-10" />
          <Bone className="h-16 w-24 rounded-md" />
          <div className="flex-1 space-y-2">
            <Bone className="h-4 w-3/4" />
            <Bone className="h-3 w-1/2" />
            <Bone className="h-3 w-1/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function VoucherRowSkeleton() {
  return (
    <div className="flex gap-4 overflow-hidden" aria-busy="true" aria-label="Loading vouchers">
      {Array.from({ length: 4 }, (_, index) => (
        <Bone key={index} className="h-44 w-64 shrink-0 rounded-card" />
      ))}
    </div>
  );
}

export function SectionBlockSkeleton({ label }: { label: string }) {
  return (
    <div className="container-page py-12" aria-busy="true" aria-label={label}>
      <Bone className="mb-5 h-8 w-56" />
      <EventGridSkeleton />
    </div>
  );
}

export function EmptyState({
  title,
  message,
  action,
}: {
  title: string;
  message: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-card border border-dashed border-neutral-300 bg-white px-6 py-16 text-center">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">{message}</p>
      {action ? <div className="mt-6 flex justify-center">{action}</div> : null}
    </div>
  );
}

export function ErrorState({
  title = "Something went wrong",
  message = "Please try again in a moment.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div role="alert" className="rounded-card border border-rose-200 bg-rose-50 px-6 py-10 text-center">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      <p className="mt-2 text-sm text-ink-muted">{message}</p>
      {onRetry ? (
        <button
          type="button"
          onClick={onRetry}
          className="mt-4 rounded-pill bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-hover"
        >
          Try again
        </button>
      ) : null}
    </div>
  );
}
