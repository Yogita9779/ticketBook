import Link from "next/link";

export function SectionHeader({
  title,
  subtitle,
  href,
  action = "View all",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="mb-5 flex items-end justify-between gap-4">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h2>
        {subtitle ? <p className="mt-1 max-w-2xl text-sm text-ink-muted sm:text-base">{subtitle}</p> : null}
      </div>
      {href ? (
        <Link href={href} className="shrink-0 text-sm font-semibold text-accent hover:text-accent-hover">
          {action}
        </Link>
      ) : null}
    </div>
  );
}
