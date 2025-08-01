import { Card } from "./ui/card";
import { Heart, Shield, Users } from "lucide-react";

const AboutSection = () => {
  const values = [
    {
      icon: Heart,
      title: "Empathy",
      description: "Every interaction guided by genuine care and understanding"
    },
    {
      icon: Shield,
      title: "Privacy",
      description: "Your journey is protected with end-to-end encryption"
    },
    {
      icon: Users,
      title: "Clinical Integrity",
      description: "All therapists are licensed and verified professionals"
    }
  ];

  return (
    <section className="py-20 bg-gradient-nature">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            About Our Sanctuary
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-xl text-foreground/80 leading-relaxed mb-8">
              We created this space for every soul needing support. Whether you're ready to talk, 
              or just want to be heard — we're here, and we care.
            </p>
          </div>
        </div>

        {/* Values Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="p-8 bg-card/80 backdrop-blur-sm border-0 shadow-card hover:shadow-hero transition-all duration-300 transform hover:scale-105">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-teal-mint rounded-2xl flex items-center justify-center shadow-soft">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">{value.title}</h3>
                <p className="text-foreground/70 leading-relaxed">{value.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Mission Statement */}
        <div className="mt-16 text-center">
          <Card className="p-12 bg-white/90 backdrop-blur-sm border-0 shadow-hero max-w-4xl mx-auto">
            <blockquote className="text-2xl md:text-3xl font-medium text-muted leading-relaxed italic">
              "Healing happens in community. Our platform bridges the gap between 
              professional support and personal empowerment, creating a space where 
              vulnerability becomes strength."
            </blockquote>
            <cite className="block mt-6 text-lg text-primary font-semibold">
              — The Healing Collective Team
            </cite>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;