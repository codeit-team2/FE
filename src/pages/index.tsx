import Card from '@/components/Card';
import mockData from "@/components/Card/testData.json"

function Main() {
  return (
    <div className="h-screen w-full bg-gray-100 p-30">
      {mockData.map((data, index) => (
        <Card key={index} data={data} />
      ))}
    </div>
  );
}

export default Main;
