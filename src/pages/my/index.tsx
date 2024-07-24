import React, { useState } from 'react';

import Joined from './joined';
import Mine from './mine';
import Review from './review';

import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';

import MyTap from '@/components/My/MyTab';
import Profile from '@/components/My/Profile';

import { useGetAccounts } from '@/hooks/useAccounts';
import useCheckLogin from '@/hooks/useCheckLogin';

export default function My() {
  useCheckLogin();

  const [selectTab, setSelectTab] = useState('meeting');

  const { data: user } = useGetAccounts();


  return (
    <>
      <GNB />
      <MainLayout>
        <div className="mx-auto max-w-screen-lg">
          <Profile nickname={user?.nickname} email={user?.email} />
          <div className="mb-27 mt-32 md:px-156">
            <MyTap setSelectTab={setSelectTab} />
          </div>
          {selectTab === 'meeting' && <Joined />}
          {selectTab === 'review' && <Review />}
          {selectTab === 'club' && <Mine />}
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
