interface Props {
  date: string;
}

export default function useIsDateBeforeToday({ date }: Props) {
  const compareDate = new Date(date);
  const today = new Date();

  // 오늘 날짜와 비교, 오늘 이전이면 true 아니면 false
  if (compareDate < today) {
    return true;
  } else {
    return false;
  }
}
