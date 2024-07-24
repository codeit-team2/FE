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

import { useGetAccounts } from '@/hooks/useAccounts';
import useCheckLogin from '@/hooks/useCheckLogin';
import useFavorite from '@/hooks/useFavorite';

import { Gathering } from '@/types/gathering';

export default function Bookmark() {
  const { isFavorite, clickFavorites, favorites } = useFavorite();
  const [mainCategory, setMainCategory] = useState('운동');
  const [subCategory, SetSubCategory] = useState('전체');
  const [location, setLocation] = useState<string | null>(null);

  useCheckLogin();

  const { data: user } = useGetAccounts();
  const [trimmedFavorites, setTrimmedFavorites] = useState<Array<Gathering>>([]);

  const handleMainTapClick = (title: string) => {
    setMainCategory(title);
    setTrimmedFavorites(favorites.filter((data) => data.mainCategoryName === mainCategory));
  };

  const handleSubTapClick = (title: string) => {
    SetSubCategory(title);
  };

  const handleLocationClick = (region: string | null) => {
    setLocation(region);
  };

  // mainCategory(TapComponent)가 클릭되어 값이 바뀌면 favorites(localStorage)의 값을 mainCategory값으로 필터링
  useEffect(() => {
    // subCategory('전체')는 전체로 바꿔줄만한 트리거가 보이지 않아 하드코딩
    setTrimmedFavorites(favorites.filter((data) => data.mainCategoryName === mainCategory));
    SetSubCategory('전체');
  }, [favorites, mainCategory]);

  // subCategory(ChipTapComponents)가 클릭되어 값이 바뀌면 favorites(localStorage)의 값을 subCategory값으로 필터링
  useEffect(() => {
    // subCategory('전체')인 경우는 mainCategory의 값으로 필터링하여 전체를 보여줌
    if (subCategory === '전체') {
      setTrimmedFavorites(favorites.filter((data) => data.mainCategoryName === mainCategory));
    } else {
      setTrimmedFavorites(favorites.filter((data) => data.subCategoryName === subCategory));
    }
  }, [subCategory]);

  // location(지역구Dropdown)가 클릭되어 값이 바뀌면 favorites(localSotrage)의 값을 location값으로 필터링
  useEffect(() => {
    // firstFilter는 favorites에서 mainCategory와 같은 값을 가져옴
    const firstFilter = favorites.filter((data) => data.mainCategoryName === mainCategory);

    // subCategory('전체')인 경우는 firstFilter에서 location이 같은 값을 가져옴
    if (subCategory === '전체') {
      setTrimmedFavorites(firstFilter.filter((data) => data.location === location));
    } else {
      // secondFilter는 firstFilter에서 subCategory까지 값이 같은지 확인
      const secondFilter = firstFilter.filter((data) => data.subCategoryName === subCategory);
      // firstFilter로 mainCategory(TapComponent)의 값으로 필터링한 배열을 secondFilter 에서
      // subCategory까지 값이 같은지 확인 한 후 해당 배열이 location과 값이 같은지 확인
      setTrimmedFavorites(secondFilter.filter((data) => data.location === location));
    }
  }, [location]);
  return (
    <>
      <GNB />
      <MainLayout>
        <Banner page="bookmark" nickname={user?.nickname} />
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
