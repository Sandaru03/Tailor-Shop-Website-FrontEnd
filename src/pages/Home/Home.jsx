import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Scissors, Gem, Palette, Crown, Star 
} from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// --- DATA ---
const slides = [
    {
    id: 1,
    image: 'https://images.unsplash.com/photo-1633681926022-84c23e8cb2d6?q=80&w=2000&auto=format&fit=crop', // Replaced as requested (ID: LGXN4OSQSa4)
    subtitle: 'EST. 1998 • COLOMBO',
    title: 'THE ART OF\nBEAUTY',
    desc: 'Where Sri Lankan heritage meets modern elegance.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?q=80&w=2069&auto=format&fit=crop',
    subtitle: 'PREMIUM CARE',
    title: 'RADIANT\nELEGANCE',
    desc: 'Finest Organic Treatments and Rejuvenating Therapies.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?q=80&w=2078&auto=format&fit=crop',
    subtitle: 'CEREMONIAL GLAMOUR',
    title: 'BRIDAL\nGLOW',
    desc: 'From traditional Kandyan looks to modern Western styles.',
  },
];

const services = [
  {
    id: 1,
    icon: <Scissors strokeWidth={1} className="w-10 h-10" />,
    title: "Expert Hair Styling",
    desc: "Precision cuts, coloring, and styling tailored to your unique personality."
  },
  {
    id: 2,
    icon: <Crown strokeWidth={1} className="w-10 h-10" />,
    title: "Bridal Dressing",
    desc: "Complete bridal packages including hair, makeup, and dressing for your big day."
  },
  {
    id: 3,
    icon: <Star strokeWidth={1} className="w-10 h-10" />,
    title: "Facials & Skin Care",
    desc: "Rejuvenating treatments to give you that perfect, natural glow."
  },
  {
    id: 4,
    icon: <Gem strokeWidth={1} className="w-10 h-10" />,
    title: "Manicure & Pedicure",
    desc: "Luxury nail care services using premium, lasting products."
  }
];

// --- CUSTOM LUXURY BUTTON ---
const GoldButton = ({ children, variant = "outline", className = "", ...props }) => {
  const baseStyle = "relative px-8 py-4 font-sans font-bold text-xs tracking-[0.25em] uppercase transition-all duration-500 overflow-hidden group border";
  
  // Define styles based on variant
  const styles = variant === "outline" 
    ? "border-[#C5A059] text-[#C5A059] hover:text-white"
    : "border-white text-white hover:text-black hover:bg-white border-opacity-30";

  return (
    <button className={`${baseStyle} ${styles} ${className}`} {...props}>
      {/* Background Fill Animation */}
      {variant === "outline" && (
        <span className="absolute inset-0 w-full h-full bg-[#C5A059] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-0"></span>
      )}
      <span className="relative z-10 flex items-center gap-3">
        {children}
      </span>
    </button>
  );
};

