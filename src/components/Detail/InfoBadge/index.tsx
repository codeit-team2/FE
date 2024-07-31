import React from 'react';

import Image from 'next/image';

import ProfileImageGroup from '@/components/Detail/ProfileImageGroup';

import { Gathering, Participant } from '@/types/gatherings';

interface InfoBadgeProps {
  data: Gathering;
  userData: Participant;
}

export default function InfoBadge({ userData, data }: InfoBadgeProps) {
  const progressPercentage = (data.participantCount / data.capacity) * 100;
  const minReached = data.participantCount >= 5;
  const maxReached = data.participantCount >= data.capacity;

  const participantData = userData?.participantInfos || [];

  return (
    <div className="flex h-102 w-full flex-col rounded-md bg-neutral-700 p-12 md:w-475">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-6">
          <div className="flex h-32 w-74 items-center rounded-sm bg-primary-50 px-8 py-4 md:w-82">
            <div className="relative h-24 w-24">
              <Image src={'/icons/ic-person-blue.svg'} alt="ic-person" fill />
            </div>
            <div className="flex w-40 justify-center text-body-2Sb text-primary-300">
              {data.participantCount}/{data.capacity}
            </div>
          </div>
          <div className="flex">
            <ProfileImageGroup usersProfile={participantData} />
          </div>
        </div>
        {minReached && (
          <div className="flex h-32 w-58 items-center justify-center rounded-sm bg-secondary-300 px-8 py-4 text-body-3Sb text-white md:w-72 md:text-body-2Sb">
            개설확정
          </div>
        )}
      </div>
      <div>
        <div className="relative mb-8 mt-12 h-4 w-full rounded-full bg-neutral-200 md:w-451">
          <div
            className="absolute h-4 rounded-full bg-primary-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      <div className="flex items-center justify-between text-body-3M text-neutral-300 md:text-body-3Sb">
        <div
          className={`flex items-center justify-center gap-1 md:gap-7 ${minReached ? 'text-primary-200' : ''}`}
        >
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image
              src={minReached ? '/icons/ic-checkbox-on.svg' : '/icons/ic-checkbox-off.svg'}
              alt="check"
              fill
            />
          </div>
          모임 개설 최소 인원 · 5명
        </div>
        <div
          className={`flex items-center justify-center gap-1 md:gap-7 ${maxReached ? 'text-primary-200' : ''}`}
        >
          <div className="relative h-20 w-20 md:h-24 md:w-24">
            <Image
              src={maxReached ? '/icons/ic-checkbox-on.svg' : '/icons/ic-checkbox-off.svg'}
              alt="check"
              fill
            />
          </div>
          모임 참여 최대 인원 · {data.capacity}명
        </div>
      </div>
    </div>
  );
}
