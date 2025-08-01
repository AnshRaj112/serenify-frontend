import { Card } from "./ui/card";
import { 
  UserCheck, 
  MessageCircle, 
  BookOpen, 
  Lock, 
  Heart,
  Calendar
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: UserCheck,
      title: "Verified Licensed Psychiatrists",
      description: "Connect with board-certified mental health professionals who understand your unique needs.",
      gradient: "from-primary to-primary-glow"
    },
    {
      icon: MessageCircle,
      title: "Real-time Chat & Voice Sessions",
      description: "Flexible communication options that fit your comfort level and schedule.",
      gradient: "from-secondary to-comfort"
    },
    {
      icon: BookOpen,
      title: "Daily Journal to Save and Share",
      description: "Express yourself safely with private journaling and optional sharing with your therapist.",
      gradient: "from-earth-green to-healing"
    },
    {
      icon: Lock,
      title: "End-to-End Privacy",
      description: "Your conversations and data are protected with military-grade encryption.",
      gradient: "from-muted to-foreground"
    },
    {
      icon: Heart,
      title: "Personalized Support Plans",
      description: "Tailored therapeutic approaches designed specifically for your healing journey.",
      gradient: "from-hope to-dawn"
    },
    {
      icon: Calendar,
      title: "Flexible Scheduling",
      description: "Book sessions that work with your life, including emergency support when needed.",
      gradient: "from-accent to-earth-green"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Your Healing Toolkit
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Every feature designed with your emotional wellbeing and therapeutic progress in mind.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group p-8 bg-card border-0 shadow-card hover:shadow-hero transition-all duration-500 transform hover:scale-105 overflow-hidden relative"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
              
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-16 h-16 mb-6 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center shadow-soft transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="p-8 bg-gradient-lavender border-0 shadow-hero max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to start your healing journey?
            </h3>
            <p className="text-white/90 mb-6">
              Join thousands who have found their path to wellness with our comprehensive support system.
            </p>
            <button className="bg-white text-secondary px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors duration-300 shadow-soft">
              Explore All Features
            </button>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;