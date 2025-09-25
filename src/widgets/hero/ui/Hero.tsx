import { Button } from "@/src/shared/ui/atoms/Button/Button";

export default function Hero() {
  return (
    <div className="p-10 flex flex-col items-center mt-24 md:px-20 lg:px-36 xl:px-48">
      <h2 className="font-bold text-6xl text-center">AI Youtube Short Video Generator</h2>
      <p className="mt-4 text-2xl text-center text-gray-500">AI로 유튜브 쇼츠 빠르게 만들어보세요!</p>

      <div className="mt-7 gap-8 flex">
        <Button size="lg" variant="outline">
          Explore
        </Button>
        <Button className="bg-white text-black" size="lg">
          Get Started
        </Button>
      </div>
    </div>
  );
}
