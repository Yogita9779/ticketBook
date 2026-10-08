import { ThisWeekendTabs } from "@/components/home/ThisWeekendTabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { getThisWeekend } from "@/lib/api";

export default async function ThisWeekend() {
  const data = await getThisWeekend();

  return (
    <section className="bg-canvas py-12" aria-labelledby="weekend-heading">
      <div className="container-page">
        <div id="weekend-heading">
          <SectionHeader title="This Weekend" href="/search?type=events" />
        </div>
        <ThisWeekendTabs
          groups={{ fri: data.fri, sat: data.sat, sun: data.sun }}
          labels={data.labels}
        />
      </div>
    </section>
  );
}
