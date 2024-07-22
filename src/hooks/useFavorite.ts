import { useCallback, useEffect, useState } from 'react';

import { instance } from '@/lib/axios';

import { Gathering } from '@/types/gathering';

const FAVORITES_KEY = 'favorites';

export default function useFavorite() {
  const [favorites, setFavorites] = useState<Gathering[]>([]);

  // 찜 목록 로컬 스토리지에 저장
  const saveFavorites = (items: Gathering[]) => {
    setFavorites(items);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(items));
  };

  // 찜 목록 로컬 스토리지에 추가/제거
  const clickFavorites = (item: Gathering) => {
    if (!favorites.includes(item)) {
      const newFavorite = [...favorites, item];
      saveFavorites(newFavorite);
    } else {
      const favoritesFilter = favorites.filter(
        (favorite) => favorite.gatheringId !== item.gatheringId,
      );
      saveFavorites(favoritesFilter);
    }
  };

  // 찜 목록 가져오기
  // const getFavorites = useCallback(() => {
  const getFavorites = () => {
    const storaged = localStorage.getItem(FAVORITES_KEY);
    if (storaged) {
      setFavorites(JSON.parse(storaged));
      console.log(favorites);
    }
    // }, []);
  };

  // 찜 여부 확인 함수
  const isFavorite = (item: Gathering) => {
    return favorites.map((f) => f.gatheringId).includes(item.gatheringId);
  };

  // 서버에 찜 목록 저장 (로그인 후)
  // 추후 서버에 얘기해서 api 엔드포인드 지정하기
  // const syncFavoritesWithServer = async (value: Gathering[]) => {
  //   try {
  //     const res = await instance.post('나중에 생기면 동기화', value);
  //     return res.data;
  //   } catch (error) {
  //     console.error('Failed to sync favorites with server : ', error);
  //   }
  // };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 찜 목록을 불러옴
  useEffect(() => {
    getFavorites();
  }, []);

  return { clickFavorites, favorites, saveFavorites, isFavorite };
}
