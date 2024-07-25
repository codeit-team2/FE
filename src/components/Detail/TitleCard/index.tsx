import React from 'react';

import Image from 'next/image';

import Bookmark from '@/components/common/Bookmark';

import InfoBadge from '@/components/Detail/InfoBadge';

import formatDate from '@/lib/utils';

import { Gathering } from '@/types/gatherings';

interface TitleCardProps {
  data: Gathering;
  clickFavorites: (item: Gathering) => void;
  isFavorite: (item: Gathering) => boolean;
}

const userData = {
  gatheringId: 101,
  accounts: [
    {
      accountId: 1,
      email: 'abc1@email.com',
      nickname: '러닝왕1',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:00',
    },
    {
      accountId: 2,
      email: 'abc2@email.com',
      nickname: '러닝왕2',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:01',
    },
    {
      accountId: 3,
      email: 'abc3@email.com',
      nickname: '러닝왕3',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:02',
    },
    {
      accountId: 4,
      email: 'abc4@email.com',
      nickname: '러닝왕4',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:03',
    },
    {
      accountId: 5,
      email: 'abc5@email.com',
      nickname: '러닝왕5',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:04',
    },
    {
      accountId: 6,
      email: 'abc6@email.com',
      nickname: '러닝왕6',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:05',
    },
    {
      accountId: 7,
      email: 'abc7@email.com',
      nickname: '러닝왕7',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:06',
    },
    {
      accountId: 8,
      email: 'abc8@email.com',
      nickname: '러닝왕8',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:07',
    },
    {
      accountId: 9,
      email: 'abc9@email.com',
      nickname: '러닝왕9',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:08',
    },
    {
      accountId: 10,
      email: 'abc10@email.com',
      nickname: '러닝왕10',
      profileImageUrl: '/images/profileImage1.jpeg0',
      joinedAt: '2024-07-16T12:00:09',
    },
    {
      accountId: 11,
      email: 'abc11@email.com',
      nickname: '러닝왕11',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:10',
    },
    {
      accountId: 12,
      email: 'abc12@email.com',
      nickname: '러닝왕12',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:11',
    },
    {
      accountId: 13,
      email: 'abc13@email.com',
      nickname: '러닝왕13',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:12',
    },
    {
      accountId: 14,
      email: 'abc14@email.com',
      nickname: '러닝왕14',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:13',
    },
    {
      accountId: 15,
      email: 'abc15@email.com',
      nickname: '러닝왕15',
      profileImageUrl: '/images/profileImage1.jpeg',
      joinedAt: '2024-07-16T12:00:14',
    },
  ],
};

export default function TitleCard({ data, clickFavorites, isFavorite }: TitleCardProps) {
  const favorite = isFavorite(data);

  const formattedDate = formatDate({ date: data.dateTime });

  const handleToggleBookmark = () => {
    if (data) {
      clickFavorites(data);
    }
  };

  return (
    <>
      <div className="relative flex h-400 w-full max-w-[1010px] flex-col rounded-lg bg-neutral-900 md:h-253 md:flex-row">
        <div className="relative h-170 w-full md:h-253 md:w-495">
          <Image
            src={data.gatheringImageUrl}
            alt={data.name}
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
                  <p className="text-primary-200">{data.subCategoryName}</p>
                  <p>{data.location}</p>
                </div>
                <div className="flex gap-6">
                  <div className="flex gap-6">
                    <p className="text-secondary-200">{formattedDate?.deadline}</p>·
                  </div>
                  <p>{formattedDate?.formattedDate}</p>
                  <p>{formattedDate?.formattedWeekday}</p>·<p>{formattedDate?.formattedTime}</p>
                </div>
              </div>
              <div className="h-44 w-220 whitespace-normal text-body-1Sb text-white md:h-56 md:w-392 md:text-heading-2Sb">
                {data.name}
              </div>
            </div>
          </div>
          <div className="mx-10 mt-16 md:mx-20 md:mt-12">
            <InfoBadge userData={userData} data={data} />
          </div>
        </div>
        <div className="absolute right-20 top-186 md:right-30 md:top-30">
          <Bookmark favorite={favorite} handleToggleBookmark={handleToggleBookmark} />
        </div>
      </div>
    </>
  );
}
