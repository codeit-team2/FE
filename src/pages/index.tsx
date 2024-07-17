import Image from 'next/image';

import Banner from '@/components/common/Banner';
import Dropdown from '@/components/common/Dropdown';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import Tap from '@/components/common/Tap';

import Card from '@/components/Card';
import Test from '@/components/Card/testData.js';
import ChipTap from '@/components/ChipTap';
import MakeClubModal from '@/components/MakeClub/Modal';
import NotCard from '@/components/NotCard';

import useFavorite from '@/hooks/useFavorite';

export default function Main() {
  const { clickFavorites, isFavorite } = useFavorite();
  return (
    <>
      <GNB />
      <MainLayout>
        <div className="mx-auto max-w-screen-lg">
          <Banner
            mainTitle={
              <>
                취미를 함께할 동료를 찾고 있나요?
                <br />
                취ZONE에서 쉽고 빠르게 다채로운 취미 모임에 참여해보세요
              </>
            }
            subTitle="운동부터 원데이클래스까지 든든하게 준비되어 있어요"
          />
          <div className="mb-20 mt-32 md:mb-27">
            <Tap />
          </div>
          <ChipTap />

          <div className="mb-32 flex justify-between">
            <div className="flex gap-8 md:gap-12">
              <Dropdown
                items={['중랑구', '광진구', '용산구', '을지로3가']}
                itemTrigger="지역선택"
              />
              <Dropdown icon="icons/ic-chevron-down.svg" itemTrigger="날짜선택" />
            </div>
            <Dropdown items={['마감임박', '참여 인원순']} itemTrigger="마감임박" isUpDown />
          </div>
          <MakeClubModal trigger="plus" />
          <div className="flex flex-col gap-20">
            {Test ? (
              <>
                {Test.map((data, index) => (
                  <Card
                    key={index}
                    data={data}
                    clickFavorites={clickFavorites}
                    isFavorite={isFavorite}
                  />
                ))}
                <div className="mb-16 mt-40 h-2 w-full bg-neutral-100" />
                <button className="flex w-full items-center justify-center pb-50">
                  더 보기
                  <div className="relative h-24 w-24">
                    <Image src="icons/ic-chevron-down.svg" alt="dropdown" fill />
                  </div>
                </button>
              </>
            ) : (
              <NotCard />
            )}
          </div>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
