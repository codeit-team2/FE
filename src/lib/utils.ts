import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IsDateBeforeTodayProps {
  date: string | Date | undefined;
}

export function IsDateBeforeToday({ date }: IsDateBeforeTodayProps) {
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
