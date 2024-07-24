import { LOCATION } from '@/constants/dropdownItems';

import { useEffect, useState } from 'react';
import React from 'react';

import Image from 'next/image';

import Banner from '@/components/common/Banner';
import Dropdown from '@/components/common/Dropdown';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import Tap from '@/components/common/Tap';

import Card from '@/components/Card';
import ChipTap from '@/components/ChipTap';
import Loading from '@/components/Loading';
import MakeClubModal from '@/components/MakeClub/Modal';
import NotCard from '@/components/NotCard';

import useFavorite from '@/hooks/useFavorite';
import { useGetGatherings } from '@/hooks/useGatherings';

import { Gathering } from '@/types/gathering';

export default function Main() {
  const [sortBy, setSortBy] = useState<string>('dateTime');
  const [sortOrder, setSortOrder] = useState<string>('asc');
  const [location, setLocation] = useState<string | null>(null);

  // bookmark도 mainCategory, subCategory두개 핸들러랑 같이 쓰는데 훅으로 만들수 있을것 같으니 시도해보기.
  const [mainCategory, setMainCategory] = useState<string>('운동');
  const [subCategory, setSubCategory] = useState<string>('전체');

  const { clickFavorites, isFavorite } = useFavorite();

  const handleMainTapClick = (title: string) => {
    setMainCategory(title);
  };

  const handleSubTapClick = (title: string) => {
    setSubCategory(title);
  };

  const handleLocationClick = (location: string | null) => {
    setLocation(location);
  };

  const {
    data: postsData,
    isPending,
    fetchNextPage,
    hasNextPage,
    isError,
  } = useGetGatherings(mainCategory, subCategory, sortBy, sortOrder, location);

  useEffect(() => {
    setSubCategory('전체');
  }, [mainCategory]);

  useEffect(() => {
    setLocation(null);
  }, [mainCategory, subCategory]);

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
            <Tap handleMainTapClick={handleMainTapClick} mainCategory={mainCategory} />
          </div>
          <ChipTap
            mainCategory={mainCategory}
            handleSubTapClick={handleSubTapClick}
            subCategory={subCategory}
          />

          <div className="mb-32 flex justify-between">
            <div className="flex gap-8 md:gap-12">
              <Dropdown
                items={LOCATION}
                itemTrigger="지역선택"
                handleLocationClick={handleLocationClick}
                // 이름 나중에 resetTrigger같은걸로 바꾸기.
                mainCategory={mainCategory}
                subCategory={subCategory}
                // 이거 두개
              />
              <Dropdown icon="icons/ic-chevron-down.svg" itemTrigger="날짜선택" />
            </div>
            <Dropdown items={['마감임박', '참여 인원순']} itemTrigger="마감임박" isUpDown />
          </div>
          <MakeClubModal trigger="plus" />
          <div className="flex flex-col gap-20">
            {postsData ? (
              <>
                {postsData.pages.map((datas: Array<Gathering>, i: number) => (
                  <React.Fragment key={i}>
                    {datas.map((data: Gathering, index: number) => {
                      return (
                        <>
                          <Card
                            key={index}
                            data={data}
                            clickFavorites={clickFavorites}
                            isFavorite={isFavorite}
                          />
                        </>
                      );
                    })}
                  </React.Fragment>
                ))}
                {hasNextPage && (
                  <>
                    <div className="mb-16 mt-40 h-2 w-full bg-neutral-100" />
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
              <>{isPending ? <Loading width="300" height="300" /> : <NotCard />}</>
            )}
          </div>
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
