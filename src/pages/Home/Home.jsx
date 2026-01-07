
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination, Parallax } from 'swiper/modules';
import { motion } from 'framer-motion';
import { 
  ArrowRight, ChevronRight, ChevronLeft, 
  CheckCircle, 
  Scissors, Ruler, Shirt, Watch, ArrowUpRight 
} from 'lucide-react';

import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1593030761757-71bd90dbe78e?q=80&w=2070&auto=format&fit=crop', // Classic Tailor Suit
    title: 'Bespoke Tailoring',
    subtitle: 'Crafted to perfection, designed for you. Experience the art of true personalization.',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?q=80&w=2070&auto=format&fit=crop', // Sewing/Fabric
    title: 'Premium Fabrics',
    subtitle: 'Sourced from the finest mills in Italy and England. Quality you can feel.',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?q=80&w=2095&auto=format&fit=crop', // Modern Man in Suit
    title: 'Modern Elegance',
    subtitle: 'Timeless style meets contemporary design. Elevate your wardrobe today.',
  },
];

const services = [
  {
    icon: <Scissors size={32} />,
    title: 'Custom Alterations',
    description: 'Perfect fits for your existing wardrobe. Hemming, resizing, and restyling.',
  },
  {
    icon: <Ruler size={32} />,
    title: 'Made to Measure',
    description: 'Suits and shirts crafted to your exact measurements for unparalleled comfort.',
  },
  {
    icon: <Shirt size={32} />,
    title: 'Bespoke Suiting',
    description: 'The ultimate sartorial experience. Fully hand-crafted from the finest fabrics.',
  },
  {
    icon: <Watch size={32} />,
    title: 'Styling Consultation',
    description: 'Expert advice on fabrics, cuts, and styles to elevate your personal brand.',
  },
];

