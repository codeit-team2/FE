export default function Description({ data }: any) {
  return (
    <div className="mb-16 flex w-full flex-col text-body-3Sb md:mb-4 md:text-body-2Sb">
      <div className="flex gap-6">
        <p className="text-primary-300">{data.category}</p>
        <p className="text-neutral-500">{data.place}</p>
      </div>
      <div className="mb-8 flex lg:gap-6">
        <p className="text-secondary-300">{data.deadline}</p>·
        <p className="text-neutral-500">
          {data.date} · {data.time}
        </p>
      </div>
      <div className="text-body-1Sb md:text-heading-2M">{data.title}</div>
    </div>
  );
}
