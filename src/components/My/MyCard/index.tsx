import { useQueryClient } from '@tanstack/react-query';

import React from 'react';

import Image from 'next/image';
import { useRouter } from 'next/router';

import ReviewModal from '@/components/common/Modal/Review';

import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import MakeClubModal from '@/components/MakeClub/Modal';
import { Button } from '@/components/ui/button';

import { isDateBeforeToday } from '@/lib/utils';

import { useDeleteGatherings, usePostGatheringsLeave } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

interface Props {
  data: Gathering;
  type?: 'default' | 'review' | 'club';
}

export default function MyCard({ data, type = 'default' }: Props) {
  const IsDateBeforeToday = isDateBeforeToday({ date: data.dateTime });
  const router = useRouter();
  const queryClient = useQueryClient();

  // 모임 취소하기
  const deleteMutation = useDeleteGatherings({
    onSuccess: (data) => {
      console.log('개설 취소하기 성공', data);
      alert('모임이 성공적으로 삭제됐습니다!');
      router.push('/');
    },
    onError: (error) => {
      console.error('개설 취소하기 실패', error);
      alert('모임 삭제 실패');
    },
  });

  const handleDeleteClick = () => {
    console.log('handleDelete called with queryId:', data.gatheringId);
    deleteMutation.mutate(data.gatheringId);
  };

  // 모임 참여 취소하기
  const leaveMutation = usePostGatheringsLeave({
    onSuccess: () => {
      console.log('참여 취소하기 성공');
      window.location.reload();
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
    <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
      <div
        className="relative h-163 w-full cursor-pointer rounded-lg bg-neutral-50 md:h-190 md:w-373"
        onClick={() => router.push(`/detail/${data.gatheringId}`)}
      >
        <Image
          src={data.gatheringImageUrl}
          alt={data.name}
          fill
          objectFit="contain"
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
            후기를 남겨주세요
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
            <Button variant={'secondary'} onClick={() => handleDeleteClick()}>
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
