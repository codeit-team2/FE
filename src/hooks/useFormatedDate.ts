import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const useFormattedDate = (date: Date | undefined) => {
  if (!date)
    return {
      yearMonthDay: '',
      monthDay: '',
      dayOfWeek: '',
      monthDayWithDayOfWeek: '날짜를 선택해주세요',
    };

  const yearMonthDay = format(date, 'yyyy년 MM월 dd일', { locale: ko });
  const monthDay = format(date, 'MM월 dd일', { locale: ko });
  const dayOfWeek = format(date, 'EEEE', { locale: ko });
  const monthDayWithDayOfWeek = `${monthDay} (${dayOfWeek})`;

  return {
    yearMonthDay,
    monthDay,
    dayOfWeek,
    monthDayWithDayOfWeek,
  };
};

export default useFormattedDate;
