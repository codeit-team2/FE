import { useQueryClient } from '@tanstack/react-query';

import React, { useState } from 'react';

import { getCookie } from 'cookies-next';
import Image from 'next/image';
import { useRouter } from 'next/router';

import DynamicModal from '@/components/common/Modal/Dynamic';
import LoginRequired from '@/components/common/Modal/LoginRequired';

import { Button } from '@/components/ui/button';

import {
  useDeleteGatherings,
  usePostGatheringsJoin,
  usePostGatheringsLeave,
} from '@/hooks/useGatherings';

import { Gathering, GatheringsParams } from '@/types/gatherings';

interface FloatingBarProps {
  data: Gathering;
  queryId: number;
}

export default function FloatingBar({ data, queryId }: FloatingBarProps) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const isOwner = data.isCreator;
  const isEntered = data.isJoiner;

  const maxReached = data.participantCount >= data.capacity;

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isCancelOpen, setCancelOpen] = useState<boolean>(false);

  const value: GatheringsParams = {
    page: 0,
    size: 20,
    sortBy: 'joinedAt',
    sortOrder: 'asc',
  };

  const joinMutation = usePostGatheringsJoin({
    onSuccess: (data) => {
      console.log('참여하기 성공', data);
      queryClient.invalidateQueries({
        queryKey: ['gatherings', queryId],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({ queryKey: ['gatheringsParticipant', queryId, value] });
    },
    onError: (error) => {
      console.error('참여하기 실패', error);
    },
  });

  const leaveMutation = usePostGatheringsLeave({
    onSuccess: (data) => {
      console.log('참여 취소하기 성공', data);
      queryClient.invalidateQueries({
        queryKey: ['gatherings', queryId],
        refetchType: 'active',
      });
      queryClient.invalidateQueries({ queryKey: ['gatheringsParticipant', queryId, value] });
    },
    onError: (error) => {
      console.error('참여 취소하기 실패', error);
    },
  });

  const deleteMutation = useDeleteGatherings({
    onSuccess: (data) => {
      console.log('개설 취소하기 성공', data);
      router.push('/');
    },
    onError: (error) => {
      console.error('개설 취소하기 실패', error);
    },
  });

  const handleJoin = () => {
    joinMutation.mutate(queryId);
  };

  const handleLeave = () => {
    leaveMutation.mutate(queryId);
  };

  const handleDelete = () => {
    console.log('handleDelete called with queryId:', queryId);
    deleteMutation.mutate(queryId);
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

  const handleDeleteClick = () => {
    handleDelete();
    setCancelOpen(false);
  };

  const handleCopyURL = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      alert('링크가 복사되었습니다.😆');
    } catch (err) {
      console.error('링크 복사에 실패했습니다.🥲', err);
    }
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

  const handleOpenCancelDialog = () => {
    setCancelOpen(true);
  };

  const handleCloseCancelDialog = () => {
    setCancelOpen(false);
  };

  return (
    <>
      {showLoginModal && (
        <>
          <LoginRequired isModalOpen={showLoginModal} setIsModalOpen={setShowLoginModal} />
        </>
      )}
      <div className="fixed bottom-0 z-30 flex h-84 w-full items-center justify-center border border-t-neutral-100 bg-white bg-opacity-20 px-12 py-12 backdrop-blur-md md:h-74 md:py-16">
        {isOwner ? (
          <div className="flex w-full justify-center gap-8 md:gap-12">
            <Button className="w-286 md:w-392" onClick={handleOpenCancelDialog}>
              개설 취소하기
            </Button>
            <DynamicModal
              modalType="confirm"
              title="개설 취소하기"
              description="개설을 취소하시겠습니까?"
              isOpen={isCancelOpen}
              onClose={handleCloseCancelDialog}
              buttonText="개설 취소하기"
              buttonOnClick={handleDeleteClick}
            />
            <button onClick={handleCopyURL} className="h-42 w-42 rounded-sm bg-neutral-900 p-9">
              <div className="relative h-24 w-24">
                <Image src={'/icons/ic-share.svg'} alt="share-button" fill />
              </div>
            </button>
          </div>
        ) : (
          <>
            <Button
              className="w-336 md:w-392"
              onClick={handleOpenDialog}
              disabled={!isEntered && maxReached}
            >
              {isEntered ? '참여 취소하기' : '참여하기'}
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
        )}
      </div>
    </>
  );
}
