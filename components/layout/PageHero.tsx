import Link from "next/link";
import Image from "next/image";

export function PageHero({
  title,
  description,
  current,
  backgroundImage,
}: {
  title: string;
  description?: string;
  current: string;
  backgroundImage?: string;
}) {
  return (
    <section className={`relative overflow-hidden bg-brand text-white ${backgroundImage ? "isolate" : ""}`}>
      {backgroundImage ? (
        <>
          <Image src={backgroundImage} alt="" fill sizes="100vw" className="-z-20 object-cover object-center" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-slate-950/75 via-slate-950/50 to-slate-950/30" />
        </>
      ) : null}
      <div className={`container-page ${backgroundImage ? "py-14 sm:py-20 lg:py-24" : "py-10 sm:py-14"}`}>
        <nav aria-label="Breadcrumb" className="mb-4">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-white/75">
            <li>
              <Link href="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-white">
              {current}
            </li>
          </ol>
        </nav>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description ? <p className="mt-3 max-w-2xl text-sm text-white/80 sm:text-base">{description}</p> : null}
      </div>
    </section>
  );
}
