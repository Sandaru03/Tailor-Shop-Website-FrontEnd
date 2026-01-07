import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Bespoke', path: '/bespoke' },
    { name: 'About', path: '/about' },
    { name: 'Journal', path: '/journal' },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b border-transparent',
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md py-4 shadow-sm border-gray-100' 
            : 'bg-transparent py-6 text-white'
        )}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="relative z-50 group">
            <span className={clsx(
              "text-2xl md:text-3xl font-serif font-bold tracking-tighter transition-colors duration-300",
              isScrolled ? "text-primary" : "text-white"
            )}>
              TAILOR<span className="text-secondary">.</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.path}
                className={clsx(
                  "text-sm font-medium tracking-wide uppercase hover:text-secondary transition-all duration-300 relative group overflow-hidden",
                  isScrolled ? "text-gray-800" : "text-gray-200"
                )}
              >
                <span className="relative z-10">{link.name}</span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-secondary transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className={clsx(
            "hidden lg:flex items-center space-x-6 transition-colors duration-300",
            isScrolled ? "text-primary" : "text-white"
          )}>
            <button className="hover:text-secondary transition-colors transform hover:scale-110 duration-300">
              <Search size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:text-secondary transition-colors transform hover:scale-110 duration-300">
              <User size={20} strokeWidth={1.5} />
            </button>
            <button className="hover:text-secondary transition-colors relative transform hover:scale-110 duration-300">
              <ShoppingBag size={20} strokeWidth={1.5} />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={clsx(
              "lg:hidden relative z-50 transition-colors duration-300 hover:text-secondary",
              isScrolled || isMobileMenuOpen ? "text-primary" : "text-white"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1.5} /> : <Menu size={28} strokeWidth={1.5} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl lg:hidden flex flex-col justify-center items-center"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    className="text-3xl font-serif font-medium text-primary hover:text-secondary transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-12 flex items-center space-x-8 text-primary"
            >
              <button className="flex flex-col items-center gap-2 hover:text-secondary transition-colors">
                <User size={24} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-widest">Account</span>
              </button>
              <button className="flex flex-col items-center gap-2 hover:text-secondary transition-colors">
                <ShoppingBag size={24} strokeWidth={1.5} />
                <span className="text-xs uppercase tracking-widest">Cart</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
