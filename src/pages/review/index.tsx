import React, { useState } from 'react';

import Image from 'next/image';

import Banner from '@/components/common/Banner';
import Dropdown from '@/components/common/Dropdown';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import Tap from '@/components/common/Tap';

import ChipTap from '@/components/ChipTap';
import Loading from '@/components/Loading';
import NotReview from '@/components/NotReview';
import StarRatingAverage from '@/components/Review/StarRatingAverage';
import UserReview from '@/components/Review/UserReview';

import { useGetReviewsAll } from '@/hooks/useReviews';

import { Reviews } from '@/types/reviews';

export default function Review() {
  const [mainCategory, setMainCategory] = useState<string>('운동');
  const [subCategory, setSubCategory] = useState<string>('전체');
  const [sortOrder, setSortOrder] = useState<string>('desc');

  const handleMainTapClick = (title: string) => {
    setMainCategory(title);
  };

  const handleSubTapClick = (title: string) => {
    setSubCategory(title);
  };

  const {
    data: allReviewData,
    isPending,
    fetchNextPage,
    hasNextPage,
  } = useGetReviewsAll(mainCategory, subCategory, 5, 'score', sortOrder);

  const reviewData = allReviewData?.pages.flatMap((page) => page.reviewInfos) || [];
  const scoreData = allReviewData?.pages[0]?.scoreInfo || {
    averageScore: 0,
    scoreOneCount: 0,
    scoreTwoCount: 0,
    scoreThreeCount: 0,
    scoreFourCount: 0,
    scoreFiveCount: 0,
  };

  console.log(allReviewData);

  const handleSortOrderClick = (item: string | null) => {
    if (item === '높은순') {
      setSortOrder('desc');
    } else if (item === '낮은순') {
      setSortOrder('asc');
    }
  };

  return (
    <>
      <GNB />
      <MainLayout>
        <Banner page="review" />
        <div className="mb-20 mt-32 md:mb-27">
          <Tap handleMainTapClick={handleMainTapClick} mainCategory={mainCategory} />
        </div>
        <ChipTap
          mainCategory={mainCategory}
          handleSubTapClick={handleSubTapClick}
          subCategory={subCategory}
        />
        <div className="mt-24 w-full md:mt-32">
          <StarRatingAverage data={scoreData} />
        </div>
        <div className="my-22 flex w-full max-w-[1010px] justify-end md:my-30">
          <Dropdown
            items={['높은순', '낮은순']}
            icon="/icons/ic-chevron-updown.svg"
            itemTrigger="별점순"
            isUpDown
            handleLocationClick={handleSortOrderClick}
          />
        </div>
        {isPending ? (
          <Loading width="300" height="300" />
        ) : reviewData.length > 0 ? (
          <>
            <div className="mb-8 flex w-full flex-col gap-20 md:mb-18">
              {reviewData.map((data: Reviews, index: number) => (
                <UserReview key={index} data={data} />
              ))}
            </div>
            {hasNextPage && (
              <>
                <div className="mb-0 mt-12 h-2 w-full bg-neutral-100 md:mb-16 md:mt-40" />
                <button
                  className="flex w-full items-center justify-center"
                  onClick={() => fetchNextPage()}
                >
                  더 보기
                  <div className="relative h-24 w-24">
                    <Image src="icons/ic-chevron-down.svg" alt="dropdown" fill />
                  </div>
                </button>
              </>
            )}
          </>
        ) : (
          <div className="pt-70">
            <NotReview type="find" />
          </div>
        )}
      </MainLayout>
      <Footer />
    </>
  );
}
