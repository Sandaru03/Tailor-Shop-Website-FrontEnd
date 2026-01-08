import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Lock, Mail, ArrowRight } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        if (data.user.role === 'admin') {
            navigate('/admin');
        } else {
            navigate('/');
        }
      } else {
        setError(data.message || 'Login failed');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <div className="pt-32 pb-20 container mx-auto px-6 flex justify-center items-center min-h-[80vh]">
        <div className="w-full max-w-md">
            <h1 className="text-4xl font-serif text-center mb-2">Welcome Back</h1>
            <p className="text-center text-gray-500 mb-10">Sign in to manage your account</p>

            {error && (
                <div className="bg-red-50 text-red-600 p-4 text-sm text-center mb-6">
                    {error}
                </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Email Address</label>
                    <div className="relative">
                        <input 
                            type="email" 
                            required 
                            className="w-full border border-gray-200 p-4 pl-12 text-sm focus:outline-none focus:border-[#C5A059]"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                <div>
                    <label className="block text-xs font-bold uppercase tracking-widest text-gray-500 mb-2">Password</label>
                    <div className="relative">
                        <input 
                            type="password" 
                            required 
                            className="w-full border border-gray-200 p-4 pl-12 text-sm focus:outline-none focus:border-[#C5A059]"
                            placeholder="••••••••"
                             value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                </div>

                <button 
                    type="submit" 
                    className="w-full bg-black text-white p-4 font-bold uppercase tracking-[0.2em] hover:bg-[#C5A059] transition-colors flex items-center justify-center gap-2"
                >
                    Sign In <ArrowRight size={18} />
                </button>
            </form>

            <div className="text-center mt-8 text-sm text-gray-500">
                Don't have an account? <Link to="/register" className="text-black font-bold hover:underline">Register</Link>
            </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
