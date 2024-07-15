import React from 'react';

import { ko } from 'date-fns/locale';

import { UiCalendar } from '@/components/ui/calendar';

export default function Calendar() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <UiCalendar
      mode="single"
      locale={ko}
      selected={date}
      onSelect={setDate}
      className="rounded-md border"
    />
  );
}
