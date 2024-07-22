import { useState } from 'react';

import Banner from '@/components/common/Banner';
import Dropdown from '@/components/common/Dropdown';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import Tap from '@/components/common/Tap';

import Card from '@/components/Card';
import ChipTap from '@/components/ChipTap';
import Loading from '@/components/Loading';
import NotCard from '@/components/NotCard';

import useFavorite from '@/hooks/useFavorite';

export default function Bookmark() {
  const [mainCategory, setMainCategory] = useState('운동');
  const [subCategory, SetSubCategory] = useState('전체');

  const { isFavorite, clickFavorites, favorites } = useFavorite();

  const handleChipTapChanger = (title: string) => {
    setMainCategory(title);
  };

  const handleChipTapClick = (title: string) => {
    SetSubCategory(title);
  };

  return (
    <>
      <GNB />
      <MainLayout>
        <Banner
          mainTitle="[000(유저닉네임) or 유저]님이 찜한
          취ZONE의 취미 모임이에요"
          subTitle="마감되기 전에 지금 바로 참여해보세요"
        />
        <div className="mb-20 mt-32 md:mb-27">
          <Tap handleChipTapChanger={handleChipTapChanger} />
        </div>
        <ChipTap mainCategory={mainCategory} handleChipTapClick={handleChipTapClick} />

        <div className="mb-32 flex justify-between">
          <div className="flex gap-8 md:gap-12">
            <Dropdown
              items={['중랑구', '광진구', '용산구', '을지로3가']}
              icon="icons/ic-chevron-down.svg"
              itemTrigger="지역선택"
            />
            <Dropdown icon="icons/ic-chevron-down.svg" itemTrigger="날짜선택" />
          </div>
          <Dropdown
            items={['마감임박', '참여 인원순']}
            icon="/icons/ic-chevron-updown.svg"
            itemTrigger="마감임박"
            isUpDown
          />
        </div>
        <div className="flex flex-col gap-20">
          {favorites ? (
            <>
              {favorites.map((data, index) => (
                <Card
                  key={index}
                  data={data}
                  isFavorite={isFavorite}
                  clickFavorites={clickFavorites}
                />
              ))}
              <div className="mb-50" />
            </>
          ) : (
            <NotCard findClub="모임 찾기" />
          )}
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
