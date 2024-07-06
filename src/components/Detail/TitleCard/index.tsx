import Bookmark from '@/components/common/Bookmark';
import Image from 'next/image';
import React from 'react';
import InfoBadge from '../InfoBadge';

export default function TitleCard({ data }: any) {
  return (
    <>
      <div className="relative flex h-253 w-full min-w-336 max-w-[1010px] gap-20 rounded-lg bg-neutral-900">
        <div className="relative h-253 w-495">
          <Image
            src={data.imageUrl}
            alt={data.title}
            fill
            className="rounded-bl-lg rounded-tl-lg"
          />
        </div>
        <div className="relative">
          <div className="mt-16 flex flex-col gap-6 text-body-2Sb text-neutral-300">
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
            <div className="text-heading-2Sb text-white">{data.title}</div>
          </div>
        </div>
        <InfoBadge data={data} />
        <div className="absolute right-30 top-30">
          <Bookmark />
        </div>
      </div>
    </>
  );
}
