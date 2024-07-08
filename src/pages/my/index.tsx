import Profile from '@/components/My/Profile';
import GNB from '@/components/common/GNB';
import React from 'react';

export default function My() {
  return (
    <>
      <GNB />
      <Profile nickname="배고픈 망곰이" email="hungrybear@gamil.com" />
    </>
  );
}
