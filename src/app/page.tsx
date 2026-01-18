import HeroSection from "./components/Landing/HeroSection";
import AboutUs from "./components/Landing/AboutUs";
import TherapistGrid from "./components/Landing/TherapistGrid";
import ChatInterface from "./components/Landing/ChatInterface";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutUs />
      <TherapistGrid />
      <ChatInterface />
    </main>
  );
};

export default Index;
