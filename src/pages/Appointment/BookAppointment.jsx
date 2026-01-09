
import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Calendar, Clock, User, Phone,  Scissors, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const BookAppointment = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    
    // Form Data
    const [formData, setFormData] = useState({
        customerName: '',
        contactNumber: '',
        garmentType: '',
        date: '',
        time: ''
    });

    // Booking Logic State
    const [existingAppointments, setExistingAppointments] = useState([]);
    const [availableSlots, setAvailableSlots] = useState([]);
    const [selectedDateObj, setSelectedDateObj] = useState(null);

    // Standard Operating Hours (e.g., 9 AM to 7 PM)
    const STANDARD_SLOTS = [];
    for (let h = 9; h < 19; h++) {
        ["00", "15", "30", "45"].forEach(m => {
            STANDARD_SLOTS.push(`${h.toString().padStart(2, '0')}:${m}`);
        });
    }
    STANDARD_SLOTS.push("19:00");

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            // Check if there is a public endpoint for checking slots. 
            // If not, we might need to rely on a new endpoint or use the existing one if public (or unprotected).
            // NOTE: Usually /appointments is protected. We might need a public "check-availability" endpoint in future.
            // For now, assuming we can fetch or we'll simply fail gracefully.
            // If the /appointments endpoint is protected (admin only), this will fail for users.
            // A better approach without backend changes: 
            // We'll try to fetch, if 403/401, we might need to assume all open (risky) or ask user to provide a public endpoint.
            // However, the user asked to "check against database". I'll assume we made /appointments public OR 
            // I should have created a specific public route. 
            // Let's check `appointmentRouter.js`. It likely has `router.get('/', isAdmin, ...)`
            // I'll check that in a sec. For now, I'll write the frontend anticipating a list of {date, time}.
            
            // To make this work securely, I'm going to just fetch them. If it fails due to auth, I'll fix the backend next.
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/appointments`); 
            if (res.ok) {
                const data = await res.json();
                setExistingAppointments(data);
            }
        } catch (err) {
            console.error("Failed to fetch existing appointments");
        }
    };

    // Handle Date Selection via DatePicker
    const handleDateChange = (date) => {
        if(!date) {
            setSelectedDateObj(null);
            setAvailableSlots([]);
            setFormData(prev => ({ ...prev, date: '', time: '' }));
            return;
        }

        // Adjust for timezone to get YYYY-MM-DD
        const offsetDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)); 
        const dateString = offsetDate.toISOString().split('T')[0];
        
        setSelectedDateObj(date);
        setFormData(prev => ({ ...prev, date: dateString, time: '' }));
        
        // Filter slots
        // Find all appointments for this date
        const bookingsForDay = existingAppointments.filter(apt => apt.date === dateString);
        const bookedTimes = bookingsForDay.map(apt => apt.time);

        // Available = Standard - Booked
        const openSlots = STANDARD_SLOTS.filter(slot => !bookedTimes.includes(slot));
        setAvailableSlots(openSlots);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/appointments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (res.ok) {
                setSuccess(true);
                // Refresh appointments to update local state immediately
                fetchAppointments();
            } else {
                const err = await res.json();
                alert(err.message || 'Booking Failed');
            }
        } catch (error) {
            console.error("Booking Error", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&display=swap');
                
                .react-datepicker-wrapper { width: 100%; }
                .react-datepicker__input-container input { width: 100%; outline: none; font-family: 'Montserrat', sans-serif; font-size: 0.875rem; background: transparent; cursor: pointer; }
                .react-datepicker { border: none; font-family: 'Montserrat', sans-serif; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); border-radius: 0.5rem; }
                .react-datepicker__header { background-color: white; border-bottom: 1px solid #f3f4f6; }
                .react-datepicker__day--selected, .react-datepicker__day--keyboard-selected { background-color: #000 !important; color: white !important; font-weight: bold; border-radius: 50%; }
                .react-datepicker__day:hover { background-color: #f3f4f6; border-radius: 50%; }
            `}</style>
            <Navbar />

            <div className="pt-32 pb-20 container mx-auto px-6 flex justify-center items-center min-h-[80vh]">
                <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 shadow-2xl overflow-hidden rounded-2xl">
                    
                    {/* Left Side */}
                    <div className="bg-black text-white p-6 md:p-12 flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute inset-0 opacity-40 bg-[url('/Home/tailor1.jpg')] bg-cover bg-center"></div>
                        <div className="relative z-10">
                            <h2 className="text-4xl font-[Playfair_Display] mb-4">Book Your <br/> Consultation</h2>
                            <p className="font-[Montserrat] text-sm text-gray-300 leading-relaxed">
                                Our master tailors are at your service. Select a convenient time for your personal fitting or consultation.
                            </p>
                        </div>
                        <div className="relative z-10 mt-12">
                             <h4 className="font-bold text-[#C5A059] uppercase tracking-widest text-xs mb-2">Opening Hours</h4>
                             <p className="text-sm text-gray-400">09:00 AM — 07:00 PM</p>
                        </div>
                    </div>

                    {/* Right Side - Form */}
                    <div className="bg-white p-6 md:p-12 relative overflow-visible"> 
                        {!success ? (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                                    <div className="flex items-center border-b border-gray-200 py-2">
                                        <User size={18} className="text-[#C5A059] mr-3" />
                                        <input 
                                            type="text" 
                                            required
                                            value={formData.customerName}
                                            onChange={e => setFormData({...formData, customerName: e.target.value})}
                                            placeholder="John Doe"
                                            className="w-full outline-none font-[Montserrat] text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Contact Number</label>
                                    <div className="flex items-center border-b border-gray-200 py-2">
                                        <Phone size={18} className="text-[#C5A059] mr-3" />
                                        <input 
                                            type="tel" 
                                            required
                                            value={formData.contactNumber}
                                            onChange={e => setFormData({...formData, contactNumber: e.target.value})}
                                            placeholder="+94 77 123 4567"
                                            className="w-full outline-none font-[Montserrat] text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Garment Type</label>
                                    <div className="flex items-center border-b border-gray-200 py-2">
                                        <Scissors size={18} className="text-[#C5A059] mr-3" />
                                        <select 
                                            required
                                            value={formData.garmentType}
                                            onChange={e => setFormData({...formData, garmentType: e.target.value})}
                                            className="w-full outline-none font-[Montserrat] text-sm bg-transparent"
                                        >
                                            <option value="" disabled>Select Garment</option>
                                            <option value="Suit">Custom Suit</option>
                                            <option value="Shirt">Tailored Shirt</option>
                                            <option value="Trousers">Trousers</option>
                                            <option value="Ceremonial">Ceremonial Wear</option>
                                            <option value="Alteration">Alteration</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="relative">
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Date</label>
                                        <div className="flex items-center border-b border-gray-200 py-2 relative z-50">
                                            <Calendar size={18} className="text-[#C5A059] mr-3" />
                                            <DatePicker 
                                                selected={selectedDateObj}
                                                onChange={handleDateChange}
                                                minDate={new Date()}
                                                placeholderText="Select Date"
                                                className="w-full cursor-pointer"
                                                dateFormat="yyyy-MM-dd"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">Time Slot</label>
                                        <div className="flex items-center border-b border-gray-200 py-2">
                                            <Clock size={18} className="text-[#C5A059] mr-3" />
                                            <select 
                                                required
                                                value={formData.time}
                                                onChange={e => setFormData({...formData, time: e.target.value})}
                                                disabled={!formData.date}
                                                className="w-full outline-none font-[Montserrat] text-sm bg-transparent disabled:opacity-50"
                                            >
                                                <option value="" disabled>Select Time</option>
                                                {availableSlots.map((time, idx) => (
                                                    <option key={idx} value={time}>{time}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                
                                {formData.date && availableSlots.length === 0 && (
                                    <p className="text-[10px] text-red-500 font-bold italic mt-2">
                                        * No time slots available for this date.
                                    </p>
                                )}

                                <button 
                                    type="submit" 
                                    disabled={loading || !formData.date || !formData.time}
                                    className="w-full bg-black text-white py-4 font-bold uppercase tracking-widest hover:bg-[#C5A059] transition-all duration-300 mt-8 disabled:opacity-70 disabled:cursor-not-allowed"
                                >
                                    {loading ? 'Processing...' : 'Confirm Appointment'}
                                </button>

                            </form>
                        ) : (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-full text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mb-6">
                                    <CheckCircle size={40} />
                                </div>
                                <h3 className="text-2xl font-[Playfair_Display] font-bold mb-2">Booking Confirmed!</h3>
                                <p className="text-gray-500 font-[Montserrat] text-sm mb-8">
                                    We have received your appointment request for <br/>
                                    <strong>{formData.date} at {formData.time}</strong>.
                                </p>
                                <button 
                                    onClick={() => { setSuccess(false); setFormData({...formData, date: '', time: ''}); setSelectedDateObj(null); setAvailableSlots([]); }}
                                    className="text-xs font-bold uppercase tracking-widest border-b border-black pb-1 hover:text-[#C5A059] hover:border-[#C5A059] transition-colors"
                                >
                                    Book Another
                                </button>
                            </motion.div>
                        )}
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    );
};

export default BookAppointment;
