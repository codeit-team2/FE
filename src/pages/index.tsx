import BackgroundColor from '@/components/common/BackgroundColor';
import Banner from '@/components/common/Banner';
import Dropdown from '@/components/common/Dropdown';
import GNB from '@/components/common/GNB';
import Tap from '@/components/common/Tap';

function Main() {
  return (
    <>
      {/* <div> */}
      <BackgroundColor>
        {/* c최상위 div는 테스트용이니 꼭 지울것 */}
        <GNB />
        <Banner
          mainTitle="취미를 함께할 동료를 찾고 있나요?
취ZONE에서 쉽고 빠르게 다채로운 취미 모임에 참여해보세요"
          subTitle="운동부터 원데이클래스까지 든든하게 준비되어 있어요"
        />
        <div className="mb-20 mt-32">
          <Tap />
        </div>
        {/* chip button 자리 */}
        <div className="flex justify-between">
          <div className="flex">
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
      </BackgroundColor>
      {/* </div> */}
    </>
  );
}

export default Main;
