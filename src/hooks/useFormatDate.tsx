interface Props {
  date: string;
}

export default function useFormatDate({ date }: Props) {
  const formatDate = new Date(date);
  const dateOptions: Intl.DateTimeFormatOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  };

  const timeOptions: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };

  const formattedDate = formatDate.toLocaleDateString('ko-KR', dateOptions);
  const formattedTime = formatDate.toLocaleTimeString('ko-KR', timeOptions);

  return `${formattedDate} · ${formattedTime}`;
}
