import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";
import { HelpCircle, Shield, CreditCard, Users, Clock, Heart } from "lucide-react";

const FAQSection = () => {
  const faqs = [
    {
      icon: HelpCircle,
      question: "What's the first step to starting therapy?",
      answer: "Begin with our simple assessment to match you with the right therapist. You can browse profiles, read reviews, and schedule a consultation call. Many people start with a brief chat to see if it feels like a good fit before committing to regular sessions."
    },
    {
      icon: Shield,
      question: "Is my data safe and encrypted?",
      answer: "Absolutely. We use end-to-end encryption for all communications, and your data is stored on HIPAA-compliant servers. Your privacy is our top priority - therapists can only see what you choose to share, and your personal information is never sold or shared with third parties."
    },
    {
      icon: CreditCard,
      question: "Can I get a refund for missed sessions?",
      answer: "Yes, we offer flexible cancellation policies. If you cancel at least 24 hours in advance, you'll receive a full refund. For emergency situations, we work with you on a case-by-case basis. Your mental health journey shouldn't be stressful because of scheduling conflicts."
    },
    {
      icon: Users,
      question: "How do I know if a therapist is right for me?",
      answer: "Most therapists offer a brief 15-minute consultation call to see if you connect. You can also read their profiles, specializations, and client reviews. Trust your instincts - if you don't feel comfortable after 2-3 sessions, we'll help you find a better match at no extra cost."
    },
    {
      icon: Clock,
      question: "What if I need support outside of scheduled sessions?",
      answer: "We offer several options: our crisis support line is available 24/7, you can send messages to your therapist between sessions (they'll respond within 24 hours), and we have a peer support community where you can connect with others on similar journeys."
    },
    {
      icon: Heart,
      question: "Do you accept insurance?",
      answer: "We accept most major insurance plans and offer direct billing for many providers. If your insurance doesn't cover therapy, we also offer sliding scale pricing based on income and payment plans to make mental health care accessible to everyone who needs it."
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-4xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Questions? We're Here to Help
          </h2>
          <p className="text-xl text-foreground/70 leading-relaxed">
            Everything you need to know about starting your healing journey with confidence.
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="bg-card border-0 rounded-xl shadow-soft overflow-hidden"
            >
              <AccordionTrigger className="px-6 py-6 hover:bg-accent/5 transition-colors duration-300 text-left">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-teal-mint rounded-xl flex items-center justify-center flex-shrink-0">
                    <faq.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">{faq.question}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-6">
                <div className="ml-14">
                  <p className="text-foreground/70 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Additional Help CTA */}
        <div className="text-center mt-12">
          <div className="bg-gradient-lavender rounded-2xl p-8 shadow-hero">
            <h3 className="text-2xl font-bold text-white mb-4">
              Still have questions?
            </h3>
            <p className="text-white/90 mb-6">
              Our support team is here to help you every step of the way.
            </p>
            <button className="bg-white text-secondary px-8 py-3 rounded-xl font-semibold hover:bg-white/90 transition-colors duration-300 shadow-soft">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;