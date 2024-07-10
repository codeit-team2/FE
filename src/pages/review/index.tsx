import ChipTap from '@/components/ChipTap';
import Banner from '@/components/common/Banner';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import Tap from '@/components/common/tap';
import React from 'react';
import NotReview from '@/components/NotReview';
import { Button } from '@/components/ui/button';
import StarRatingAverage from '@/components/Review/StarRatingAverage';
import mockData from '@/components/Review/reviewTestData.json';
import Dropdown from '@/components/common/dropdown';
import UserReview from '@/components/Review/UserReview';

export default function Review() {
  const isReview = true;

  return (
    <>
      <GNB />
      <div className="mx-auto flex min-h-screen w-full flex-col items-center bg-neutral-50 px-12 md:px-32">
        <div className="mx-auto mt-20 flex w-full max-w-[1010px] flex-col items-center md:mt-32">
          <Banner
            mainTitle={
              <>
                취ZONE 유저분들의
                <br />
                생생한 모임 활동 후기를 둘러보세요
              </>
            }
            subTitle="모임을 선택하는데에 분명 도움이 될거에요"
            variant="review"
          />
          <div className="mb-20 mt-32 md:mb-27">
            <Tap />
          </div>
          <ChipTap />
          <div className="mt-24 w-full md:mt-32">
            <StarRatingAverage mockData={mockData} />
          </div>
          <div className="my-24 mb-32 flex w-full max-w-[1010px] justify-end md:my-32">
            <Dropdown
              items={['최신순', '별점순']}
              icon="/icons/ic-chevron-updown.svg"
              itemTrigger="최신순"
              isUpDown
            />
          </div>
          {isReview ? (
            <div className='flex flex-col gap-20'><UserReview mockData={mockData} /></div>
          ) : (
            <NotReview
              text={
                <>
                  <span className="text-primary-300">모임 찾기</span>에서 모임에 참여해보세요
                </>
              }
            />
          )}
          <Button className="mt-32 w-full max-w-[1008px]" children="모임찾기" />
        </div>
      </div>
      <Footer />
    </>
  );
}
