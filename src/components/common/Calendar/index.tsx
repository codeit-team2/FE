import React from 'react';

import { ko } from 'date-fns/locale';

import { Button } from '@/components/ui/button';
import { UiCalendar } from '@/components/ui/calendar';

import useFormattedDate from '@/hooks/useFormatedDate';

interface CalendarProps {
  isDropdown?: boolean;
  handleCalendarClick?: (date: string) => void;
}

export default function Calendar({ isDropdown, handleCalendarClick }: CalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>();

  const { monthDayWithDayOfWeek } = useFormattedDate(date);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  return (
    <>
      {isDropdown && handleCalendarClick ? (
        <div className="absolute rounded-md border bg-white p-12">
          <UiCalendar mode="single" selected={date} onSelect={handleDateSelect} />
          {isDropdown && (
            <Button
              variant="secondary"
              className="mt-2 w-full"
              onClick={() => handleCalendarClick(monthDayWithDayOfWeek)}
            >
              {monthDayWithDayOfWeek}
            </Button>
          )}
        </div>
      ) : (
        <>
          <UiCalendar
            mode="single"
            selected={date}
            locale={ko}
            onSelect={handleDateSelect}
            className="rounded-me border"
          />
        </>
      )}
    </>
  );
}
