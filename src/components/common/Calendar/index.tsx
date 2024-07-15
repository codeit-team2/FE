import React from 'react';

import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { UiCalendar } from '@/components/ui/calendar';

interface CalendarProps {
  isDropdown?: boolean;
}

export default function Calendar({ isDropdown }: CalendarProps) {
  const [date, setDate] = React.useState<Date | undefined>();

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
  };

  const formatDate = (date: Date | undefined) => {
    return date ? format(date, 'yyyy년 MM월 dd일') : '날짜를 선택해주세요';
  };

  return (
    <>
      {isDropdown ? (
        <div className="absolute rounded-md border bg-white p-12">
          <UiCalendar mode="single" selected={date} onSelect={handleDateSelect} />
          {isDropdown && (
            <Button variant="secondary" className="mt-2 w-full">
              {formatDate(date)}
            </Button>
          )}
        </div>
      ) : (
        <>
          <UiCalendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            className="rounded-me border"
          />
        </>
      )}
    </>
  );
}
