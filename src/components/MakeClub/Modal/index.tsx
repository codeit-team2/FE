import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { FaPlus } from 'react-icons/fa6';
import { Input } from '@/components/common/Input';
import Calendar from '@/components/common/Calendar';

export default function MakeClubModal() {
  const amTime = ['09:00', '10:00', '11:00', '12:00'];
  const pmTime = [
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
    '19:00',
    '20:00',
    '21:00',
    '22:00',
  ];
  const [selectTime, setSelectTime] = useState<string[]>([]);

  useEffect(() => {
    console.log(selectTime);
  }, [selectTime]);

  const handleTimeClick = (time: string) => {
    setSelectTime((prev) => {
      if (prev.includes(time)) {
        return prev.filter((t) => t !== time);
      } else {
        return [...prev, time];
      }
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default">
          <FaPlus />
        </Button>
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center gap-24 px-40 py-32">
        <DialogTitle className="w-946 text-center">모임 만들기</DialogTitle>
        <div className="flex w-full flex-row justify-center">
          <div className="flex w-full flex-col gap-24">
            <div>
              <DialogDescription>대표 이미지</DialogDescription>
              <Input type="text" placeholder="대표이미지를 첨부해주세요" />
              <Button variant="chip" selected={true}>
                파일찾기
              </Button>
            </div>
            <div className="flex flex-row gap-12">
              <div className="w-3/6">
                <DialogDescription>카테고리</DialogDescription>
                <Input type="text" placeholder="카테고리를 선택해주세요" />
              </div>
              <div className="w-3/6">
                <DialogDescription>지역</DialogDescription>
                <Input type="text" placeholder="지역을 선택해주세요" />
              </div>
            </div>
            <div>
              <DialogDescription>날짜</DialogDescription>
              <div className="mx-auto w-full rounded-md border">
                <Calendar />
              </div>
            </div>
          </div>
          <div className="mx-32 border-l"></div>
          <div className="flex w-full flex-col gap-24">
            <div>
              <DialogDescription>오전</DialogDescription>
              <div className="flex gap-4">
                {amTime.map((time, i) => (
                  <Button
                    variant="chip"
                    size="chip"
                    key={i}
                    selected={selectTime.includes(time)}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <DialogDescription>오후</DialogDescription>
              <div className="flex flex-wrap gap-4">
                {pmTime.map((time, i) => (
                  <Button
                    variant="chip"
                    size="chip"
                    key={i}
                    selected={selectTime.includes(time)}
                    onClick={() => handleTimeClick(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <DialogDescription>모임명</DialogDescription>
              <Input type="text" placeholder="30자 이내로 모임명을 입력해주세요" maxLength={30} />
            </div>
            <div>
              <DialogDescription>모임 정원</DialogDescription>
              <Input type="text" placeholder="5에서 20까지 숫자로만 입력해주세요" maxLength={20} />
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <Button className="w-946">확인</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
