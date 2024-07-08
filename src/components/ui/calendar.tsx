import * as React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { DayPicker } from 'react-day-picker';

import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';

export type CalendarProps = React.ComponentProps<typeof DayPicker>;

function UiCalendar({ className, classNames, showOutsideDays = true, ...props }: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('mx-auuto w-fit border-none p-12', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-16 sm:space-x-16 sm:space-y-0',
        month: 'space-y-16',
        caption: 'flex justify-center pt-4 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-4 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-28 w-28 bg-transparent p-0 opacity-50 hover:opacity-100',
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-28',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-36 font-normal text-[0.8rem]',
        row: 'flex w-full mt-8',
        cell: 'h-36 w-36 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-full [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-outside)]:rounded-full focus-within:relative focus-within:z-20',
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'rounded-full hover:rounded-full h-36 w-36 p-0 font-normal aria-selected:opacity-100',
        ),
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary-100 text-primary-foreground rounded-full focus:bg-primary-100 focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground rounded-full',
        day_outside:
          'day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-28 w-28" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-28 w-28" />,
      }}
      {...props}
    />
  );
}
UiCalendar.displayName = 'UiCalendar';

export { UiCalendar };
