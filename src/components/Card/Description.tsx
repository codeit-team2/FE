import { useRouter } from 'next/router';


import { Gathering } from '@/types/gathering';
import { Gathering } from '@/types/gatherings';
import formatDate from '@/lib/utils';

interface Props {
  data: Gathering;
}

export default function Description({ data }: Props) {
    
const formattedDate = formatDate({ date: data.dateTime });
    
  const router = useRouter();
  return (
    <div
      className="mb-16 flex w-full cursor-pointer flex-col text-body-3Sb md:mb-4 md:text-body-2Sb"
      onClick={() => router.push(`/detail/${data.gatheringId}`)}
    >
      <div className="flex gap-6">
        <p className="text-primary-300">{data.subCategoryName}</p>
        <p className="text-neutral-500">{data.location}</p>
      </div>
      <div className="mb-8 flex lg:gap-6">

        <p className="text-secondary-300">{formattedDate?.deadline}</p>·
        <p className="text-neutral-500">
          {formattedDate?.formattedDate} {formattedDate?.formattedWeekday} ·{' '}
          {formattedDate?.formattedTime}
        </p>

      </div>
      <div className="w-220 min-w-230 text-body-1Sb md:text-heading-2M">{data.name}</div>
    </div>
  );
}
