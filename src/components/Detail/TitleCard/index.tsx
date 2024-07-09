import Bookmark from '@/components/common/Bookmark';
import Image from 'next/image';
import React from 'react';

export default function TitleCard({ data }: any) {
  const progressPercentage = (data.member / 20) * 100;
  const minReached = data.member >= 5;
  const maxReached = data.member >= 20;

  return (
    <div className="relative flex h-253 w-[1010px] gap-20 rounded-lg bg-neutral-900">
      <div className="relative h-253 w-495">
        <Image src={data.imageUrl} alt={data.title} fill className="rounded-bl-lg rounded-tl-lg" />
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
      <div className="absolute bottom-19 right-20 flex h-102 w-475 flex-col rounded-md bg-neutral-700 p-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-center gap-6">
            <div className="flex h-32 w-82 items-center gap-2 rounded-sm bg-primary-50 px-8 py-4">
              <div className="relative h-24 w-24">
                <Image src={'/icons/ic-person-blue.svg'} alt="ic-person" fill />
              </div>
              <div className="text-body-2Sb text-primary-300">{data.member}/20</div>
            </div>
            <div>프로필</div>
          </div>
          {data.confirmed && (
            <div className="relative h-32 w-72">
              <Image src={'/icons/개설확정뱃지.svg'} alt="개설확정뱃지" fill />
            </div>
          )}
        </div>
        <div>
          <div className="relative mb-11 mt-14 h-4 w-451 rounded-full bg-neutral-200">
            <div
              className="absolute h-4 rounded-full bg-primary-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="flex items-center justify-between text-body-3Sb text-neutral-300">
          <div
            className={`flex items-center justify-center gap-7 ${minReached ? 'text-primary-200' : ''}`}
          >
            <Image
              src={minReached ? '/icons/ic-checkbox-on.svg' : '/icons/ic-checkbox-off.svg'}
              alt="check"
              width={18}
              height={18}
            />
            모임 개설 최소 인원 · 5명
          </div>
          <div
            className={`flex items-center justify-center gap-7 ${maxReached ? 'text-primary-200' : ''}`}
          >
            <Image
              src={maxReached ? '/icons/ic-checkbox-on.svg' : '/icons/ic-checkbox-off.svg'}
              alt="check"
              width={18}
              height={18}
            />
            모임 참여 최대 인원 · 20명
          </div>
        </div>
      </div>
      <div className="absolute right-30 top-30">
        <Bookmark />
      </div>
    </div>
  );
}
