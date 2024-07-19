import React, { useState } from 'react';

import Club from './club';
import Meeting from './meeting';
import Review from './review';

import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';

import Test from '@/components/Card/testData';
import MyTap from '@/components/My/MyTab';
import Profile from '@/components/My/Profile';

export default function My() {
  const [selectTab, setSelectTab] = useState('meeting');

  return (
    <>
      <GNB />
      <MainLayout>
        <div className="mx-auto max-w-screen-lg">
          <Profile nickname="배고픈 망곰이" email="hungrybear@gamil.com" />
          <div className="mb-27 mt-32 md:px-156">
            <MyTap setSelectTab={setSelectTab} />
          </div>
          {selectTab === 'meeting' && <Meeting data={Test} />}
          {selectTab === 'review' && <Review data={Test} />}
          {selectTab === 'club' && <Club />}
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