const Home = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-white text-black font-sans selection:bg-[#C5A059] selection:text-white">
      
      {/* --- GLOBAL STYLES & FONTS --- */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
        
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Montserrat', sans-serif; }
        
        /* Swiper Pagination Customization */
        .swiper-pagination-bullet {
          width: 40px !important;
          height: 2px !important;
          background: rgba(255,255,255,0.3) !important;
          opacity: 1 !important;
          border-radius: 0 !important;
          margin: 0 5px !important;
        }
        .swiper-pagination-bullet-active {
          background: #C5A059 !important;
          height: 3px !important;
        }
        
        /* Smooth Scrolling for the page */
        html {
          scroll-behavior: smooth;
        }

        /* Hero Image Animation Optimization */
        .hero-bg-image {
          transform: scale(1.1);
          transition: transform 10s linear;
          will-change: transform;
        }
        .swiper-slide-active .hero-bg-image {
          transform: scale(1);
        }
      `}</style>

      <Navbar />

      <main>
        {/* --- HERO SECTION --- */}
        <section className="relative h-dvh w-full overflow-hidden bg-black">
          <Swiper
            modules={[Autoplay, EffectFade, Pagination]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={1500}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true, el: '.custom-pagination' }}
            className="h-full w-full"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative h-full w-full">
                {/* Image Background */}
                <div className="absolute inset-0">
                  <div 
                    className="w-full h-full bg-cover bg-center opacity-60 hero-bg-image"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/20 to-transparent" />
                </div>

                {/* Content */}
                <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex flex-col justify-center">
                  <div className="max-w-4xl border-l border-[#C5A059] pl-8 md:pl-12">
                    <motion.div
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8 }}
                    >
                      <span className="text-[#C5A059] font-bold tracking-[0.3em] text-xs uppercase mb-6 block">
                        {slide.subtitle}
                      </span>
                      
                      <h1 className="text-4xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-8 uppercase">
                        {slide.title}
                      </h1>
                      
                      <p className="text-gray-300 text-sm md:text-lg font-light max-w-lg mb-10 leading-relaxed">
                        {slide.desc}
                      </p>

                      <GoldButton
                        variant="outline"
                        className="text-xs"
                        onClick={() => navigate('/appointment')}
                      >
                        Book Appointment
                      </GoldButton>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
            
            {/* Custom Pagination Container */}
            <div className="custom-pagination absolute bottom-12 left-0 w-full flex justify-center z-20"></div>
          </Swiper>
        </section>

        {/* --- INTRODUCTION SECTION --- */}
        <section className="py-24 bg-white relative overflow-hidden">
          {/* Decorative Background Text */}
          <span className="absolute top-20 right-0 text-[5rem] md:text-[15rem] font-serif text-[#C5A059] opacity-[0.05] leading-none select-none z-0">
            1998
          </span>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Image Composition */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative aspect-4/5 bg-[#F5F5F5]">
                  <img src="/bridal.jpg" alt="Bridal Elegance" className="w-full h-full object-cover" />
                  
                  {/* Gold Frame Box */}
                  <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#C5A059] -z-10 hidden md:block"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-1/2">
                <span className="text-black font-bold tracking-[0.25em] text-xs uppercase mb-4 block">
                  The Salon
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-black mb-8 leading-tight">
                  Perfection in Every <br />
                  <span className="italic text-[#C5A059]">Touch & Detail.</span>
                </h2>
                <p className="text-gray-600 font-sans text-lg leading-relaxed mb-8 text-justify">
                  We don't just style hair; we craft confidence. Located in the heart of Colombo, our salon is built on the belief that beauty is personal. Whether it's a fresh cut or a bridal makeover, we ensure you leave feeling radiant.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-10">
                   <div>
                      <h4 className="text-4xl font-serif text-[#C5A059]">10+</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-black mt-2">Years of Excellence</p>
                   </div>
                   <div>
                      <h4 className="text-4xl font-serif text-[#C5A059]">5k+</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-black mt-2">Radiant Smiles</p>
                   </div>
                </div>

                <button 
                  onClick={() => document.getElementById('services').scrollIntoView({ behavior: 'smooth' })}
                  className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-black hover:text-[#C5A059] transition-colors"
                >
                  Explore Our Services 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"/>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* --- SERVICES GRID --- */}
        <section id="services" className="py-24 bg-[#fafafa] text-black">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 pb-6">
               <h2 className="text-4xl md:text-5xl font-serif">Our Services</h2>
               <p className="text-[#C5A059] font-sans text-xs tracking-widest uppercase mt-4 md:mt-0">
                  Full Beauty Care
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-white p-10 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 group cursor-pointer border border-gray-100 hover:-translate-y-2"
                >
                  <div className="mb-8 text-[#C5A059] bg-[#C5A059]/10 w-20 h-20 rounded-full flex items-center justify-center group-hover:bg-[#C5A059] group-hover:text-white transition-colors duration-500">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif text-black mb-4 group-hover:text-[#C5A059] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-500 font-sans text-sm leading-relaxed">
                    {service.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- COLLECTION HIGHLIGHT --- */}
        <section className="py-24 bg-white">
           <div className="container mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                 <div className="order-2 lg:order-1">
                    <span className="text-[#C5A059] font-bold tracking-[0.25em] text-xs uppercase mb-4 block">
                       Bridal Season 2024
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
                       The Timeless Bride
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 font-light">
                       Flawless makeup, intricate hair styling, and a glow that lasts. Designed for the Sri Lankan climate, tailored for your special day.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                       {['HD Makeup', 'Traditional/Modern Styles', 'Premium Products'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-black">
                             <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" /> {item}
                          </li>
                       ))}
                    </ul>

                    <GoldButton 
                        variant="outline" 
                        className="border-black text-black hover:text-white"
                        onClick={() => navigate('/collections')}
                    >
                        <span className="group-hover:text-white">View Collection</span>
                        {/* Override default gold fill with black for this specific button if needed, or keep gold */}
                    </GoldButton>
                 </div>

                 <div className="order-1 lg:order-2 relative h-[600px] overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1546193430-c2d207739ed7?q=80&w=1966&auto=format&fit=crop" alt="Bridal Collection" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute inset-0 border-10 border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none"></div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 bg-[#C5A059] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
               <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                  Your Transformation Awaits
               </h2>
               <p className="text-white/90 font-sans text-lg max-w-2xl mx-auto mb-10">
                  Experience the luxury of true beauty care. Visit our flagship salon in Colombo 07.
               </p>
               
               <button 
                  onClick={() => navigate('/appointment')}
                  className="bg-white text-[#C5A059] px-12 py-5 font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-300"
               >
                  Book Appointment
               </button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;