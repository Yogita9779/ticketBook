import Image from "next/image";
import { photoUrl } from "@/lib/photo-library";

export function AppPromoBanner() {
  return (
    <section className="container-page py-12" aria-labelledby="app-heading">
      <div className="grid items-center gap-8 overflow-hidden rounded-card bg-brand px-6 py-10 text-white shadow-card lg:grid-cols-2 lg:px-12">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-white/70">Bookora app</p>
          <h2 id="app-heading" className="mt-2 text-3xl font-bold tracking-tight">
            Tickets in your pocket
          </h2>
          <p className="mt-3 max-w-md text-sm text-white/80 sm:text-base">
            Store e-tickets, get gate reminders and pick up where you left off on a booking. The apps are placeholders in this prototype.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://www.apple.com/app-store/"
              className="inline-flex h-12 items-center rounded-pill bg-white px-5 text-sm font-semibold text-brand hover:bg-white/90"
            >
              App Store
            </a>
            <a
              href="https://play.google.com/store"
              className="inline-flex h-12 items-center rounded-pill border border-white/40 px-5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Google Play
            </a>
          </div>
        </div>
        <div className="mx-auto w-48">
          <div className="rounded-[2rem] border-4 border-white/30 bg-black p-2 shadow-elevated">
            <div className="relative aspect-[9/16] overflow-hidden rounded-[1.4rem]">
              <Image
                src={photoUrl("1512941937669-90a1b58e7e9", 600, 1000)}
                alt="Phone showing a Bookora event ticket"
                fill
                sizes="192px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
