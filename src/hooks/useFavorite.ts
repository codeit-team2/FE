import { useCallback, useEffect, useState } from 'react';

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
      const favoritesFilter = favorites.filter((favorite) => favorite !== item);
      saveFavorites(favoritesFilter);
    }
  };

  // 찜 목록 가져오기
  const getFavorites = useCallback(() => {
    const storaged = localStorage.getItem(FAVORITES_KEY);
    if (storaged) {
      setFavorites(JSON.parse(storaged));
    }
  }, []);

  // 찜 여부 확인 함수
  const isFavorite = (item: Gathering) => {
    return favorites.includes(item);
  };

  // 컴포넌트가 마운트될 때 로컬 스토리지에서 찜 목록을 불러옴
  useEffect(() => {
    if (favorites) {
      getFavorites();
    }
  }, []);

  return { clickFavorites, favorites, saveFavorites, isFavorite };
}
