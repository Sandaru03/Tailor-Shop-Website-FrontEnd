import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { motion } from 'framer-motion';
import { 
  ArrowRight, Scissors, Ruler, Shirt, Crown, Star 
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
    image: '/Home/tailor1.jpg',
    subtitle: 'EST. 1998 • COLOMBO',
    title: 'THE ART OF\nBESPOKE',
    desc: 'Where Sri Lankan heritage meets Savile Row precision.',
  },
  {
    id: 2,
    image: '/Home/tailor2.jpg',
    subtitle: 'PREMIUM TEXTILES',
    title: 'HAND-WOVEN\nLUXURY',
    desc: 'Finest Italian Wools and Breathable Ceylon Linens.',
  },
  {
    id: 3,
    image: '/Home/tailor3.jpg',
    subtitle: 'CEREMONIAL WEAR',
    title: 'MODERN\nGROOM',
    desc: 'From traditional Nilame outfits to sharp Tuxedos.',
  },
];

const services = [
  {
    id: 1,
    icon: <Ruler strokeWidth={1} className="w-10 h-10" />,
    title: "Made to Measure",
    desc: "Precision fit tailored to your unique silhouette within 48 hours."
  },
  {
    id: 2,
    icon: <Scissors strokeWidth={1} className="w-10 h-10" />,
    title: "Master Alterations",
    desc: "Revitalize your wardrobe with invisible mending and structural resizing."
  },
  {
    id: 3,
    icon: <Crown strokeWidth={1} className="w-10 h-10" />,
    title: "Wedding Suites",
    desc: "Complete styling consultation for the groom and groomsmen."
  },
  {
    id: 4,
    icon: <Shirt strokeWidth={1} className="w-10 h-10" />,
    title: "Imported Fabrics",
    desc: "Exclusive access to Loro Piana, Zegna, and Scabal textiles."
  }
];

