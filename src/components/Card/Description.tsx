export default function Description({ data }: any) {
  return (
    <div className="mb-4 flex flex-col">
      <div className="flex gap-6">
        <p className="text-primary-300">{data.category}</p>
        <p className="text-neutral-500">{data.place}</p>
      </div>
      <div className="mb-8 flex gap-6">
        <p className="text-secondary-300">{data.deadline}</p>·
        <p className="text-neutral-500">{data.date}</p>·
        <p className="text-neutral-500">{data.time}</p>
      </div>
      <div className="text-heading-2M">{data.title}</div>
    </div>
  );
}
