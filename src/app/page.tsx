import HeroSection from "./components/Landing/HeroSection";
import AboutUs from "./components/Landing/AboutUs";
import TherapistGrid from "./components/Landing/TherapistGrid";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutUs />
      <TherapistGrid />
    </main>
  );
};

export default Index;
