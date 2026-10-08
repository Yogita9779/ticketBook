"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function Calendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col gap-4 sm:flex-row",
        month: "space-y-3",
        caption: "relative flex items-center justify-center pt-1",
        caption_label: "text-sm font-semibold",
        nav: "flex items-center",
        nav_button: cn(buttonVariants({ variant: "outline", size: "icon" }), "h-8 w-8 bg-white"),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse",
        head_row: "flex",
        head_cell: "w-9 text-[0.75rem] font-medium text-ink-muted",
        row: "mt-1 flex w-full",
        cell: "relative h-9 w-9 p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-rose-50 first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md",
        day: cn(buttonVariants({ variant: "ghost", size: "icon" }), "h-9 w-9 p-0 font-normal"),
        day_range_end: "day-range-end",
        day_selected: "bg-accent text-white hover:bg-accent hover:text-white focus:bg-accent focus:text-white",
        day_today: "border border-accent text-accent",
        day_outside: "text-ink-muted opacity-40",
        day_disabled: "text-ink-muted opacity-30",
        day_range_middle: "aria-selected:bg-rose-50 aria-selected:text-ink",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: () => <ChevronLeft className="h-4 w-4" />,
        IconRight: () => <ChevronRight className="h-4 w-4" />,
      }}
      {...props}
    />
  );
}

export { Calendar };
