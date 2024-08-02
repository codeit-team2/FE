import { type ClassValue, clsx } from 'clsx';
// import { unescape } from 'querystring';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface IsDateBeforeTodayProps {
  date: string | Date | undefined;
}

export function isDateBeforeToday({ date }: IsDateBeforeTodayProps) {
  if (!date) {
    return null;
  }
  const compareDate = typeof date === 'string' ? new Date(date) : date;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 오늘 날짜와 비교, 오늘 이전이면 true 아니면 false
  if (compareDate < today) {
    return true;
  } else {
    return false;
  }
}

interface FormatDateProps {
  date: string | Date | undefined;
}

interface FormattedDate {
  formattedDate: string;
  formattedWeekday: string;
  formattedTime: string;
  deadline: string;
}

type DeadlineStatus = '마감' | '오늘마감' | '내일마감' | '이번주마감' | '다음주마감' | '여유';

export function formatDate({ date }: FormatDateProps): FormattedDate | null {
  const formatDate = typeof date === 'string' ? new Date(date) : date;
  const now = new Date();

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

  const getDeadlineStatus = (targetDate: Date): DeadlineStatus => {
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const endOfWeek = new Date(today);
    endOfWeek.setDate(today.getDate() + (7 - today.getDay()));

    const nextWeek = new Date(endOfWeek);
    nextWeek.setDate(endOfWeek.getDate() + 7);

    if (targetDate < today) return '마감';
    if (targetDate <= today) return '오늘마감';
    if (targetDate <= tomorrow) return '내일마감';
    if (targetDate <= endOfWeek) return '이번주마감';
    if (targetDate <= nextWeek) return '다음주마감';

    return '여유';
  };

  if (formatDate) {
    const formattedDate = formatDate.toLocaleDateString('ko-KR', dateOptions);
    const formattedWeekday = formatDate.toLocaleDateString('ko-KR', weekdayOptions);
    const formattedTime = formatDate.toLocaleTimeString('ko-KR', timeOptions);
    const deadline = getDeadlineStatus(formatDate);

    return { formattedDate, formattedWeekday, formattedTime, deadline };
  } else return null;
}

export function formatDateToISO(date?: Date) {
  if (date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    // const hours = String(date.getHours()).padStart(2, '0');
    // const minutes = String(date.getMinutes()).padStart(2, '0');
    // const seconds = String(date.getSeconds()).padStart(2, '0');

    // escape(listDate);
    // const listDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

    // return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    return `${year}-${month}-${day}`;
  }
}
