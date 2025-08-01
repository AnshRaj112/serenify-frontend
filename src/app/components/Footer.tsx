import { Heart, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const footerLinks = {
    platform: [
      { name: "Find a Therapist", href: "#" },
      { name: "How It Works", href: "#" },
      { name: "Pricing", href: "#" },
      { name: "Crisis Support", href: "#" }
    ],
    therapists: [
      { name: "Join as Therapist", href: "#" },
      { name: "Therapist Resources", href: "#" },
      { name: "Professional Development", href: "#" },
      { name: "Success Stories", href: "#" }
    ],
    support: [
      { name: "Help Center", href: "#" },
      { name: "Contact Us", href: "#" },
      { name: "Privacy Policy", href: "#" },
      { name: "Terms of Service", href: "#" }
    ]
  };

  return (
    <footer className="bg-muted text-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-gradient-teal-mint rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">HealingSpace</span>
            </div>
            <p className="text-white/70 leading-relaxed mb-6">
              Creating safe spaces for healing, growth, and genuine human connection. 
              Your mental wellness journey matters to us.
            </p>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary-glow" />
                <span className="text-white/70">support@healingspace.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary-glow" />
                <span className="text-white/70">1-800-HEALING</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary-glow" />
                <span className="text-white/70">Available Worldwide</span>
              </div>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Platform</h4>
            <ul className="space-y-3">
              {footerLinks.platform.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-primary-glow transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* For Therapists */}
          <div>
            <h4 className="text-lg font-semibold mb-6">For Therapists</h4>
            <ul className="space-y-3">
              {footerLinks.therapists.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-secondary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-white/70 hover:text-hope transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Crisis Support Highlight */}
            <div className="mt-8 p-4 bg-destructive/20 border border-destructive/30 rounded-xl">
              <h5 className="text-destructive font-semibold mb-2">Crisis Support</h5>
              <p className="text-white/70 text-sm">
                If you're in crisis, please call 988 or your local emergency services immediately.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/70 text-sm">
              © 2024 HealingSpace. All rights reserved. • HIPAA Compliant • Licensed & Verified Therapists
            </div>
            
            {/* Trust Badges */}
            <div className="flex items-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-primary-glow rounded-full"></div>
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-secondary rounded-full"></div>
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-hope rounded-full"></div>
                <span>Licensed Professionals</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;