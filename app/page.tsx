import Header from "../src/widgets/homeHeader/ui/Header";
import Hero from "../src/widgets/hero/ui/Hero";

export default function Home() {
  return (
    <div className="md:px-16 lg:px-24 xl:px-36">
      <Header />

      <Hero />
    </div>
  );
}
