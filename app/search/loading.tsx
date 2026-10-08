import { EventGridSkeleton } from "@/components/ui/Skeletons";

export default function Loading() {
  return (
    <div className="container-page py-10">
      <EventGridSkeleton />
    </div>
  );
}
