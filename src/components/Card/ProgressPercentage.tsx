import { Data } from '@/types';

interface ProgressPercentageProps {
  data: Data;
}
export default function ProgressPercentage({ data }: ProgressPercentageProps) {
  const progressPercentage = (data.member / 20) * 100;

  return (
    <div className="relative h-6 w-full rounded-full bg-gray-100">
      <div
        className="absolute h-6 rounded-full bg-primary-300"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}
