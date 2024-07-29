import React from 'react';

import MyCard from '@/components/My/MyCard';
import NotCard from '@/components/NotCard';

import { Gathering } from '@/types/gatherings';

interface Props {
  data?: Gathering[];
}

export default function ReviewAvailable({ data }: Props) {
  if (!data || !Array.isArray(data)) {
    return <NotCard />;
  }

  const reviewRequiredItems = data.filter((gathering) => !gathering.hasReviewed);

  return reviewRequiredItems.length > 0 ? (
    reviewRequiredItems.map((item, i) => <MyCard key={i} data={item} type="review" />)
  ) : (
    <NotCard />
  );
}
