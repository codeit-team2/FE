import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import { Button } from '@/components/ui/button';
import useIsMobile from '@/hooks/useIsMobile';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';

export default function NotFound() {
  const router = useRouter();
  return (
    <>
      <GNB />
      <MainLayout>
        <div className="flex h-screen flex-col items-center justify-center gap-16 md:gap-22">
          <div className="relative h-100 w-100 md:h-150 md:w-150">
            <Image src="/icons/ic-warning-cloud.svg" alt="cloud" fill />
          </div>
          <p className="text-xl">서비스 이용에 불편을 드려 죄송합니다</p>
          {useIsMobile() ? (
            <p className="text-center font-Pretendard text-base text-neutral-500">
              현재 일시적으로 시스템 오류가 발생하여
              <br />
              요청하신 페이지를 찾을 수 없습니다
              <br />
              잠시 후 다시 이용 부탁드립니다
            </p>
          ) : (
            <p className="text-center font-Pretendard text-base text-neutral-500">
              현재 일시적으로 시스템 오류가 발생하여 요청하신 페이지를 찾을 수 없습니다
              <br />
              잠시 후 다시 이용 부탁드립니다
            </p>
          )}
          <div className="flex w-full flex-row gap-8 sm:gap-12">
            <Button onClick={() => router.back()} variant={'secondary'} className="w-1/2">
              이전
            </Button>
            <Button onClick={() => router.push('/')} className="w-1/2">
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </MainLayout>
    </>
  );
}
