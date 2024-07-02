import React from 'react';
import Image from 'next/image';

export default function GNB() {
  // api 연동하면서 수정필요
  const isloginStatus = false;
  const likeItems = 10;

  return (
    <div className="shadow-gnbShadow flex w-full flex-row justify-between px-32 py-16">
      <Image src="/icons/Logo.svg" alt="logo" priority={true} width={65} height={14} />
      <div className="flex flex-row gap-40">
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
            <Image src="/icons/profile.svg" alt="profile" width={32} height={32} />
          </>
        ) : (
          <a href="/" className="font-Pretendard text-base font-medium text-gray-500">
            로그인
          </a>
        )}
      </div>
    </div>
  );
}
