"use client";

import * as SliderPrimitive from "@radix-ui/react-slider";
import * as React from "react";
import { cn } from "@/lib/utils";

function Slider({ className, ...props }: React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-pill bg-neutral-200">
        <SliderPrimitive.Range className="absolute h-full bg-accent" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-accent bg-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-accent bg-white shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent" />
    </SliderPrimitive.Root>
  );
}

export { Slider };
