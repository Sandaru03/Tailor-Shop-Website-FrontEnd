import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 md:pt-24 pb-12 border-t border-[#C5A059]">
      <div className="container mx-auto px-6 md:px-12 text-center md:text-left">
        
        {/* Top Grid - Structural Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20 border-b border-white/10 pb-20">
          
          {/* Brand Column (Span 4) */}
          <div className="lg:col-span-4 flex flex-col justify-between h-full items-center md:items-start">
            <div>
              <Link to="/" className="text-3xl md:text-4xl font-[Playfair_Display] font-bold tracking-tighter block mb-6">
                TAILOR<span className="text-[#C5A059]">.</span>
              </Link>
              <p className="text-gray-400 font-[Montserrat] text-sm leading-relaxed max-w-xs font-light mx-auto md:mx-0">
                Crafting bespoke elegance for the modern individual. Located in Colombo 07, where heritage meets avant-garde style.
              </p>
            </div>
            <div className="flex gap-6 mt-8 justify-center md:justify-start">
              {[Facebook, Instagram, Twitter, Linkedin].map((Icon, index) => (
                <a 
                  key={index} 
                  href="#" 
                  className="text-white hover:text-[#C5A059] transition-colors duration-300 transform hover:scale-110"
                >
                  <Icon size={20} strokeWidth={1} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Column (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-[Montserrat] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-8">Menu</h4>
            <ul className="space-y-4 font-[Montserrat] text-sm">
              {['Home', 'Collections', 'Bespoke', 'Journal', 'Contact'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Column (Span 2) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-[Montserrat] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-8">Services</h4>
            <ul className="space-y-4 font-[Montserrat] text-sm">
              {['Made to Measure', 'Alterations', 'Wedding', 'Fabrics', 'Styling'].map((item) => (
                <li key={item}>
                  <Link to="#" className="text-gray-400 hover:text-white hover:pl-2 transition-all duration-300 block">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column (Span 4) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-[Montserrat] font-bold uppercase tracking-[0.25em] text-[#C5A059] mb-8">Newsletter</h4>
            <p className="text-gray-400 font-[Montserrat] text-sm mb-8 font-light">
              Subscribe for exclusive access to new fabric arrivals and private events.
            </p>
            
            {/* Minimalist Input Form */}
            <form className="group relative">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="w-full bg-transparent border-b border-white/30 py-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#C5A059] transition-colors font-[Montserrat] text-sm tracking-wide rounded-none"
              />
              <button 
                type="submit" 
                className="absolute right-0 top-3 text-white hover:text-[#C5A059] transition-colors duration-300"
              >
                <span className="text-xs font-bold uppercase tracking-widest mr-2">Subscribe</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-[Montserrat] text-xs text-gray-600 uppercase tracking-widest">
          <p>
            &copy; {new Date().getFullYear()} Tailor Shop.
          </p>
          <div className="flex space-x-8">
            <Link to="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms</Link>
            <Link to="#" className="hover:text-white transition-colors">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;