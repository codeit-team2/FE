import LoginRequired from '@/components/common/Modal/LoginRequired';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import React, { useState } from 'react';

export default function FloatingBar({ data }: any) {
  const isOwner = false;

  const maxReached = data.member >= 20;

  const [isEntered, setIsEntered] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const isLoggedIn = false;

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

  return (
    <>
      {showLoginModal && (
        <>
          <div className="fixed inset-0 z-40 bg-neutral-900 opacity-70"></div>
          <LoginRequired onClose={handleCloseLoginModal} />
        </>
      )}
      <div className="fixed bottom-0 flex h-74 w-full items-center justify-center border border-t-neutral-100 py-16 backdrop-blur-sm">
        {isOwner ? (
          <div className="flex items-center justify-center gap-12">
            <Button className="w-392">개설 취소하기</Button>
            <button onClick={handleCopyURL}>
              <Image src={'/icons/share-button.svg'} alt="share-button" width={42} height={42} />
            </button>
          </div>
        ) : (
          <Button
            className="w-392"
            onClick={handleClick}
            disabled={!isEntered && maxReached}
            children={isEntered ? '참여 취소하기' : '참여하기'}
          />
        )}
      </div>
    </>
  );
}
