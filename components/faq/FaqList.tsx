"use client";

import { useMemo, useState } from "react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { EmptyState } from "@/components/ui/Skeletons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FaqItem } from "@/types";

export function FaqList({ faqs }: { faqs: FaqItem[] }) {
  const [query, setQuery] = useState("");
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return faqs;
    return faqs.filter((item) => `${item.question} ${item.answer} ${item.topic}`.toLowerCase().includes(q));
  }, [faqs, query]);

  return (
    <div>
      <Label htmlFor="faq-search">Search FAQs</Label>
      <Input
        id="faq-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Search questions"
        className="mt-1 max-w-xl"
      />
      {filtered.length === 0 ? (
        <div className="mt-6">
          <EmptyState title="No matching questions" message="Try a different word, or contact us and we will help." />
        </div>
      ) : (
        <Accordion type="single" collapsible className="mt-6">
          {filtered.map((item) => (
            <AccordionItem key={item.id} value={item.id}>
              <AccordionTrigger className="text-base text-ink">
                <span>
                  <span className="mr-2 text-xs font-semibold uppercase tracking-wide text-accent">{item.topic}</span>
                  {item.question}
                </span>
              </AccordionTrigger>
              <AccordionContent className="text-ink-muted">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  );
}
