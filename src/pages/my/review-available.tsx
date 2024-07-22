import React, { useEffect } from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { Gathering } from '@/types/gatherings';

interface Props {
  data: Gathering[];
}

export default function ReviewAvailable({ data }: Props) {
  let isItem;
  useEffect(() => {
    // 리뷰가 등록된 아이템이 있으면 false, 리뷰 등록이 안 된 아이템이 있으면 true
    data.map((item) => (item.hasReviewed ? (isItem = false) : (isItem = true)));
  }, [data]);

  return isItem ? data.map((item, i) => <MyCard key={i} data={item} type="review" />) : <NotCard />;
}
