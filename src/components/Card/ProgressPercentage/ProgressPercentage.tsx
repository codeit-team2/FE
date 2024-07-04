export default function ProgressPercentage({ data }: any) {
  const progressPercentage = (data.member / 20) * 100;

  return (
    <div className="relative h-6 w-full rounded-full bg-gray-100">
      <div
        className="bg-primary-300 absolute h-6 rounded-full"
        style={{ width: `${progressPercentage}%` }}
      />
    </div>
  );
}
