import ReviewModal from '@/components/common';
import ProfileModal from '@/components/common/Modal/Profile';
import { Button } from '@/components/ui/button';

function Main() {
  return (
    <>
      <div className="mb-10 flex w-full rounded-sm bg-red-100">dd</div>
      <Button>Button</Button>
      <ReviewModal />
      <ProfileModal />
    </>
  );
}

export default Main;
