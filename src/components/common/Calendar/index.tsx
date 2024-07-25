import React from 'react';

import { ko } from 'date-fns/locale';

import { UiCalendar } from '@/components/ui/calendar';

interface CalendarProps {
  date: Date | undefined;
  setDate: React.Dispatch<Date | undefined>;
}

export default function Calendar({ date, setDate }: CalendarProps) {
  // calendar 사용하는 곳에서 아래 선언 해준 다음 사용하면 됩니다!
  // const [date, setDate] = React.useState<Date | undefined>();

  return (
    <UiCalendar
      mode="single"
      selected={date}
      locale={ko}
      onSelect={setDate}
      className="rounded-me border"
    />
  );
}
