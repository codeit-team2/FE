import { useQueryClient } from '@tanstack/react-query';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import DeleteButton from '@/components/common/DeleteButton';
import ReviewModal from '@/components/common/Modal/Review';

import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import MakeClubModal from '@/components/MakeClub/Modal';
import { Button } from '@/components/ui/button';

import { isDateBeforeToday } from '@/lib/utils';

import { usePostGatheringsLeave } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

interface Props {
  data: Gathering;
  type?: 'default' | 'review' | 'club';
}

export default function MyCard({ data, type = 'default' }: Props) {
  const IsDateBeforeToday = isDateBeforeToday({ date: data.dateTime });
  const router = useRouter();
  const queryClient = useQueryClient();

  const handleCopyURL = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.😆');
    } catch (err) {
      console.error('링크 복사에 실패했습니다.🥲', err);
    }
  };

  // 모임 참여 취소하기
  const leaveMutation = usePostGatheringsLeave({
    onSuccess: () => {
      console.log('참여 취소하기 성공');
      router.reload();
      queryClient.invalidateQueries({
        queryKey: ['gatherings', data.gatheringId],
        refetchType: 'active',
      });
    },
    onError: (error) => {
      console.error('참여 취소하기 실패', error);
    },
  });

  const handleLeaveClick = () => {
    leaveMutation.mutate(data.gatheringId);
  };

  return (
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg border-2 border-white bg-white p-8 hover:border-2 hover:border-neutral-100 hover:shadow-sm active:bg-neutral-50 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div
        className="relative h-163 w-full cursor-pointer rounded-lg bg-neutral-50 md:h-190 md:w-373"
        onClick={() => router.push(`/detail/${data.gatheringId}`)}
      >
        <Image
          src={data.gatheringImageUrl}
          alt={data.name}
          sizes="100%"
          fill
          className="rounded-md"
        />
        {IsDateBeforeToday ? (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-neutral-700 text-body-2M text-white">
            이용완료
          </div>
        ) : (
          <div className="absolute z-20 flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-primary-300 text-body-2M text-white">
            이용예정
          </div>
        )}
        {data.participantCount >= 5 && !IsDateBeforeToday && (
          <div className="absolute left-61 z-10 flex h-36 w-91 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 pl-10 text-body-2M text-white">
            개설확정
          </div>
        )}
        {IsDateBeforeToday && type !== 'club' && (
          <div className="absolute flex h-full w-full items-center justify-center rounded-md bg-neutral-900 text-center text-white opacity-70">
            이용하신 모임에 대해
            <br />
            후기를 남겨주세요!
          </div>
        )}
      </div>
      <div className="flex grow flex-col justify-between">
        <Description data={data} />
        {type === 'review' && (
          <div className="flex flex-row justify-end gap-16">
            <Person data={data} />
            <ReviewModal type="new" gatheringId={data.gatheringId} />
          </div>
        )}

        {type === 'club' && (
          <div className="flex flex-row justify-end gap-8">
            <Person data={data} />
            <MakeClubModal trigger="modify" data={data} />
            <DeleteButton gatheringId={data.gatheringId} type="mine" />
            <Button variant={'secondary'} onClick={() => handleCopyURL()}>
              <Image src="/icons/ic-share.svg" alt="share" width={24} height={24} />
            </Button>
          </div>
        )}

        {type === 'default' && (
          <div className="flex flex-row justify-end gap-16">
            <Person data={data} />
            {IsDateBeforeToday ? (
              !data.hasReviewed && <ReviewModal type="new" gatheringId={data.gatheringId} />
            ) : (
              <Button
                className="mb-2 h-42 w-288"
                variant={'secondary'}
                onClick={() => handleLeaveClick()}
              >
                예약 취소하기
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
