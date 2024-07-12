import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription, // DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

export default function ActivityModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">모임 만들기</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-520 flex flex-col gap-24 p-24">
        <DialogTitle>모임 만들기</DialogTitle>
        <div>
          <DialogDescription>장소</DialogDescription>
          {/* dropdown */}
        </div>
        <div>
          <DialogDescription>이미지</DialogDescription>
        </div>
        <div>
          <DialogDescription>선택 서비스</DialogDescription>
        </div>
        <div>
          <DialogDescription>날짜</DialogDescription>
        </div>
        <div>
          <DialogDescription>오전</DialogDescription>
        </div>
        <div>
          <DialogDescription>오후</DialogDescription>
        </div>
        <div>
          <DialogDescription>모집정원</DialogDescription>
        </div>
        <div className="flex w-full justify-center">
          <Button>확인</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
