interface Props {
  date: string | Date | undefined;
}

interface FormattedDate {
  formattedDate: string;
  formattedWeekday: string;
  formattedTime: string;
}

export default function useFormatDate({ date }: Props): FormattedDate | null {
  const formatDate = typeof date === 'string' ? new Date(date) : date;
  const dateOptions: Intl.DateTimeFormatOptions = {
    month: 'long',
    day: 'numeric',
  };

  const weekdayOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  if (formatDate) {
    const formattedDate = formatDate.toLocaleDateString('ko-KR', dateOptions);
    const formattedWeekday = formatDate.toLocaleDateString('ko-KR', weekdayOptions);
    const formattedTime = formatDate.toLocaleTimeString('ko-KR', timeOptions);

    return { formattedDate, formattedWeekday, formattedTime };
  } else return null;
}
