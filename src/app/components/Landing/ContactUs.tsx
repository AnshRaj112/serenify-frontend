import {
    CheckCircle,
    Mail,
  } from "lucide-react";
  import { Button } from "../ui/button";
  import { Card, CardContent, CardHeader, CardTitle} from "../ui/card";

export default function ContactUs() {
    return (
<section className="py-20 bg-[#1d2935] w-full">
<div className="w-full px-4 sm:px-6 lg:px-8">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    <div>
      <h2 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-6">
        Ready to Start Your Healing Journey?
      </h2>
      <p className="text-lg text-muted-foreground mb-8">
        Our support team is here to help you find the perfect therapist match. 
        Reach out with any questions or concerns.
      </p>
      
      <div className="space-y-4 mb-8">
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-foreground">Free therapist matching</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-foreground">No commitment required</span>
        </div>
        <div className="flex items-center space-x-3">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-foreground">Support available 24/7</span>
        </div>
      </div>

      <Button variant="healing" size="lg">
        <Mail className="w-5 h-5" />
        Get Started Today
      </Button>
    </div>

    <Card className="bg-card/50 backdrop-blur-sm border-border shadow-warm">
      <CardHeader>
        <CardTitle className="font-display text-foreground">Contact Us</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Name
          </label>
          <input
            type="text"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            placeholder="Your full name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Email
          </label>
          <input
            type="email"
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Message
          </label>
          <textarea
            rows={4}
            className="w-full px-4 py-3 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-foreground resize-none"
            placeholder="How can we help you?"
          />
        </div>
        <Button variant="healing" className="w-full">
          Send Message
        </Button>
      </CardContent>
    </Card>
  </div>
</div>
</section>
    )
}
