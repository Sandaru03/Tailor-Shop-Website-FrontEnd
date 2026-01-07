import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-primary text-white pt-20 pb-10 overflow-hidden relative">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="text-3xl font-serif font-bold tracking-tighter block">
              TAILOR<span className="text-secondary">.</span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Crafting bespoke elegance for the modern individual. Where tradition meets contemporary style.
            </p>
            <div className="flex space-x-4">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-secondary hover:text-white transition-all duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {['Home', 'About Us', 'Services', 'Collections', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-secondary transition-colors inline-block transform hover:translate-x-1 duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Services</h4>
            <ul className="space-y-4">
              {['Bespoke Suits', 'Custom Shirts', 'Alterations', 'Wedding Attire', 'Styling'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-secondary transition-colors inline-block transform hover:translate-x-1 duration-300">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-serif font-bold mb-6">Newsletter</h4>
            <p className="text-gray-400 mb-6">Subscribe to receive updates, access to exclusive deals, and more.</p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-full py-3 px-6 text-white placeholder-gray-500 focus:outline-none focus:border-secondary transition-colors"
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300"
              >
                <ArrowRight size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Tailor Shop. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
