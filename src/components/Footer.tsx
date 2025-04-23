
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-brand-dark text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-teal flex items-center justify-center text-white font-bold text-xl">
                CC
              </div>
              <span className="text-xl font-display font-semibold">
                CultureConnect
              </span>
            </div>
            <p className="text-white/70 mb-4">
              Transforming customer service wait times into engaging, culturally rich experiences.
            </p>
            <div>
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Contact Us
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4 text-lg">Features</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Real-time Chat</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Language Translation</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Cultural Connection Hub</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Interactive Games</a>
              </li>
              <li>
                <a href="#" className="text-white/70 hover:text-white transition-colors">Voice Features</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold mb-4 text-lg">System Info</h3>
            <ul className="space-y-2">
              <li className="text-white/70">
                <span className="text-brand-teal">10+</span> Languages Supported
              </li>
              <li className="text-white/70">
                <span className="text-brand-teal">15+</span> Interactive Games
              </li>
              <li className="text-white/70">
                <span className="text-brand-teal">100+</span> Cultural Insights
              </li>
              <li className="text-white/70">
                <span className="text-brand-teal">24/7</span> Support Available
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/50 text-sm mb-4 md:mb-0">
            © 2026 CultureConnect. All rights reserved. Hackathon Project.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
              Terms
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
              Privacy
            </a>
            <a href="#" className="text-white/50 hover:text-white transition-colors text-sm">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
