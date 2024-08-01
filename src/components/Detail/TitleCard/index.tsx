import React from 'react';

import Image from 'next/image';

import Bookmark from '@/components/common/Bookmark';

import InfoBadge from '@/components/Detail/InfoBadge';

import { formatDate } from '@/lib/utils';

import { useGetGatheringsParticipant } from '@/hooks/useGatherings';

import { Gathering, GatheringsParams } from '@/types/gatherings';

interface TitleCardProps {
  data: Gathering;
  clickFavorites: (item: Gathering) => void;
  isFavorite: (item: Gathering) => boolean;
  queryId: number;
}

export default function TitleCard({ data, clickFavorites, isFavorite, queryId }: TitleCardProps) {
  const today = new Date();
  const freshDataFiltering = new Date(data.dateTime) >= today;
  const value: GatheringsParams = {
    page: 0,
    size: 20,
    sortBy: 'joinedAt',
    sortOrder: 'asc',
  };

  const { data: participantData } = useGetGatheringsParticipant(queryId, value);

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
        <div className="relative h-170 w-full overflow-hidden rounded-t-lg bg-neutral-100 md:h-253 md:w-495 md:rounded-l-lg md:rounded-tr-none">
          <Image src={data.gatheringImageUrl} alt={data.name} fill />
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
            <InfoBadge userData={participantData} data={data} />
          </div>
        </div>
        <div className="absolute right-20 top-186 md:right-30 md:top-30">
          <Bookmark
            favorite={favorite}
            handleToggleBookmark={handleToggleBookmark}
            freshDataFiltering={freshDataFiltering}
          />
        </div>
      </div>
    </>
  );
}
