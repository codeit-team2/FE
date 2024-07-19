interface Props {
  date: string | Date | undefined;
}

export default function useIsDateBeforeToday({ date }: Props) {
  if (!date) {
    return null;
  }
  const compareDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();

  // 오늘 날짜와 비교, 오늘 이전이면 true 아니면 false
  if (compareDate < today) {
    return true;
  } else {
    return false;
  }
}
