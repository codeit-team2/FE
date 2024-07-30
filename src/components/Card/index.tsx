import { useQueryClient } from '@tanstack/react-query';

import React, { useState } from 'react';

import Bookmark from '../common/Bookmark';
import DynamicModal from '../common/Modal/Dynamic';
import LoginRequired from '../common/Modal/LoginRequired';
import { Button } from '../ui/button';
import { getCookie } from 'cookies-next';
import Image from 'next/image';

import Description from '@/components/Card/Description';
import Person from '@/components/Card/Person';
import ProgressPercentage from '@/components/Card/ProgressPercentage';

import { usePostGatheringsJoin, usePostGatheringsLeave } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gatherings';

interface CardProps {
  data: Gathering;
  clickFavorites: (item: Gathering) => void;
  isFavorite: (item: Gathering) => boolean;
}

export default function Card({ data, clickFavorites, isFavorite }: CardProps) {
  const minReached = data.participantCount >= 5;
  const favorite = isFavorite(data);
  const queryClient = useQueryClient();
  const isEntered = data.isJoiner;

  console.log(data);

  const maxReached = data.participantCount >= data.capacity;

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const joinMutation = usePostGatheringsJoin({
    onSuccess: (data) => {
      console.log('참여하기 성공', data);
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
    },
    onError: (error) => {
      console.error('참여하기 실패', error);
    },
  });

  const leaveMutation = usePostGatheringsLeave({
    onSuccess: (data) => {
      console.log('참여 취소하기 성공', data);
      queryClient.invalidateQueries({ queryKey: ['gatherings'] });
    },
    onError: (error) => {
      console.error('참여 취소하기 실패', error);
    },
  });

  const handleJoin = () => {
    joinMutation.mutate(data.gatheringId);
  };

  const handleLeave = () => {
    leaveMutation.mutate(data.gatheringId);
  };

  const handleClick = () => {
    console.log('handleClick called. isEntered:', isEntered);
    if (isEntered) {
      handleLeave();
    } else {
      handleJoin();
    }
    setDialogOpen(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleOpenDialog = () => {
    const accessToken = getCookie('accessToken');
    if (!accessToken) {
      setShowLoginModal(true);
      return;
    }
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handleToggleBookmark = () => {
    if (data) {
      clickFavorites(data);
    }
  };

  return (
    <>
      {showLoginModal && (
        <>
          <div className="fixed inset-0 z-40 bg-neutral-900 opacity-70"></div>
          <LoginRequired onClose={handleCloseLoginModal} />
        </>
      )}
      <div className="relative flex w-full max-w-screen-lg flex-col gap-16 rounded-lg bg-white p-8 md:h-230 md:flex-row md:gap-10 md:p-20 lg:gap-20">
        <div className="relative h-163 w-full rounded-lg bg-neutral-50 md:h-190 md:w-373">
          <Image
            src={data.gatheringImageUrl}
            alt={data.name}
            objectFit="contain"
            fill
            className="rounded-md object-cover"
          />
          {minReached && (
            <Image
              src={data.gatheringImageUrl}
              alt={data.name}
              objectFit="contain"
              fill
              className="rounded-md object-cover"
            />
          )}
          {minReached && (
            <div className="absolute flex h-36 w-81 items-center justify-center rounded-br-md rounded-tl-md bg-secondary-300 text-body-2M text-white">
              개설확정
            </div>
          )}
        </div>
        <div className="relative mx-12 flex grow flex-col items-start justify-between text-gray-600 md:mx-0">
          <Description data={data} />
          <div className="mb-11 flex w-full items-center justify-center gap-8 md:gap-16">
            <div className="flex w-full items-center gap-16">
              <Person data={data} />
              <ProgressPercentage data={data} />
            </div>
            <>
              <Button
                className="mb-2 h-42 w-full md:w-200 lg:w-288"
                onClick={handleOpenDialog}
                variant={'secondary'}
                disabled={!isEntered && maxReached}
              >
                {maxReached ? '참여마감' : isEntered ? '참여 취소하기' : '참여하기'}
              </Button>
              <DynamicModal
                modalType="confirm"
                title={isEntered ? '참여 취소하기' : '참여하기'}
                description={isEntered ? '참여 취소하시겠습니까?' : '해당 모임에 참여하시겠습니까?'}
                isOpen={isDialogOpen}
                onClose={handleCloseDialog}
                buttonText={isEntered ? '취소하기' : '참여하기'}
                buttonOnClick={handleClick}
              />
            </>
          </div>
        </div>
        <div className="absolute right-30 top-30">
          <Bookmark favorite={favorite} handleToggleBookmark={handleToggleBookmark} />
        </div>
      </div>
    </>
  );
}
