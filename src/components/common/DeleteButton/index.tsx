import React, { useState } from 'react';

import DynamicModal from '../Modal/Dynamic';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Button } from '@/components/ui/button';

import { useDeleteGatherings } from '@/hooks/useGatherings';
import { useDeleteReviews } from '@/hooks/useReviews';

interface Props {
  gatheringId?: number;
  reviewId?: number;
  type: 'mine' | 'review';
}

export default function DeleteButton({ gatheringId, reviewId, type }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const content = {
    mine: {
      title: '개설 취소하기',
      description: '개설을 취소하시겠습니까?',
      buttonText: '개설 취소하기',
    },
    review: {
      title: '후기 삭제하기',
      description: '후기를 삭제하시겠습니까?',
      buttonText: '후기 삭제하기',
    },
  };

  //모달 열기
  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  // 모달 닫기
  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  // 모임 취소하기
  const deleteGatheringMutation = useDeleteGatherings({
    onSuccess: (data) => {
      console.log('개설 취소하기 성공', data);
      router.reload();
    },
    onError: (error) => {
      console.error('개설 취소하기 실패', error);
    },
  });

  // 리뷰 삭제하기
  const deleteReviewMutation = useDeleteReviews({
    onSuccess: (data) => {
      router.reload();
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handleDeleteClick = () => {
    type === 'mine' && gatheringId && deleteGatheringMutation.mutate(gatheringId);
    type === 'review' && reviewId && deleteReviewMutation.mutate(reviewId);
    setIsOpen(false);
  };

  return (
    <>
      <Button variant={'secondary'} onClick={() => handleOpenDialog()}>
        <Image src="/icons/ic-delete.svg" alt="delete" width={24} height={24} />
      </Button>
      <DynamicModal
        modalType="confirm"
        title={content[type].title}
        description={content[type].description}
        isOpen={isOpen}
        onClose={handleCloseDialog}
        buttonText={content[type].buttonText}
        buttonOnClick={handleDeleteClick}
      />
    </>
  );
}
