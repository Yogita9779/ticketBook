import { HomePage } from "@/components/home/HomePage";
import { JsonLd } from "@/components/seo/JsonLd";

export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <>
      <JsonLd />
      <HomePage />
    </>
  );
}
