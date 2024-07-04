import Card from '@/components/Card';
import ChipTap from '@/components/ChipTap';
import MainLayout from '@/components/common/MainLayout';
import Banner from '@/components/common/Banner';
import Dropdown from '@/components/common/Dropdown';
import GNB from '@/components/common/GNB';
import Tap from '@/components/common/Tap';
import Test from '@/components/Card/testData.js';
import CreateHobby from '@/components/CreateHobby';
import Footer from '@/components/common/Footer';
import Image from 'next/image';

function Main() {
  return (
    <>
      <GNB />
      <MainLayout>
        <Banner
          mainTitle="취미를 함께할 동료를 찾고 있나요?
취ZONE에서 쉽고 빠르게 다채로운 취미 모임에 참여해보세요"
          subTitle="운동부터 원데이클래스까지 든든하게 준비되어 있어요"
        />
        <div className="px-156 mb-27 mt-32">
          <Tap />
        </div>
        <div className="px-95 mb-16 w-full">
          <ChipTap />
        </div>

        <div className="mb-32 flex justify-between">
          <div className="flex gap-12">
            <Dropdown
              items={['중랑구', '광진구', '용산구', '을지로3가']}
              icon="/icons/dropdownIcon.svg"
              itemTrigger="지역선택"
            />
            <Dropdown icon="/icons/dropdownIcon.svg" itemTrigger="날짜선택" />
          </div>
          <Dropdown
            items={['마감임박', '참여 인원순']}
            icon="/icons/dropdownArray.svg"
            itemTrigger="마감임박"
          />
        </div>
        <CreateHobby />
        <div className="flex flex-col gap-20">
          {Test.map((data, index) => (
            <Card key={index} data={data} />
          ))}
        </div>
        {/* 데이터가 남아있다면 true 없다면 false처리해서 ui그리기 */}
        <div className="mb-16 mt-40 h-2 w-full bg-neutral-100" />
        <button className="pb-50 flex w-full cursor-pointer items-center justify-center">
          더 보기
          <div className="relative h-24 w-24">
            <Image src="icons/dropdownIcon.svg" alt="dropdown" fill />
          </div>
        </button>
      </MainLayout>
      <Footer />
    </>
  );
}

export default Main;
