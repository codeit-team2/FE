import React from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader, // 빌드 에러로 주석  처리
  // DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface Props {
  text: string;
}

export default function PopUpModal({ text }: Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">PopUp</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-520 flex flex-col gap-24 p-24">
        <DialogHeader>
          <div dangerouslySetInnerHTML={{ __html: text }} className="text-center" />
        </DialogHeader>
        <div className="flex w-full justify-center">
          <Button>취소</Button>
          <Button>확인</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
