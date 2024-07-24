import React from 'react';

import Image from 'next/image';

interface BannerProps {
  page: 'home' | 'bookmark' | 'review';
  nickname?: string;
}

const bannerContents = {
  home: {
    mainTitle: '너, 내 취미 동료가 돼라',
    subTitle: '취ZONE에서 쉽고 빠르게 취미 모임에 참여해보세요!',
    leftText: '같이 가치해',
    rightText: '모여봐요 취미의 숲',
    image: '/images/banner-home.png',
    alt: '웃는 얼굴 사진',
  },
  bookmark: {
    mainTitle: (nickname: string) => `${nickname}님이 찜한 모임이에요`,
    subTitle: '마감되기 전에 지금 바로 참여해보세요!',
    leftText: '내 마음 속에 저장',
    rightText: '취ZONE에 저장',
    image: '/images/banner-bookmark.png',
    alt: '하트 사진',
  },
  review: {
    mainTitle: '활동 후기가 증명해요',
    subTitle: '생생한 후기가 모임을 선택하는데에 큰 도움을 줄거에요',
    leftText: '한번 더 참여할래요',
    rightText: '너무 재미있었어요',
    image: '/images/banner-review.png',
    alt: '말풍선 사진',
  },
};

export default function Banner({ page, nickname = '' }: BannerProps) {
  const content = bannerContents[page];

  const mainTitle =
    typeof content.mainTitle === 'function' ? content.mainTitle(nickname) : content.mainTitle;

  return (
    <div className="flex h-224 w-full flex-col-reverse items-center justify-between rounded-lg bg-custom-profile-gradient px-16 pb-34 pt-28 text-white shadow-banner md:px-80 lg:h-200 lg:flex-row lg:pb-0 lg:pt-0">
      <div>
        <p className="mb-4 text-center text-[28px] font-bold leading-[140%] -tracking-[0.56px] lg:mb-8 lg:text-left lg:text-[36px] lg:-tracking-[0.72px]">
          {mainTitle}
        </p>
        <p className="text-center text-body-3Sb lg:text-left lg:text-heading-2Sb">
          {bannerContents[page].subTitle}
        </p>
      </div>
      <div className="relative flex">
        <span className="absolute -left-2 top-10 z-10 rounded-full bg-neutral-900 px-13 py-[6.5px] text-[10.286px] font-semibold leading-[140%] -tracking-[0.103px] shadow-lg lg:left-16 lg:top-14 lg:px-20 lg:py-10 lg:text-[16px] lg:-tracking-[0.16px]">
          {bannerContents[page].leftText}
        </span>
        <span className="absolute bottom-4 right-6 z-10 rounded-full bg-neutral-900 px-13 py-[6.5px] text-[10.286px] font-semibold leading-[140%] -tracking-[0.103px] shadow-lg lg:-right-12 lg:bottom-10 lg:px-20 lg:py-10 lg:text-[16px] lg:-tracking-[0.16px]">
          {bannerContents[page].rightText}
        </span>
        <div
          className={`relative h-90 w-90 translate-x-14 opacity-40 lg:h-140 lg:w-140 lg:translate-x-40 ${page === 'bookmark' && 'rotate-[15deg]'} ${page === 'review' && 'translate-x-6 lg:translate-x-29'}`}
        >
          <Image src={bannerContents[page].image} alt={bannerContents[page].alt} fill />
        </div>
        <div
          className={`relative h-90 w-90 lg:h-140 lg:w-140 lg:translate-x-20 ${page === 'bookmark' && 'rotate-[15deg]'}`}
        >
          <Image src={bannerContents[page].image} alt={bannerContents[page].alt} fill />
        </div>
        <div
          className={`relative h-90 w-90 -translate-x-14 opacity-40 lg:h-140 lg:w-140 lg:translate-x-4 ${page === 'bookmark' && 'rotate-[15deg]'} ${page === 'review' && '-translate-x-6 lg:translate-x-9'}`}
        >
          <Image src={bannerContents[page].image} alt={bannerContents[page].alt} fill />
        </div>
      </div>
    </div>
  );
}
