import { UiCalendar } from '@/components/ui/calendar';
import React from 'react';

export default function Calendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <UiCalendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
  );
}
