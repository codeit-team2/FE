import React, { useState } from 'react';

import Bookmark from '../common/Bookmark';
import { Button } from '../ui/button';
import Image from 'next/image';
import { useRouter } from 'next/router';

import LoginRequired from '@/components/common/Modal/LoginRequired';

import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import ProgressPercentage from '@/components/Card/ProgressPercentage';
import Loading from '@/components/Loading';

import { usePostGatheringsJoin } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gathering';

interface CardProps {
  data: Gathering;
  clickFavorites: (item: Gathering) => void;
  isFavorite: (item: Gathering) => boolean;
}

export default function Card({ data, clickFavorites, isFavorite }: CardProps) {
  // throw new Error();
  const minReached = data.participantCount >= 5;
  const router = useRouter();
  const favorite = isFavorite(data);
  const { gatheringId } = data;
  const { mutate: mutateGatherJoin, error: errorGatheringJoin, isError } = usePostGatheringsJoin();
  console.log(isError);
  // value is Authorization
  // 임시값
  const value = 'test';
  // login값 미정님꺼 나오면 확인해서 넣기. 근데 Push는 어디로...? 로그인은 모달창인데..? 모달창을 띄워줘야하나?
  // + try catch문은 어디에 작성해야하지?
  const login = true;
  const handleGatheringsJoin = () => {
    if (login) {
      mutateGatherJoin({ gatheringId, value });
    } else {
      console.log('Click!');
    }
  };

  const handleToggleBookmark = () => {
    if (data) {
      clickFavorites(data);
    }
  };

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div className="relative h-163 w-full md:h-190 md:w-373">
        <Image
          src={data.gatheringImageUrl}
          alt={data.name}
          fill
          className="rounded-md object-cover"
        />
        {minReached && (
          <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
            개설확정
          </div>
        )}
      </div>
      <div className="relative flex grow flex-col items-start justify-between text-gray-600">
        <Description data={data} />
        <div className="mb-11 flex w-full items-center justify-center gap-8 md:gap-16">
          <div className="flex w-full items-center gap-16">
            <Person data={data} />
            <ProgressPercentage data={data} />
          </div>
          <Button
            onClick={handleGatheringsJoin}
            className="mb-2 h-42 w-full md:w-200 lg:w-288"
            variant={'secondary'}
            disabled={data.participantCount >= data.capacity}
          >
            {data.participantCount >= data.capacity ? '참여마감' : '참여하기'}
          </Button>
        </div>
      </div>
      <div className="absolute right-30 top-30">
        <Bookmark favorite={favorite} handleToggleBookmark={handleToggleBookmark} />
      </div>
    </div>
  );
}