const Home = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative h-screen w-full overflow-hidden bg-black">
          <Swiper
            modules={[Autoplay, EffectFade, Navigation, Pagination, Parallax]}
            effect="fade"
            speed={1500}
            parallax={true}
            autoplay={{
              delay: 6000,
              disableOnInteraction: false,
            }}
            pagination={{ 
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + ' relative overflow-hidden"><span class="absolute inset-0 bg-secondary transform -translate-x-full transition-transform duration-6000 ease-linear w-full h-full"></span></span>';
              }
            }}
            navigation={{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }}
            className="h-full w-full group"
          >
            {slides.map((slide) => (
              <SwiperSlide key={slide.id} className="relative h-full w-full">
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-10000 ease-out"
                  style={{ backgroundImage: `url(${slide.image})` }}
                  data-swiper-parallax="-20%"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent" />
                </div>
                
                <div className="relative h-full container mx-auto px-6 md:px-12 flex flex-col justify-center items-start text-white z-10">
                  <div className="max-w-4xl overflow-hidden">
                    <motion.div
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="flex items-center gap-4 mb-6">
                        <span className="h-px w-12 bg-secondary"></span>
                        <h2 className="text-sm md:text-base font-medium tracking-[0.2em] uppercase text-secondary" data-swiper-parallax="-100">
                          Est. 2024 • London
                        </h2>
                      </div>
                      
                      <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif font-bold mb-8 leading-[0.9] tracking-tight" data-swiper-parallax="-200">
                        {slide.title.split(' ').map((word, i) => (
                          <span key={i} className="block">{word}</span>
                        ))}
                      </h1>
                      
                      <p className="text-lg md:text-xl text-gray-300 mb-12 max-w-xl font-light leading-relaxed border-l-2 border-white/20 pl-6" data-swiper-parallax="-300">
                        {slide.subtitle}
                      </p>
                      
                      <div className="flex flex-wrap gap-6" data-swiper-parallax="-400">
                        <button className="relative px-8 py-4 bg-white text-primary font-medium tracking-wide overflow-hidden group/btn transition-all duration-300 hover:bg-secondary hover:text-white">
                          <span className="relative z-10 flex items-center gap-3">
                            Book Appointment
                            <ArrowRight size={18} />
                          </span>
                        </button>
                        
                        <button className="px-8 py-4 border border-white/30 text-white font-medium tracking-wide hover:bg-white/10 transition-all duration-300 backdrop-blur-sm">
                          View Collection
                        </button>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}

            {/* Custom Navigation */}
            <div className="absolute bottom-12 right-12 z-20 gap-4 hidden md:flex">
              <button className="swiper-button-prev-custom w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm">
                <ChevronLeft size={24} />
              </button>
              <button className="swiper-button-next-custom w-14 h-14 border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-primary transition-all duration-300 backdrop-blur-sm">
                <ChevronRight size={24} />
              </button>
            </div>
          </Swiper>
          
          <style>{`
            .swiper-pagination-bullet {
              width: 40px;
              height: 4px;
              border-radius: 0;
              background: rgba(255, 255, 255, 0.3);
              opacity: 1;
              margin: 0 6px !important;
            }
            .swiper-pagination-bullet-active {
              background: rgba(255, 255, 255, 0.3);
            }
            .swiper-pagination-bullet-active .absolute {
              transform: translateX(0);
            }
          `}</style>
        </section>

        {/* About Section */}
        <section className="py-24 bg-white overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Image Side */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden aspect-4/5">
                            <img
                                src="https://images.unsplash.com/photo-1598556776374-2274945f95d3?q=80&w=2070&auto=format&fit=crop"
                                alt="Tailor working on fabric"
                                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                            />
                        </div>
                        {/* Floating Badge */}
                        <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl max-w-xs hidden md:block">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="text-4xl font-bold text-secondary">25+</div>
                                <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Years of<br />Experience</div>
                            </div>
                            <p className="text-gray-600 text-sm">Master tailors dedicated to the art of perfection.</p>
                        </div>
                    </motion.div>

                    {/* Content Side */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full lg:w-1/2"
                    >
                        <h4 className="text-secondary font-medium tracking-widest uppercase mb-4">About Us</h4>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 leading-tight">
                            We Craft Clothing That <br /> Defines Your Personality
                        </h2>
                        <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                            At Tailor Shop, we believe that true style is personal. Our journey began over two decades ago with a simple mission: to bring the tradition of bespoke tailoring to the modern gentleman and gentlewoman.
                        </p>

                        <div className="space-y-4 mb-10">
                            {[
                                'Expert craftsmanship with attention to detail',
                                'Premium fabrics sourced globally',
                                'Personalized fittings and consultations',
                                'Timeless designs with a modern twist'
                            ].map((item, index) => (
                                <div key={index} className="flex items-center gap-3">
                                    <CheckCircle className="text-secondary shrink-0" size={20} />
                                    <span className="text-gray-700 font-medium">{item}</span>
                                </div>
                            ))}
                        </div>

                        <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-medium hover:bg-primary hover:text-white transition-all duration-300">
                            Learn More About Us
                        </button>
                    </motion.div>

                </div>
            </div>
        </section>

        {/* Services Section */}
        <section className="py-32 bg-accent relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
          </div>

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div className="max-w-2xl">
                <motion.span 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-secondary font-medium tracking-widest uppercase block mb-4"
                >
                  Our Expertise
                </motion.span>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl md:text-6xl font-serif font-bold leading-tight"
                >
                  Craftsmanship <br /> & Precision
                </motion.h2>
              </div>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-600 max-w-md text-lg"
              >
                We offer a comprehensive range of tailoring services to ensure you look your absolute best, combining traditional techniques with modern style.
              </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group bg-white p-8 rounded-none border border-gray-100 hover:border-secondary/30 transition-all duration-500 hover:shadow-2xl hover:shadow-secondary/5 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="text-secondary" />
                  </div>
                  
                  <div className="w-14 h-14 bg-accent rounded-full flex items-center justify-center mb-8 text-primary group-hover:bg-secondary group-hover:text-white transition-colors duration-500">
                    {service.icon}
                  </div>
                  
                  <h3 className="text-xl font-serif font-bold mb-4 group-hover:text-secondary transition-colors duration-300">{service.title}</h3>
                  <p className="text-gray-500 leading-relaxed mb-6">{service.description}</p>
                  
                  <div className="w-full h-px bg-gray-100 group-hover:bg-secondary/30 transition-colors duration-500"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
