import React from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { motion } from 'framer-motion';
import { Scissors, Award, Clock, Heart } from 'lucide-react';

const About = () => {
    const stats = [
        { label: "Years of Heritage", value: "25+" },
        { label: "Master Tailors", value: "12" },
        { label: "Suits Crafted", value: "5000+" },
        { label: "Global Clients", value: "850+" }
    ];

    return (
        <div className="min-h-screen bg-white text-black font-sans selection:bg-[#C5A059] selection:text-white">
            <Navbar />
            
            <main>
                {/* --- HERO SECTION --- */}
                <section className="relative h-[70vh] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
                    <div className="absolute inset-0 opacity-50">
                        <img src="/Home/tailor5.jpg" alt="Tailoring Workshop" className="w-full h-full object-cover" />
                    </div>
                    <div className="absolute inset-0 bg-black/40"></div>
                 
                    <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
                        <motion.span 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="text-[#C5A059] font-bold tracking-[0.3em] text-xs uppercase mb-6 block"
                        >
                            Since 1998
                        </motion.span>
                        <motion.h1 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="text-5xl md:text-7xl font-[Playfair_Display] leading-tight mb-8"
                        >
                            The Art of <br/> <span className="italic text-[#C5A059]">Perfection</span>
                        </motion.h1>
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="text-gray-300 text-lg md:text-xl font-light"
                        >
                            More than just a tailor shop, we are custodians of a timeless craft.
                        </motion.p>
                    </div>
                </section>

                {/* --- OUR STORY --- */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-6">
                        <div className="flex flex-col lg:flex-row gap-16 items-center">
                            <div className="w-full lg:w-1/2">
                                <h2 className="text-4xl font-[Playfair_Display] mb-8">Our Philosophy</h2>
                                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                                    Founded in the heart of Colombo, our journey began with a simple belief: that true luxury lies in the details. For over two decades, we have dedicated ourselves to the mastery of bespoke tailoring, combining traditional techniques with contemporary sensibilities.
                                </p>
                                <p className="text-gray-600 text-lg leading-relaxed mb-8">
                                    Every garment we create is a collaborative dialogue between the tailor and the wearer. We don't just measure the body; we measure the posture, the movement, and the personality.
                                </p>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="flex items-start gap-4">
                                        <Scissors className="text-[#C5A059] shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Handcrafted</h4>
                                            <p className="text-sm text-gray-500">Every stitch placed by hand.</p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-4">
                                        <Award className="text-[#C5A059] shrink-0" size={24} />
                                        <div>
                                            <h4 className="font-bold text-sm uppercase tracking-wider mb-2">Premium Quality</h4>
                                            <p className="text-sm text-gray-500">Finest imported fabrics.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 relative">
                                <div className="relative z-10">
                                    <img src="/Home/tailor2.jpg" alt="Master Tailor" className="w-full h-auto shadow-xl" />
                                </div>
                                <div className="absolute top-10 -right-10 w-full h-full border-2 border-[#C5A059]/30 -z-0 hidden md:block"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* --- STATS --- */}
                <section className="py-20 bg-[#0a0a0a] text-white overflow-hidden relative">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #C5A059 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
                    
                    <div className="container mx-auto px-6 relative z-10">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
                            {stats.map((stat, index) => (
                                <div key={index} className="p-6 border border-white/10 hover:border-[#C5A059]/50 transition-colors duration-500 bg-white/5 backdrop-blur-sm group">
                                    <h3 className="text-4xl md:text-5xl font-[Playfair_Display] text-[#C5A059] mb-2 group-hover:scale-110 transition-transform">{stat.value}</h3>
                                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{stat.label}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* --- TEAM/PROCESS --- */}
                <section className="py-24 bg-[#f8f8f8]">
                    <div className="container mx-auto px-6 text-center max-w-3xl">
                        <Heart className="text-[#C5A059] mx-auto mb-6" size={32} />
                        <h2 className="text-3xl md:text-4xl font-[Playfair_Display] mb-8">Crafted With Passion</h2>
                        <p className="text-gray-600 mb-12">
                            "To wear a suit made by us is to wear a piece of art. It is an experience that transforms not just how you look, but how you feel."
                        </p>
                        <img src="/Home/tailor7.jpg" alt="Team at work" className="w-full h-64 md:h-96 object-cover mb-8 filter grayscale hover:grayscale-0 transition-all duration-700" />
                    </div>
                </section>

            </main>
            <Footer />
        </div>
    );
};

export default About;
