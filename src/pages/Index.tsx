import Hero from "@/components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import AraujoTimeline from "@/components/AraujoTimeline";
import HowWeWork from "@/components/HowWeWork";
import WhyUs from "@/components/WhyUs";
import Partnerships from "@/components/Partnerships";
import BHForMinas from "@/components/BHForMinas";
import GameCTA from "@/components/GameCTA";
import Footer from "@/components/Footer";
const Index = () => {
  return <div className="min-h-screen">
      <Hero />
      <WhoWeAre />
      <AraujoTimeline />
      <HowWeWork />
      
      <Partnerships />
      <BHForMinas />
      <GameCTA />
      <Footer />
    </div>;
};
export default Index;