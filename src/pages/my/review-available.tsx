import React from 'react';

import { Gathering } from '@/types/gatherings';

interface Props {
  data: Gathering[];
}
export default function ReviewAvailable({ data }: Props) {
  console.log(data);
  return <div>{data && data.map((item, i) => <p key={i}>{item.name}</p>)}</div>;
}
