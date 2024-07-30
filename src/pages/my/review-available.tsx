import React from 'react';

import MyCard from '@/components/My/MyCard';
import NotReview from '@/components/NotReview';

import { Gathering } from '@/types/gatherings';

interface Props {
  data?: Gathering[];
}

export default function ReviewAvailable({ data }: Props) {
  if (!data || !Array.isArray(data)) {
    return <NotReview type="reviewAvailable" />;
  }

  const reviewRequiredItems = data.filter((gathering) => !gathering.hasReviewed);

  return reviewRequiredItems.length > 0 ? (
    reviewRequiredItems.map((item, i) => <MyCard key={i} data={item} type="review" />)
  ) : (
    <NotReview type="reviewAvailable" />
  );
}
