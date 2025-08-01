import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { UserPlus, Award, Heart, Clock } from "lucide-react";

const CTASection = () => {
  const benefits = [
    {
      icon: Award,
      title: "Professional Growth",
      description: "Join a platform dedicated to therapeutic excellence"
    },
    {
      icon: Heart,
      title: "Make a Difference",
      description: "Help people on their healing journey every day"
    },
    {
      icon: Clock,
      title: "Flexible Schedule",
      description: "Set your own hours and work-life balance"
    },
    {
      icon: UserPlus,
      title: "Growing Community",
      description: "Connect with like-minded healing professionals"
    }
  ];

  return (
    <section className="py-20 bg-muted relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.05'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm20-20c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }}></div>
      
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Are You a Certified Therapist?
            </h2>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Join our mission to make healing more accessible. Partner with us to reach people 
              who need your expertise while growing your practice in a supportive, tech-enabled environment.
            </p>
            
            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-gradient-teal-mint rounded-lg flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white mb-1">{benefit.title}</h4>
                    <p className="text-white/70 text-sm">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="px-8">
                Become a Helper
              </Button>
              <Button className="px-8 border-white/30 text-white hover:bg-white hover:text-muted">
                Learn More
              </Button>
            </div>
          </div>

          {/* Right Content - Testimonial */}
          <Card className="p-8 bg-white/10 backdrop-blur-sm border border-white/20 shadow-hero">
            <div className="text-center">
              <img 
                src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face" 
                alt="Dr. Sarah Chen"
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover border-4 border-white/20"
              />
              <blockquote className="text-white text-lg italic mb-6 leading-relaxed">
                "This platform has transformed how I practice therapy. The tools are intuitive, 
                the support is exceptional, and I can focus on what I do best – helping people heal."
              </blockquote>
              <cite className="text-white/90 font-semibold">
                Dr. Sarah Chen
              </cite>
              <p className="text-white/70 text-sm mt-1">
                Trauma Specialist • 3 years with platform
              </p>
              
              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl font-bold text-secondary">200+</div>
                  <div className="text-white/70 text-sm">Clients Helped</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-hope">4.9★</div>
                  <div className="text-white/70 text-sm">Average Rating</div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Application Process */}
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-white mb-8">Simple Application Process</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Apply", description: "Submit your credentials and experience" },
              { step: "2", title: "Review", description: "We verify your license and background" },
              { step: "3", title: "Welcome", description: "Start helping clients within 48 hours" }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-gradient-lavender rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {step.step}
                </div>
                <h4 className="text-lg font-semibold text-white mb-2">{step.title}</h4>
                <p className="text-white/70">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;