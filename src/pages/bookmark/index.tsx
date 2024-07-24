import { LOCATION } from '@/constants/dropdownItems';

import { useEffect, useState } from 'react';

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

import { Gathering } from '@/types/gathering';

export default function Bookmark() {
  const { isFavorite, clickFavorites, favorites } = useFavorite();
  const [mainCategory, setMainCategory] = useState('운동');
  const [subCategory, SetSubCategory] = useState('전체');
  const [location, setLocation] = useState<string | null>(null);
  const [trimmedFavorites, setTrimmedFavorites] = useState<Array<Gathering>>([]);
  console.log('bookmarkTrimmedFavorites : ', trimmedFavorites);

  const handleMainTapClick = (title: string) => {
    setMainCategory(title);
    setTrimmedFavorites(favorites.filter((data) => data.mainCategoryName === mainCategory));
  };

  const handleSubTapClick = (title: string) => {
    SetSubCategory(title);
  };

  const handleLocationClick = (location: string | null) => {
    setLocation(location);
  };

  useEffect(() => {
    setTrimmedFavorites(favorites.filter((data) => data.mainCategoryName === mainCategory));
  }, [favorites, mainCategory]);

  useEffect(() => {
    // mainCategory와 favorites가 변경될 때마다 trimmedFavorites를 업데이트
    if (subCategory === '전체') {
      SetSubCategory('전체');
    } else {
      setTrimmedFavorites(favorites.filter((data) => data.subCategoryName === subCategory));
    }
  }, [subCategory]);

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
              icon="icons/ic-chevron-down.svg"
              itemTrigger="지역선택"
              handleLocationClick={handleLocationClick}
              mainCategory={mainCategory}
              subCategory={subCategory}
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
          {trimmedFavorites ? (
            <>
              {trimmedFavorites.map((data, index) => (
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
