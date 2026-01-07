import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:5000/users/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate('/login');
      } else {
        setError(data.message || 'Registration failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-6 flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-lg">
            <h1 className="text-4xl font-serif text-center mb-2">Create Account</h1>
            <p className="text-center text-gray-500 mb-10">Join our bespoke family</p>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 text-sm text-center mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                     <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">First Name</label>
                        <div className="relative">
                            <input 
                                type="text"
                                name="firstName"
                                required 
                                className="w-full border border-gray-200 p-4 pl-12 text-sm focus:outline-none focus:border-[#C5A059]"
                                value={formData.firstName}
                                onChange={handleChange}
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Last Name</label>
                        <div className="relative">
                            <input 
                                type="text"
                                name="lastName"
                                required 
                                className="w-full border border-gray-200 p-4 pl-12 text-sm focus:outline-none focus:border-[#C5A059]"
                                value={formData.lastName}
                                onChange={handleChange}
                            />
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        </div>
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <div className="relative">
                        <input 
                            type="email"
                            name="email"
                            required 
                            className="w-full border border-gray-200 p-4 pl-12 text-sm focus:outline-none focus:border-[#C5A059]"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Phone Number</label>
                    <div className="relative">
                        <input 
                            type="tel" 
                            name="phone"
                            className="w-full border border-gray-200 p-4 pl-12 text-sm focus:outline-none focus:border-[#C5A059]"
                             value={formData.phone}
                            onChange={handleChange}
                        />
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                    <div className="relative">
                        <input 
                            type="password"
                            name="password"
                            required 
                            className="w-full border border-gray-200 p-4 pl-12 text-sm focus:outline-none focus:border-[#C5A059]"
                             value={formData.password}
                            onChange={handleChange}
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-black text-white p-4 font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-colors flex items-center justify-center gap-2"
                >
                    Create Account <ArrowRight size={18} />
                </button>
            </form>

            <div className="text-center mt-8 text-sm text-gray-500">
                Already have an account? <Link to="/login" className="text-black font-bold hover:underline">Sign In</Link>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
