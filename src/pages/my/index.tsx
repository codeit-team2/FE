import MyTap from '@/components/My/MyTab';
import Profile from '@/components/My/Profile';
import Footer from '@/components/common/Footer';
import GNB from '@/components/common/GNB';
import MainLayout from '@/components/common/MainLayout';
import React, { useState } from 'react';
import Meeting from './meeting';
import Club from './Club';
import Review from './Review';

export default function My() {
  const [selectTab, setSelectTab] = useState('meeting');
  return (
    <>
      <GNB />
      <MainLayout>
        <Profile nickname="배고픈 망곰이" email="hungrybear@gamil.com" />
        <div className="mb-27 mt-32 px-156">
          <MyTap setSelectTab={setSelectTab} />
        </div>
        {selectTab === 'meeting' && <Meeting />}
        {selectTab === 'review' && <Review />}
        {selectTab === 'club' && <Club />}
      </MainLayout>
      <Footer />
    </>
  );
}
