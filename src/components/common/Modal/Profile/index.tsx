import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import React from 'react';

export default function ProfileModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Profile</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-520 flex flex-col gap-24 p-24">
        <DialogHeader>
          <DialogTitle>프로필 수정하기</DialogTitle>
          <p>Profile Image Component</p> {/* profile Image 추가 필요 */}
        </DialogHeader>
        <DialogHeader>
          <DialogTitle>회사</DialogTitle>
          <input className="bg-gray-50" />
        </DialogHeader>
        <div className="flex w-full justify-center">
          <Button>취소</Button>
          <Button type="submit">수정하기</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
