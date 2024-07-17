import React, { useState } from 'react';

import Image from 'next/image';

import CheckModal from '@/components/common/Modal/Check';
import LoginRequired from '@/components/common/Modal/LoginRequired';

import { Button } from '@/components/ui/button';

import { Gathering } from '@/types/testDataType';

interface FloatingBarProps {
  data: Gathering;
}

export default function FloatingBar({ data }: FloatingBarProps) {
  const isOwner = false;

  const maxReached = data.participantCount >= data.capacity;

  const [isEntered, setIsEntered] = useState<boolean>(false);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [isDialogOpen, setDialogOpen] = useState<boolean>(false);

  const isLoggedIn = true;

  const handleClick = () => {
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setIsEntered((prevIsEntered) => !prevIsEntered);
    }
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

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleOpenDialog = () => {
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  return (
    <>
      {showLoginModal && (
        <>
          <div className="fixed inset-0 z-40 bg-neutral-900 opacity-70"></div>
          <LoginRequired onClose={handleCloseLoginModal} />
        </>
      )}
      <div className="fixed bottom-0 flex h-84 w-full items-center justify-center border border-t-neutral-100 px-12 py-12 backdrop-blur-sm md:h-74 md:py-16">
        {isOwner ? (
          <div className="flex w-full justify-center gap-12">
            <Button className="w-286 md:w-392">개설 취소하기</Button>
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
            <CheckModal
              modalType={isEntered ? 'leave' : 'join'}
              isOpen={isDialogOpen}
              onClose={handleCloseDialog}
              onConfirm={handleClick}
            />
          </>
        )}
      </div>
    </>
  );
}
