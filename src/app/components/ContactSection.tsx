"use client";

import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email Us",
      info: "support@healingspace.com",
      description: "We respond within 2 hours"
    },
    {
      icon: Phone,
      title: "Call Us",
      info: "1-800-HEALING",
      description: "Available 24/7 for crisis support"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      info: "123 Wellness Ave, Peace City",
      description: "In-person sessions available"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      info: "Start a conversation",
      description: "Instant support online"
    }
  ];

  return (
    <section className="py-20 bg-gradient-nature relative overflow-hidden">
      {/* Background texture overlay */}
      <div className="absolute inset-0 opacity-50" style={{
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
      }}></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Let's Start the Conversation
          </h2>
          <p className="text-xl text-foreground/70 max-w-3xl mx-auto leading-relaxed">
            Whether you have questions, need immediate support, or want to learn more about our services, 
            we're here to listen and help.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <Card className="p-8 bg-white/95 backdrop-blur-sm border-0 shadow-hero">
            <h3 className="text-2xl font-bold text-foreground mb-6">Send Us a Message</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="border-border/50 focus:border-primary bg-white/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your.email@example.com"
                  className="border-border/50 focus:border-primary bg-white/50"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  How can we help you?
                </label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Tell us about what you're looking for or any questions you have..."
                  rows={6}
                  className="border-border/50 focus:border-primary bg-white/50 resize-none"
                  required
                />
              </div>
              
              <Button type="submit" className="w-full" >
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground mb-8">Other Ways to Reach Us</h3>
            
            {contactInfo.map((contact, index) => (
              <Card key={index} className="p-6 bg-white/90 backdrop-blur-sm border-0 shadow-card hover:shadow-hero transition-all duration-300 transform hover:scale-105">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-teal-mint rounded-xl flex items-center justify-center flex-shrink-0">
                    <contact.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-foreground mb-1">{contact.title}</h4>
                    <p className="text-primary font-medium mb-1">{contact.info}</p>
                    <p className="text-foreground/60 text-sm">{contact.description}</p>
                  </div>
                </div>
              </Card>
            ))}

            {/* Emergency Support Notice */}
            <Card className="p-6 bg-destructive/10 border border-destructive/20 shadow-card">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-destructive rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-destructive mb-2">Crisis Support</h4>
                  <p className="text-foreground/60 text-sm mb-3">
                    If you're experiencing a mental health emergency, please contact:
                  </p>
                  <div className="space-y-1 text-sm">
                    <p className="font-medium text-foreground">• Crisis Hotline: 988</p>
                    <p className="font-medium text-foreground">• Emergency Services: 911</p>
                    <p className="font-medium text-foreground">• Crisis Text Line: Text HOME to 741741</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;