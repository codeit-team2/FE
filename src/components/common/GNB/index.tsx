import React, { useState } from 'react';
import Image from 'next/image';
import LoginModal from '@/components/common/Modal/Login';
import SignupModal from '@/components/common/Modal/Signup';

export default function GNB() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // api 연동하면서 수정필요
  const isloginStatus = false;
  const likeItems = 10;

  return (
    <div className="flex w-full flex-row justify-between px-20 py-16 shadow-sm md:px-32 md:py-16">
      <Image src="/icons/ic-logo.svg" alt="logo" priority={true} width={65} height={14} />
      <div className="flex flex-row gap-12 md:gap-40">
        <a href="/" className="font-Pretendard text-base font-semibold">
          모임 찾기
        </a>
        <a href="/" className="font-Pretendard text-base font-medium text-gray-500">
          모든 리뷰
        </a>
        {isloginStatus ? (
          <>
            <div className="flex flex-row gap-4">
              <a href="/" className="font-Pretendard text-base font-medium text-gray-500">
                찜한 모임
              </a>
              {likeItems ? <p className="text-blue-600">{likeItems}</p> : ''}
            </div>
            <Image src="/icons/ic-profile.svg" alt="ic-profile" width={32} height={32} />
          </>
        ) : (
          <div className="font-Pretendard text-base font-medium text-gray-500">
            <LoginModal
              isLoginModalOpen={isLoginModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
              setIsSignupModalOpen={setIsSignupModalOpen}
            />
            <SignupModal
              isSignupModalOpen={isSignupModalOpen}
              setIsSignupModalOpen={setIsSignupModalOpen}
              setIsLoginModalOpen={setIsLoginModalOpen}
            />
          </div>
        )}
      </div>
    </div>
  );
}
