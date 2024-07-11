import React from 'react';

import InfoBadge from '../InfoBadge';
import Image from 'next/image';

import Bookmark from '@/components/common/Bookmark';

import { Activity } from '@/types/testDataType';

interface TitleCardProps {
  data: Activity;
}

export default function TitleCard({ data }: TitleCardProps) {
  return (
    <>
      <div className="relative flex h-400 w-full max-w-[1010px] flex-col rounded-lg bg-neutral-900 md:h-253 md:flex-row">
        <div className="relative h-170 w-full md:h-253 md:w-495">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            objectFit="cover"
            className="rounded-t-lg md:rounded-bl-lg md:rounded-tl-lg md:rounded-tr-none"
          />
        </div>
        <div>
          <div className="relative">
            <div className="mx-0 mt-16 flex flex-col gap-6 px-20 text-body-3Sb text-neutral-300 md:mx-20 md:px-0 md:text-body-2Sb">
              <div className="flex flex-col">
                <div className="flex gap-6">
                  <p className="text-primary-200">{data.category}</p>
                  <p>{data.place}</p>
                </div>
                <div className="flex gap-6">
                  <p className="text-secondary-200">{data.deadline}</p>·<p>{data.date}</p>·
                  <p>{data.time}</p>
                </div>
              </div>
              <div className="h-44 w-220 whitespace-normal text-body-1Sb text-white md:h-56 md:w-392 md:text-heading-2Sb">
                {data.title}
              </div>
            </div>
          </div>
          <div className="mx-10 mt-16 md:mx-20 md:mt-12">
            <InfoBadge data={data} />
          </div>
        </div>
        <div className="absolute right-20 top-186 md:right-30 md:top-30">
          <Bookmark />
        </div>
      </div>
    </>
  );
}
