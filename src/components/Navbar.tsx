
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 rounded-full bg-gradient-to-r from-brand-purple to-brand-teal flex items-center justify-center text-white font-bold text-xl">
              CC
            </div>
            <span className="text-xl font-display font-semibold hidden sm:block">
              CultureConnect
            </span>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#features" className="hover:text-brand-purple transition-colors">
              Features
            </a>
            <a href="#cultural-hub" className="hover:text-brand-purple transition-colors">
              Cultural Hub
            </a>
            <a href="#games" className="hover:text-brand-purple transition-colors">
              Games
            </a>
            <Button className="bg-brand-purple hover:bg-brand-purple/90">
              Demo
            </Button>
          </div>
          
          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={toggleMenu}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-3 animate-fade-in">
            <div className="flex flex-col gap-4">
              <a 
                href="#features" 
                className="px-2 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#cultural-hub" 
                className="px-2 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Cultural Hub
              </a>
              <a 
                href="#games" 
                className="px-2 py-2 hover:bg-muted rounded-md transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Games
              </a>
              <Button className="bg-brand-purple hover:bg-brand-purple/90 w-full">
                Demo
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
