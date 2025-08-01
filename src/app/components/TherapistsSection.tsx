import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Star, MessageCircle, Phone, Calendar } from "lucide-react";

type ButtonProps = {
  size?: "sm" | "md" | "lg"; // define size prop
};

const TherapistsSection = () => {
  const therapists = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=face",
      specializations: ["Trauma", "PTSD", "Anxiety"],
      rating: 4.9,
      reviews: 127,
      tags: ["Mindful", "LGBTQ+ Affirming"],
      status: "Available",
      price: "$120/session",
      bio: "Specializing in trauma-informed care with 12 years of experience in cognitive behavioral therapy."
    },
    {
      id: 2,
      name: "Dr. Michael Rodriguez",
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=face",
      specializations: ["ADHD", "Depression", "Life Transitions"],
      rating: 4.8,
      reviews: 203,
      tags: ["Holistic", "Bilingual"],
      status: "Available",
      price: "$110/session",
      bio: "Integrative approach combining traditional therapy with mindfulness and holistic wellness practices."
    },
    {
      id: 3,
      name: "Dr. Emily Thompson",
      image: "https://images.unsplash.com/photo-1594824928402-686cac6dd4b8?w=400&h=400&fit=crop&crop=face",
      specializations: ["Relationship", "Family", "Communication"],
      rating: 5.0,
      reviews: 89,
      tags: ["Empathetic", "Solutions-focused"],
      status: "Booked",
      price: "$135/session",
      bio: "Relationship expert helping individuals and couples build healthier communication patterns."
    },
    {
      id: 4,
      name: "Dr. James Park",
      image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop&crop=face",
      specializations: ["Addiction", "Men's Health", "Grief"],
      rating: 4.7,
      reviews: 156,
      tags: ["Compassionate", "Evidence-based"],
      status: "Available",
      price: "$125/session",
      bio: "Specialized in addiction recovery and men's mental health with evidence-based therapeutic approaches."
    }
  ];

  return (
    <section className="py-20 bg-gradient-nature">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Meet Your Healing Partners
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Our carefully vetted therapists bring expertise, empathy, and evidence-based approaches to your wellness journey.
          </p>
        </div>

        {/* Therapists Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {therapists.map((therapist) => (
            <Card 
              key={therapist.id}
              className="group bg-card border-0 shadow-card hover:shadow-hero transition-all duration-500 transform hover:scale-105 overflow-hidden"
            >
              {/* Profile Image */}
              <div className="relative overflow-hidden">
                <img 
                  src={therapist.image} 
                  alt={therapist.name}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-medium ${
                  therapist.status === 'Available' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground'
                }`}>
                  {therapist.status}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Name and Rating */}
                <div className="mb-4">
                  <h3 className="text-xl font-bold text-foreground mb-2">{therapist.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${
                            i < Math.floor(therapist.rating) 
                              ? 'text-hope fill-hope' 
                              : 'text-gray-300'
                          }`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-foreground/60">
                      {therapist.rating} ({therapist.reviews} reviews)
                    </span>
                  </div>
                </div>

                {/* Specializations */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {therapist.specializations.map((spec, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-2">
                    {therapist.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-secondary/20 text-secondary text-xs rounded-lg"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bio */}
                <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                  {therapist.bio}
                </p>

                {/* Price */}
                <div className="text-lg font-semibold text-primary mb-6">
                  {therapist.price}
                </div>

                {/* Action Buttons */}
                <div className="space-y-3">
                  <div className="grid grid-cols-3 gap-2">
                    <Button className="p-2">
                      <MessageCircle className="w-4 h-4" />
                    </Button>
                    <Button className="p-2">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button className="p-2">
                      <Calendar className="w-4 h-4" />
                    </Button>
                  </div>
                  <Button 
                    className="w-full" 
                    disabled={therapist.status === 'Booked'}
                  >
                    {therapist.status === 'Available' ? 'Book Now' : 'Join Waitlist'}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12">
          <Button className="px-12">
            View All Therapists
          </Button>
        </div>
      </div>
    </section>
  );
};

export default TherapistsSection;