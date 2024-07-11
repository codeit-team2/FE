import React from 'react';

import { UiCalendar } from '@/components/ui/calendar';

export default function Calendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <UiCalendar mode="single" selected={date} onSelect={setDate} className="rounded-md border" />
  );
}
