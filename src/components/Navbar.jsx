import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, User, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine navbar appearance
  const isDarkInfo = isScrolled || !isHomePage;

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Collections', path: '/collections' },
    { name: 'Measurements', path: '/measurements' },
    { name: 'Appointments', path: '/appointment' },
    { name: 'About Us', path: '/about' },
  ];

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for storage changes to update user state dynamically
    const handleStorageChange = () => {
        setUser(JSON.parse(localStorage.getItem('user')));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleUserClick = () => {
     const token = localStorage.getItem('token');
     if (!token) {
        navigate('/login');
     } else {
        setIsUserMenuOpen(!isUserMenuOpen);
     }
  };

  const handleLogout = () => {
     localStorage.removeItem('token');
     localStorage.removeItem('user');
     setUser(null);
     setIsUserMenuOpen(false);
     navigate('/login');
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
      `}</style>

      {/* SEARCH OVERLAY */}


      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${
          isDarkInfo 
            ? 'bg-white py-4 border-[#C5A059]/20 text-black' 
            : 'bg-transparent py-8 border-transparent text-white'
        }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Logo - Serif Font */}
          <Link to="/" className="relative z-50 group">
            <span className={`text-2xl md:text-3xl font-[Playfair_Display] font-bold tracking-tight transition-colors duration-300 ${
              isDarkInfo ? "text-black" : "text-white"
            }`}>
              TAILOR<span className="text-[#C5A059]">.</span>
            </span>
          </Link>

          {/* Desktop Menu - Sans Serif, Wide Tracking */}
          <div className="hidden lg:flex items-center space-x-12">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-xs font-[Montserrat] font-bold tracking-[0.2em] uppercase transition-all duration-300 relative group py-2 ${
                  isDarkInfo ? "text-black hover:text-[#C5A059]" : "text-white/90 hover:text-white"
                }`}
              >
                {link.name}
                {/* Sharp Underline Effect */}
                <span className={`absolute bottom-0 left-0 w-0 h-px transition-all duration-300 group-hover:w-full ${
                    isDarkInfo ? "bg-[#C5A059]" : "bg-white"
                }`}></span>
              </Link>
            ))}
          </div>

          {/* Icons - Minimal & Sharp */}
          <div className={`hidden lg:flex items-center space-x-8 transition-colors duration-300 relative ${
             isDarkInfo ? "text-black" : "text-white"
          }`}>
            <div className="flex items-center">
                <AnimatePresence mode='wait'>
                    {isSearchOpen ? (
                        <motion.div 
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: 200, opacity: 1 }}
                            exit={{ width: 0, opacity: 0 }}
                            className="relative flex items-center bg-gray-100 rounded-full px-4 py-1 mr-2"
                        >
                             <input 
                                type="text" 
                                placeholder="Search..." 
                                className="bg-transparent border-none outline-none text-xs text-black w-full font-[Montserrat] placeholder:text-gray-400"
                                autoFocus
                                onBlur={() => setIsSearchOpen(false)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        navigate(`/collections?search=${e.target.value}`);
                                        setIsSearchOpen(false);
                                    }
                                }}
                             />
                             <button onClick={() => setIsSearchOpen(false)} className="text-gray-400 hover:text-black ml-2">
                                <X size={14} />
                             </button>
                        </motion.div>
                    ) : (
                        <button 
                            onClick={() => setIsSearchOpen(true)}
                            className="hover:text-[#C5A059] transition-colors duration-300"
                        >
                          <Search size={20} strokeWidth={1} />
                        </button>
                    )}
                </AnimatePresence>
            </div>
            
            {/* User Button & Dropdown */}
            <div className="relative">
                <button 
                    onClick={handleUserClick}
                    className="hover:text-[#C5A059] transition-colors duration-300 flex items-center"
                >
                    <User size={20} strokeWidth={1} />
                </button>

                <AnimatePresence>
                    {isUserMenuOpen && user && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute top-10 right-0 w-64 bg-white shadow-xl border border-gray-100 p-6 rounded-none z-50 text-left"
                        >
                            <div className="border-b border-gray-100 pb-4 mb-4">
                                <p className="text-[#C5A059] text-[10px] font-bold uppercase tracking-widest mb-1">Signed in as</p>
                                <p className="font-[Montserrat] font-bold text-black">{user.firstName} {user.lastName}</p>
                                <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                                <p className="text-[10px] uppercase bg-gray-100 inline-block px-2 py-1 mt-2 rounded">{user.role}</p>
                            </div>
                            <button 
                                onClick={handleLogout}
                                className="w-full text-left text-xs font-bold uppercase tracking-widest text-red-500 hover:text-red-600 transition-colors"
                            >
                                Logout
                            </button>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            <button className="hover:text-[#C5A059] transition-colors relative duration-300 group">
              <ShoppingBag size={20} strokeWidth={1} />
              <span className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#C5A059] rounded-none rotate-45 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`lg:hidden relative z-50 transition-colors duration-300 hover:text-[#C5A059] ${
              isDarkInfo || isMobileMenuOpen ? "text-black" : "text-white"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} strokeWidth={1} /> : <Menu size={28} strokeWidth={1} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay - Solid Black, High Contrast */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-white flex flex-col justify-center items-center overflow-y-auto p-4"
          >
            <div className="flex flex-col items-center space-y-8">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 40 }}
                  transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                >
                  <Link
                    to={link.path}
                    className="text-4xl font-[Playfair_Display] font-medium text-black hover:text-[#C5A059] hover:italic transition-all duration-300"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              {/* Mobile Icons Section */}
              <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-3 gap-12 mt-8 text-black"
              >
                  <button onClick={handleUserClick} className="flex flex-col items-center gap-3 group">
                       <div className="p-3 bg-gray-50 rounded-full group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-300">
                          <User size={24} strokeWidth={1.5} />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest">Account</span>
                  </button>
                  <button onClick={() => { navigate('/collections'); setIsMobileMenuOpen(false); }} className="flex flex-col items-center gap-3 group">
                       <div className="p-3 bg-gray-50 rounded-full group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-300">
                          <Search size={24} strokeWidth={1.5} />
                       </div>
                       <span className="text-[10px] font-bold uppercase tracking-widest">Search</span>
                  </button>
                  <button className="flex flex-col items-center gap-3 relative group">
                        <div className="p-3 bg-gray-50 rounded-full group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-300">
                           <ShoppingBag size={24} strokeWidth={1.5} />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-widest">Cart</span>
                  </button>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="absolute bottom-8 w-full px-6 flex justify-between items-center text-gray-400 font-[Montserrat] text-[10px] font-bold tracking-[0.2em] uppercase border-t border-gray-100 pt-6"
            >
              <span>Est. 1998</span>
              <span>Colombo 07</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;