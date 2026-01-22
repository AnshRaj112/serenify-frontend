import HeroSection from "./components/Landing/HeroSection";
import AboutUs from "./components/Landing/AboutUs";
import TherapistGrid from "./components/Landing/TherapistGrid";
import ChatInterface from "./components/Landing/ChatInterface";
import TherapistRecruitment from "./components/Landing/TherapistRecruitment";

const Index = () => {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <AboutUs />
      <TherapistGrid />
      <ChatInterface />
      <TherapistRecruitment />
    </main>
  );
};

export default Index;
