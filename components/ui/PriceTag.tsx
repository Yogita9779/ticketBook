import { formatRand } from "@/lib/utils";

export function PriceTag({
  amount,
  prefix = "From",
  suffix,
}: {
  amount: number;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <p className="text-sm text-ink">
      {prefix ? <span className="font-medium text-ink-muted">{prefix} </span> : null}
      <span className="text-base font-bold text-ink">{formatRand(amount)}</span>
      {suffix ? <span className="font-medium text-ink-muted"> {suffix}</span> : null}
    </p>
  );
}
