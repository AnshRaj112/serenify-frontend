import HeroSection from "./components/Landing/HeroSection";
import AboutUs from "./components/Landing/AboutUs";
import TherapistGrid from "./components/Landing/TherapistGrid";
import ChatInterface from "./components/Landing/ChatInterface";
import TherapistRecruitment from "./components/Landing/TherapistRecruitment";
import FaqSection from "./components/Landing/FaqSection";
import ContactUs from "./components/Landing/ContactUs";

const Index = () => {
  return (
    <main className="min-h-screen m-0 p-0 w-full">
      <HeroSection />
      <AboutUs />
      <TherapistGrid />
      <ChatInterface />
      <TherapistRecruitment />
      <FaqSection />
      <ContactUs />
    </main>
  );
};

export default Index;
