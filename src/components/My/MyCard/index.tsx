import Image from 'next/image';
import React, { useState } from 'react';
import Liked from '@/components/Card/Liked';
import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import { Button } from '@/components/ui/button';
import useIsDateBeforeToday from '@/hooks/useIsDateBeforeToday';

interface Props {
  data: Data;
}

interface Data {
  category: string;
  place: string;
  date: string;
  title: string;
  member: number;
  imageUrl: string;
  deadline: string;
  confirmed: boolean;
}

export default function MyCard({ data }: Props) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  const handleClick = () => {
    setIsBookmarked((prevIsBookmarked) => !prevIsBookmarked);
  };

  const isDateBeforeToday = useIsDateBeforeToday({ date: data.date });
  console.log(isDateBeforeToday);

  return (
    <div className="relative flex h-230 w-full gap-20 rounded-lg bg-white p-20">
      <div className="relative h-190 w-373">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-md" />
        {isDateBeforeToday ? (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-primary-300 text-body-2M text-white">
            이용예정
          </div>
        ) : (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-neutral-700 text-body-2M text-white">
            이용완료
          </div>
        )}
        {data.confirmed ||
          (isDateBeforeToday && (
            <div className="absolute left-61 z-10 flex h-36 w-91 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 pl-10 text-body-2M text-white">
              개설확정
            </div>
          ))}
        {!isDateBeforeToday && (
          <div className="absolute flex h-full w-full items-center justify-center rounded-md bg-neutral-900 text-white opacity-70">
            이용하신 모임에 대해
            <br />
            후기를 남겨주세요
          </div>
        )}
      </div>

      <div className="relative flex w-full flex-col items-start justify-between gap-30 text-gray-600">
        <Description data={data} />
        <div className="mb-11 flex w-full items-center justify-end gap-16">
          <Person data={data} />
        </div>
      </div>

      <div className="flex flex-col items-end justify-between">
        <Liked onClick={handleClick} isBookmarked={isBookmarked} />

        {isDateBeforeToday ? (
          <Button className="mb-2 h-42 w-288" variant={'secondary'}>
            예약 취소하기
          </Button>
        ) : (
          <Button className="mb-2 h-42 w-288" variant={'default'}>
            후기 작성하기
          </Button>
        )}
      </div>
    </div>
  );
}
