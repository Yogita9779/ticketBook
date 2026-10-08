import { site } from "@/lib/site";

export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        name: site.name,
        url: site.url,
        potentialAction: {
          "@type": "SearchAction",
          target: `${site.url}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string",
        },
      },
      {
        "@type": "Organization",
        name: site.name,
        url: site.url,
        email: site.email,
        telephone: site.phone,
        address: {
          "@type": "PostalAddress",
          streetAddress: "Greenacres Office Park",
          addressLocality: "Victory Park",
          postalCode: "2195",
          addressCountry: "ZA",
        },
        sameAs: site.socials.map((item) => item.href),
      },
    ],
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
