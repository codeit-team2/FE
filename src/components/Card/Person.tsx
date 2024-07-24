import Image from 'next/image';

import { Gathering } from '@/types/gathering';
import { Gathering } from '@/types/gatherings';
interface PersonProps {
  data: Pick<Gathering, 'participantCount' | 'capacity'>;


export default function Person({ data }: PersonProps) {
  return (
    <>
      {data.participantCount > 5 ? (
        <div className="flex items-center gap-2">
          <Image src="/icons/ic-person-blue.svg" alt="ic-person-blue" width={24} height={24} />
          <div className="mr-8 text-body-2Sb text-primary-300">
            {data.participantCount}/{data.capacity}
          </div>

        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Image src="/icons/ic-person-gray.svg" alt="ic-person-gray" width={24} height={24} />

          <div className="mr-8 text-body-2Sb text-neutral-500">
            {data.participantCount}/{data.capacity}
          </div>
        </div>
      )}
    </>
  );
}
