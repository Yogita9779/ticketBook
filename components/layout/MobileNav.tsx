"use client";

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { eventMegaMenu, travelLinks } from "@/data/categories";

export function MobileNav({
  open,
  onOpenChange,
  onSignIn,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSignIn: () => void;
}) {
  const close = () => onOpenChange(false);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="left" className="w-[min(100%,20rem)] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Bookora</SheetTitle>
          <SheetDescription>Browse events, travel and vouchers.</SheetDescription>
        </SheetHeader>
        <nav aria-label="Mobile" className="mt-4 px-5 pb-8">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="events">
              <AccordionTrigger>Events</AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-4">
                  {eventMegaMenu.map((column) => (
                    <li key={column.title}>
                      <Link href={column.href} onClick={close} className="font-semibold text-ink">
                        {column.title}
                      </Link>
                      <ul className="mt-2 space-y-2">
                        {column.links.map((link) => (
                          <li key={link.label}>
                            <Link href={link.href} onClick={close} className="text-sm text-ink-muted hover:text-accent">
                              {link.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="travel">
              <AccordionTrigger>
                <span className="inline-flex items-center gap-1">
                  Travel <ChevronDown className="sr-only" />
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <ul className="space-y-3">
                  {travelLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} onClick={close} className="font-medium text-ink">
                        {link.label}
                      </Link>
                      <p className="text-sm text-ink-muted">{link.description}</p>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          <ul className="mt-2 divide-y divide-neutral-200 border-b border-neutral-200">
            <li>
              <Link href="/vouchers" onClick={close} className="block py-4 text-sm font-semibold">
                Vouchers
              </Link>
            </li>
            <li>
              <Link href="/find-a-store" onClick={close} className="block py-4 text-sm font-semibold">
                Find a Store
              </Link>
            </li>
          </ul>
          <div className="mt-6 grid gap-3">
            <Button
              type="button"
              onClick={() => {
                close();
                onSignIn();
              }}
            >
              Sign In / Register
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/cart" onClick={close}>
                View cart
              </Link>
            </Button>
          </div>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
