import React from 'react';
import Image from 'next/image';

export default function GNB() {
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
        <a href="/" className="font-Pretendard text-base font-medium text-gray-500">
          로그인
        </a>
      </div>
    </div>
  );
}