// --- CUSTOM LUXURY BUTTON ---
const GoldButton = ({ children, variant = "outline", className = "" }) => {
  const baseStyle = "relative px-8 py-4 font-sans font-bold text-xs tracking-[0.25em] uppercase transition-all duration-500 overflow-hidden group border";
  
  // Define styles based on variant
  const styles = variant === "outline" 
    ? "border-[#C5A059] text-[#C5A059] hover:text-white"
    : "border-white text-white hover:text-black hover:bg-white border-opacity-30";

  return (
    <button className={`${baseStyle} ${styles} ${className}`}>
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
        <section className="relative h-screen w-full overflow-hidden bg-black">
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
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
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
                      
                      <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-white leading-[0.9] mb-8 uppercase">
                        {slide.title}
                      </h1>
                      
                      <p className="text-gray-300 text-lg font-light max-w-lg mb-10 leading-relaxed">
                        {slide.desc}
                      </p>

                      <GoldButton variant="outline">
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
          <span className="absolute top-20 right-0 text-[10rem] md:text-[15rem] font-serif text-[#C5A059] opacity-[0.05] leading-none select-none -z-0">
            1998
          </span>

          <div className="container mx-auto px-6 relative z-10">
            <div className="flex flex-col lg:flex-row gap-16 items-center">
              
              {/* Image Composition */}
              <div className="w-full lg:w-1/2 relative">
                <div className="relative aspect-[4/5] bg-[#F5F5F5]">
                  <img src="/Home/tailor4.jpg" alt="Tailoring" className="w-full h-full object-cover" />
                  
                  {/* Gold Frame Box */}
                  <div className="absolute -bottom-6 -right-6 w-full h-full border border-[#C5A059] -z-10 hidden md:block"></div>
                </div>
              </div>

              {/* Text Content */}
              <div className="w-full lg:w-1/2">
                <span className="text-black font-bold tracking-[0.25em] text-xs uppercase mb-4 block">
                  The Atelier
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-black mb-8 leading-tight">
                  Precision in Every <br />
                  <span className="italic text-[#C5A059]">Stitch & Seam.</span>
                </h2>
                <p className="text-gray-600 font-sans text-lg leading-relaxed mb-8 text-justify">
                  We don't just make suits; we engineer confidence. Located in the heart of Colombo, our heritage is built on the belief that a suit should not just fit your body, but your personality.
                </p>

                <div className="grid grid-cols-2 gap-8 mb-10">
                   <div>
                      <h4 className="text-4xl font-serif text-[#C5A059]">25+</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-black mt-2">Years of Excellence</p>
                   </div>
                   <div>
                      <h4 className="text-4xl font-serif text-[#C5A059]">5k+</h4>
                      <p className="text-xs font-bold uppercase tracking-widest text-black mt-2">Bespoke Creations</p>
                   </div>
                </div>

                <button className="group flex items-center gap-4 text-xs font-bold uppercase tracking-[0.25em] text-black hover:text-[#C5A059] transition-colors">
                  Explore Our Story 
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-300"/>
                </button>
              </div>

            </div>
          </div>
        </section>

        {/* --- SERVICES GRID --- */}
        <section className="py-24 bg-[#0a0a0a] text-white">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-white/10 pb-6">
               <h2 className="text-4xl md:text-5xl font-serif">Our Expertise</h2>
               <p className="text-[#C5A059] font-sans text-xs tracking-widest uppercase mt-4 md:mt-0">
                  Full Service Tailoring
               </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-[#0a0a0a] p-10 hover:bg-[#111] transition-colors duration-500 group cursor-pointer"
                >
                  <div className="mb-8 text-[#C5A059] group-hover:scale-110 transition-transform duration-500 origin-left">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-serif text-white mb-4 group-hover:text-[#C5A059] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 font-sans text-sm leading-relaxed group-hover:text-gray-300">
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
                       Collections 2024
                    </span>
                    <h2 className="text-4xl md:text-5xl font-serif text-black mb-6">
                       The Modern Executive
                    </h2>
                    <p className="text-gray-600 text-lg mb-8 font-light">
                       Sharp lines, structured shoulders, and fabrics that breathe. Designed for the Colombo climate, tailored for the global boardroom.
                    </p>
                    
                    <ul className="space-y-4 mb-10">
                       {['Canvas Construction', 'Functional Buttonholes', 'Italian Wool'].map((item, i) => (
                          <li key={i} className="flex items-center gap-3 text-sm font-bold uppercase tracking-wider text-black">
                             <Star className="w-4 h-4 text-[#C5A059] fill-[#C5A059]" /> {item}
                          </li>
                       ))}
                    </ul>

                    <GoldButton variant="outline" className="border-black text-black hover:text-white">
                        <span className="group-hover:text-white">View Collection</span>
                        {/* Override default gold fill with black for this specific button if needed, or keep gold */}
                    </GoldButton>
                 </div>

                 <div className="order-1 lg:order-2 relative h-[600px] overflow-hidden group">
                    <img src="/Home/tailor6.jpg" alt="Collection" className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
                    <div className="absolute inset-0 border-[10px] border-white/0 group-hover:border-white/20 transition-all duration-500 pointer-events-none"></div>
                 </div>
              </div>
           </div>
        </section>

        {/* --- CTA SECTION --- */}
        <section className="py-24 bg-[#C5A059] relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="container mx-auto px-6 text-center relative z-10">
               <h2 className="text-4xl md:text-6xl font-serif text-white mb-8">
                  Your Fitting Awaits
               </h2>
               <p className="text-white/90 font-sans text-lg max-w-2xl mx-auto mb-10">
                  Experience the luxury of true bespoke tailoring. Visit our flagship store in Colombo 07.
               </p>
               
               <button className="bg-white text-[#C5A059] px-12 py-5 font-bold tracking-[0.25em] uppercase hover:bg-black hover:text-white transition-all duration-300">
                  Book Consultation
               </button>
            </div>
        </section>

      </main>
      <Footer />
    </div>
  );
};

export default Home;