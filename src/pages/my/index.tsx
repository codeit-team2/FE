import MyTap from '@/components/My/MyTab';
import Profile from '@/components/My/Profile';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import React, { useState } from 'react';
import Meeting from './meeting';
import Club from './club';
import Review from './review';
import Test from '@/components/Card/testData';

export default function My() {
  const [selectTab, setSelectTab] = useState('meeting');
  return (
    <>
      <GNB />
      <MainLayout>
        <div className="mx-auto max-w-screen-lg">
          <Profile nickname="배고픈 망곰이" email="hungrybear@gamil.com" />
          <div className="mb-27 mt-32 px-156">
            <MyTap setSelectTab={setSelectTab} />
          </div>
          {selectTab === 'meeting' && <Meeting data={Test} />}
          {selectTab === 'review' && <Review data={Test} />}
          {selectTab === 'club' && <Club data={Test} />}
        </div>
      </MainLayout>
      <Footer />
    </>
  );
}
