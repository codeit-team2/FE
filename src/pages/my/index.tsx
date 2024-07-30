import React, { useState } from 'react';

import Joined from './joined';
import Mine from './mine';
import Review from './review';

import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';

import MyTap from '@/components/My/MyTab';
import Profile from '@/components/My/Profile';

import useCheckLogin from '@/hooks/useCheckLogin';

export default function My() {
  useCheckLogin();

  const [selectTab, setSelectTab] = useState('joined');

  return (
    <>
      <GNB />
      <MainLayout>
        <div className="mx-auto max-w-screen-lg">
          <Profile />
          <div className="mb-27 mt-32 md:px-156">
            <MyTap setSelectTab={setSelectTab} />
          </div>
          {selectTab === 'joined' && <Joined />}
          {selectTab === 'review' && <Review />}
          {selectTab === 'mine' && <Mine />}
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
