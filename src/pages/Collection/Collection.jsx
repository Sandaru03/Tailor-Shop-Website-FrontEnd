import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Filter, ChevronDown } from 'lucide-react';

// --- DATA (Images Repeated as requested) ---
const allCollections = [
  { id: 1, image: '/Collections/cl1.jpg', title: 'The Royal Wedding', category: 'Ceremonial', year: '2024' },
  { id: 2, image: '/Collections/cl2.jpg', title: 'Business Elite', category: 'Suits', year: '2024' },
  { id: 3, image: '/Collections/cl3.png', title: 'Summer Linen', category: 'Casual', year: '2023' },
  { id: 4, image: '/Collections/cl4.jpg', title: 'Midnight Tuxedo', category: 'Evening Wear', year: '2024' },
  // Repeated Items for Grid Look
  { id: 5, image: '/Collections/cl2.jpg', title: 'Charcoal Pinstripe', category: 'Suits', year: '2023' },
  { id: 6, image: '/Collections/cl1.jpg', title: 'Heritage Nilame', category: 'Ceremonial', year: '2024' },
  { id: 7, image: '/Collections/cl3.png', title: 'Resort Collection', category: 'Casual', year: '2024' },
  { id: 8, image: '/Collections/cl4.jpg', title: 'Gala Black Tie', category: 'Evening Wear', year: '2023' },
];

const categories = ['All', 'Suits', 'Ceremonial', 'Casual', 'Evening Wear'];

const Collection = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  // Filter Logic
  const filteredItems = allCollections.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#C5A059] selection:text-white">
      
      {/* Global Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>

      <Navbar />
      
      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-[70vh] bg-black flex items-end pb-20 overflow-hidden">
             {/* Background Image with Zoom Effect */}
             <div className="absolute inset-0 overflow-hidden">
                <motion.div 
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 2 }}
                    className="w-full h-full bg-[url('/Home/tailor1.jpg')] bg-cover bg-center opacity-50"
                />
             </div>
             <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent"></div>
             
             <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-end gap-8">
                <div>
                   <motion.span 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6 }}
                      className="text-[#C5A059] font-sans font-bold text-xs tracking-[0.3em] uppercase mb-4 block"
                   >
                      Curated Excellence
                   </motion.span>
                   <motion.h1 
                      initial={{ y: 20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.1 }}
                      className="text-5xl md:text-8xl font-serif text-white uppercase leading-[0.9]"
                   >
                      {searchQuery ? `Search: "${searchQuery}"` : <>The <br/> Archives</>}
                   </motion.h1>
                </div>
                
                <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   transition={{ delay: 0.4 }}
                   className="hidden md:block max-w-xs text-right"
                >
                   <p className="text-gray-400 font-sans text-sm leading-relaxed">
                      Explore our seasonal masterpieces. Each garment tells a story of fabric, fit, and finish.
                   </p>
                </motion.div>
             </div>
        </section>

        {/* --- FILTER & GALLERY SECTION --- */}
        <section className="py-20 container mx-auto px-6 md:px-12">
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap items-center justify-center md:justify-between gap-8 mb-16 border-b border-gray-100 pb-6">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-400">
                    <Filter size={14} /> Filter By:
                </div>
                
                <div className="flex flex-wrap justify-center gap-8">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            className={`text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 relative pb-2 ${
                                activeCategory === cat ? 'text-black' : 'text-gray-400 hover:text-black'
                            }`}
                        >
                            {cat}
                            {activeCategory === cat && (
                                <motion.span 
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A059]"
                                />
                            )}
                        </button>
                    ))}
                </div>
                
                <div className="hidden md:block text-xs font-bold uppercase tracking-widest text-gray-400">
                    Showing {filteredItems.length} Results
                </div>
            </div>

            {/* Gallery Grid - AnimatePresence allows layout animations */}
            <motion.div 
                layout
                className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-x-8 md:gap-y-16"
            >
                <AnimatePresence>
                    {filteredItems.map((item) => (
                        <motion.div
                            layout
                            key={item.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            className="group cursor-pointer"
                        >
                            {/* Image Container */}
                            <div className="relative aspect-3/4 overflow-hidden mb-6 bg-gray-100">
                                <img 
                                    src={item.image} 
                                    alt={item.title} 
                                    className="w-full h-full object-cover transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                                />
                                
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500"></div>

                                {/* Quick View Button (Slide Up) */}
                                <div className="absolute bottom-0 left-0 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                    <button className="w-full bg-white text-black py-4 text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] hover:text-white transition-colors">
                                        Quick View
                                    </button>
                                </div>
                                
                                {/* Year Badge */}
                                <div className="absolute top-4 right-4 bg-black/10 backdrop-blur text-white px-3 py-1 text-[10px] font-bold tracking-widest border border-white/20">
                                    {item.year}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-[#C5A059] text-[10px] font-bold uppercase tracking-[0.2em] mb-2 block">
                                        {item.category}
                                    </span>
                                    <h3 className="text-sm md:text-2xl font-serif text-black group-hover:italic transition-all duration-300">
                                        {item.title}
                                    </h3>
                                </div>
                                <div className="pt-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                                    <ArrowUpRight size={20} className="text-[#C5A059]" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>
            
            {/* Load More Button */}
            <div className="mt-24 text-center">
                <button className="border border-black px-12 py-4 text-xs font-bold uppercase tracking-[0.25em] hover:bg-black hover:text-white transition-all duration-300">
                    Load More
                </button>
            </div>

        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Collection;