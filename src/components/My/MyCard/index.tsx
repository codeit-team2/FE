import React from 'react';

import Image from 'next/image';

import ReviewModal from '@/components/common/Modal/Review';

import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import { Button } from '@/components/ui/button';

import { IsDateBeforeToday } from '@/lib/utils';

import { Gathering } from '@/types/gatherings';

interface Props {
  data: Gathering;
  type?: 'default' | 'review' | 'club';
}

export default function MyCard({ data, type = 'default' }: Props) {
  const isDateBeforeToday = IsDateBeforeToday({ date: data.dateTime });

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div className="relative h-163 w-full md:h-190 md:w-373">
        <Image src={data.gatheringImageUrl} alt={data.name} fill className="rounded-md" />
        {isDateBeforeToday ? (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-neutral-700 text-body-2M text-white">
            이용완료
          </div>
        ) : (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-primary-300 text-body-2M text-white">
            이용예정
          </div>
        )}
        {data.participantCount >= 5 && !isDateBeforeToday && (
          <div className="absolute left-61 z-10 flex h-36 w-91 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 pl-10 text-body-2M text-white">
            개설확정
          </div>
        )}
        {isDateBeforeToday &&
          (type === 'club' ? (
            <div className="absolute flex h-full w-full items-center justify-center rounded-md bg-neutral-900 text-white opacity-70">
              이미 종료된 모임입니다
            </div>
          ) : (
            <div className="absolute flex h-full w-full items-center justify-center rounded-md bg-neutral-900 text-white opacity-70">
              이용하신 모임에 대해
              <br />
              후기를 남겨주세요
            </div>
          ))}
      </div>
      <div className="flex grow flex-col justify-between">
        <Description data={data} />
        {type === 'review' && (
          <div className="flex flex-row justify-end gap-16">
            <Button className="w-186" variant={'secondary'}>
              후기 수정하기
            </Button>
            <Button variant={'secondary'}>
              <Image src="/icons/ic-delete.svg" alt="delete" width={24} height={24} />
            </Button>
          </div>
        )}

        {type === 'club' && (
          <div className="flex flex-row justify-end gap-16">
            <Person data={data} />
            <Button className="w-186" variant={'secondary'}>
              모임 수정하기
            </Button>
            <Button variant={'secondary'}>
              <Image src="/icons/ic-delete.svg" alt="delete" width={24} height={24} />
            </Button>
            <Button variant={'secondary'}>
              <Image src="/icons/ic-share.svg" alt="share" width={24} height={24} />
            </Button>
          </div>
        )}

        {type === 'default' && (
          <div className="flex flex-row justify-end gap-16">
            <Person data={data} />
            {isDateBeforeToday ? (
              <ReviewModal />
            ) : (
              <Button className="mb-2 h-42 w-288" variant={'secondary'}>
                예약 취소하기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
