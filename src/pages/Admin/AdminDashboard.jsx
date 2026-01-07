import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Play, Trash, UserPlus, Shield, ShieldOff, Check, X } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('measurements');
  const [measurements, setMeasurements] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedVideos, setSelectedVideos] = useState(null); // { front, back }
  const [error, setError] = useState(null);

  // Auth Check
  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));

    if (!token || !user || user.role !== 'admin') {
      navigate('/login');
    }
  }, [navigate]);

  // Fetch Data
  useEffect(() => {
    const loadData = async () => {
        setLoading(true);
        setError(null);
        try {
            await Promise.all([
                fetchMeasurements(),
                fetchUsers(),
                fetchAppointments()
            ]);
        } catch (err) {
            setError("Failed to load data.");
            console.error("Failed to load data:", err);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, []);

  const fetchMeasurements = async () => {
    try {
      const res = await fetch('http://localhost:5000/measurements');
      const data = await res.json();
      setMeasurements(data);
    } catch (err) {
      console.error("Failed to fetch measurements");
    } finally {
      setLoading(false);
    }
  };

  const fetchAppointments = async () => {
      try {
          const res = await fetch('http://localhost:5000/appointments');
          const data = await res.json();
          setAppointments(data);
      } catch (err) {
          console.error("Failed to fetch appointments");
      }
  };

  const fetchUsers = async () => {
      try {
          const res = await fetch('http://localhost:5000/users/all-users', {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
          });
          const data = await res.json();
          if (Array.isArray(data)) {
            setUsers(data);
          }
      } catch (err) {
          console.error("Failed to fetch users");
      }
  };

  const deleteMeasurement = async (id) => {
      if(!confirm("Are you sure?")) return;
      try {
          await fetch(`http://localhost:5000/measurements/${id}`, { method: 'DELETE' });
          fetchMeasurements();
      } catch (err) {
          console.error("Failed to delete");
      }
  }

  const toggleAdminRole = async (userId, currentRole) => {
      const newRole = currentRole === 'admin' ? 'customer' : 'admin';
      try {
           await fetch(`http://localhost:5000/users/${userId}/role`, {
               method: 'PUT',
               headers: { 
                   'Content-Type': 'application/json',
                   'Authorization': `Bearer ${localStorage.getItem('token')}`
               },
               body: JSON.stringify({ role: newRole })
           });
           fetchUsers();
      } catch (err) {
          console.error("Failed to update role");
      }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main className="pt-32 pb-20 container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h1 className="text-3xl font-serif">Admin Dashboard</h1>
            <div className="flex flex-wrap gap-2 bg-white p-1 rounded-lg border border-gray-200">
                {['measurements', 'appointments', 'admins'].map(tab => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`px-4 py-2 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${
                            activeTab === tab ? 'bg-black text-white' : 'text-gray-500 hover:text-black'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>

        {/* Measurement Video Modal */}
        {selectedVideos && (
            <div className="fixed inset-0 z-[60] bg-black/90 flex items-center justify-center p-4">
                <button 
                    onClick={() => setSelectedVideos(null)}
                    className="absolute top-8 right-8 text-white hover:text-red-500"
                >
                    <X size={32} />
                </button>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-6xl">
                    {selectedVideos.front && (
                        <div>
                            <h3 className="text-white text-center mb-2 font-bold uppercase">Front View</h3>
                            <video src={`http://localhost:5000/${selectedVideos.front}`} controls className="w-full rounded-lg bg-black border border-white/20" />
                        </div>
                    )}
                    {selectedVideos.back && (
                        <div>
                            <h3 className="text-white text-center mb-2 font-bold uppercase">Back View</h3>
                            <video src={`http://localhost:5000/${selectedVideos.back}`} controls className="w-full rounded-lg bg-black border border-white/20" />
                        </div>
                    )}
                </div>
            </div>
        )}

        {loading ? (
            <div className="text-center py-20 text-gray-500">Loading data...</div>
        ) : error ? (
            <div className="text-center py-20 text-red-500">Error: {error}</div>
        ) : (
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden p-6">
                
                {/* MEASUREMENTS TAB */}
                {activeTab === 'measurements' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Date</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Customer</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Contact</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Summary</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Videos</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {measurements.map(item => (
                                    <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 text-sm text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</td>
                                        <td className="p-4 font-bold">{item.name}</td>
                                        <td className="p-4 text-sm text-gray-500">{item.phone}</td>
                                        <td className="p-4 text-xs space-y-1">
                                            <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                                                {Object.entries(item.measurements || {}).map(([key, value]) => (
                                                    value && (
                                                        <span key={key} className="capitalize">
                                                            <span className="text-gray-400 font-medium">{key}:</span> {value}
                                                        </span>
                                                    )
                                                ))}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {(item.videoFront || item.videoBack) ? (
                                                <button 
                                                    onClick={() => setSelectedVideos({ front: item.videoFront, back: item.videoBack })}
                                                    className="flex items-center gap-2 text-[#C5A059] hover:text-black font-bold text-xs uppercase"
                                                >
                                                    <Play size={14} /> Play
                                                </button>
                                            ) : (
                                                <span className="text-gray-300 text-xs">No Video</span>
                                            )}
                                        </td>
                                        <td className="p-4 text-right">
                                            <button 
                                                onClick={() => deleteMeasurement(item._id)}
                                                className="text-gray-400 hover:text-red-500 p-2"
                                            >
                                                <Trash size={16} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                                {measurements.length === 0 && (
                                    <tr>
                                        <td colSpan="6" className="p-8 text-center text-gray-400">No measurements submitted yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* APPOINTMENTS TAB */}
                {activeTab === 'appointments' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Date & Time</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Customer</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Contact</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Garment</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400 min-w-[100px]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {appointments.map(apt => (
                                    <tr key={apt._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-bold">
                                            <div className="text-sm">{apt.date}</div>
                                            <div className="text-[#C5A059] text-xs">{apt.time}</div>
                                        </td>
                                        <td className="p-4 font-medium">{apt.customerName}</td>
                                        <td className="p-4 text-sm text-gray-500">{apt.contactNumber}</td>
                                        <td className="p-4 text-sm font-bold uppercase tracking-wider">{apt.garmentType}</td>
                                        <td className="p-4">
                                            <span className="bg-green-100 text-green-600 px-2 py-1 rounded text-[10px] font-bold uppercase">
                                                Confirmed
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {appointments.length === 0 && (
                                    <tr>
                                        <td colSpan="5" className="p-8 text-center text-gray-400">No appointments booked yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}



                {/* ADMINS TAB */}
                {activeTab === 'admins' && (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100">
                                <tr>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">User</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Email</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400">Current Role</th>
                                    <th className="p-4 text-xs font-bold uppercase text-gray-400 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {users.map(user => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition-colors">
                                        <td className="p-4 font-bold">{user.firstName} {user.lastName}</td>
                                        <td className="p-4 text-sm text-gray-500">{user.email}</td>
                                        <td className="p-4">
                                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase ${user.role === 'admin' ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            {user.role === 'admin' ? (
                                                <button 
                                                    onClick={() => toggleAdminRole(user._id, 'admin')}
                                                    className="flex items-center gap-2 ml-auto text-red-500 hover:bg-red-50 px-3 py-1 rounded text-xs font-bold uppercase transition-colors"
                                                    title="Remove Admin Access"
                                                >
                                                    <ShieldOff size={14} /> Revoke
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => toggleAdminRole(user._id, 'customer')}
                                                    className="flex items-center gap-2 ml-auto text-green-600 hover:bg-green-50 px-3 py-1 rounded text-xs font-bold uppercase transition-colors"
                                                    title="Make Admin"
                                                >
                                                    <Shield size={14} /> Promote
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AdminDashboard;
