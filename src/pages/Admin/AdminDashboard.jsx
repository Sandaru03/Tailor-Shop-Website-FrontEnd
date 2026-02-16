import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Play, Trash, UserPlus, Shield, ShieldOff, Check, X, Pencil } from 'lucide-react';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('measurements');
  const [measurements, setMeasurements] = useState([]);
  const [users, setUsers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [selectedVideos, setSelectedVideos] = useState(null); // { front, back }
  const [error, setError] = useState(null);
  
  // Product State
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({
      title: '', category: 'Hair & Skin Care', year: new Date().getFullYear().toString()
  });
  const [productImage, setProductImage] = useState(null);
  const [notification, setNotification] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

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
                fetchAppointments(),
                fetchProducts()
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
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/measurements`);
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
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/appointments`);
          const data = await res.json();
          setAppointments(data);
      } catch (err) {
          console.error("Failed to fetch appointments");
      }
  };

  const fetchUsers = async () => {
      try {
          const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/all-users`, {
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

  const fetchProducts = async () => {
    try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/products`);
        const data = await res.json();
        setProducts(data);
    } catch (err) {
        console.error("Failed to fetch products");
    }
  };

  const handleAddOrUpdateProduct = async (e) => {
      e.preventDefault();
      // For adding, image is required. For updating, it's optional.
      if (!editingProduct && !productImage) return alert("Please select an image");

      const formData = new FormData();
      formData.append('title', newProduct.title);
      formData.append('category', newProduct.category);
      formData.append('year', newProduct.year);
      if (productImage) {
        formData.append('image', productImage);
      }

      try {
          let url = `${import.meta.env.VITE_BACKEND_URL}/products`;
          let method = 'POST';

          if (editingProduct) {
             url = `${import.meta.env.VITE_BACKEND_URL}/products/${editingProduct.id}`;
             method = 'PUT';
          }

          const res = await fetch(url, {
              method: method,
              body: formData // No Content-Type header for FormData
          });
          
          if (res.ok) {
              setNotification(editingProduct ? "Product updated successfully" : "Product added successfully");
              setNewProduct({ title: '', category: 'Hair & Skin Care', year: new Date().getFullYear().toString() });
              setProductImage(null);
              setEditingProduct(null);
              fetchProducts();
              setTimeout(() => setNotification(null), 3000);
          } else {
              alert("Failed to save product");
          }
      } catch (err) {
          console.error("Error saving product:", err);
      }
  };

  const startEditing = (product) => {
    setEditingProduct(product);
    setNewProduct({
        title: product.title,
        category: product.category,
        year: product.year
    });
    setProductImage(null); 
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const cancelEditing = () => {
    setEditingProduct(null);
    setNewProduct({ title: '', category: 'Hair & Skin Care', year: new Date().getFullYear().toString() });
    setProductImage(null);
  };

  const deleteProduct = async (id) => {
      if(!confirm("Delete this product?")) return;
      try {
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/products/${id}`, { method: 'DELETE' });
          fetchProducts();
      } catch (err) {
          console.error("Failed to delete product");
      }
  };

  const deleteMeasurement = async (id) => {
      if(!confirm("Are you sure?")) return;
      try {
          await fetch(`${import.meta.env.VITE_BACKEND_URL}/measurements/${id}`, { method: 'DELETE' });
          fetchMeasurements();
      } catch (err) {
          console.error("Failed to delete");
      }
  }

  const toggleAdminRole = async (userId, currentRole) => {
      const newRole = currentRole === 'admin' ? 'customer' : 'admin';
      try {
           await fetch(`${import.meta.env.VITE_BACKEND_URL}/users/${userId}/role`, {
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
            {notification && (
                <div className="bg-green-100 text-green-700 px-4 py-2 rounded-md text-sm font-bold">
                    {notification}
                </div>
            )}
            <div className="flex flex-wrap gap-2 bg-white p-1 rounded-lg border border-gray-200">
                {['measurements', 'appointments', 'products', 'admins'].map(tab => (
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
            <div className="fixed inset-0 z-60 bg-black/90 flex items-center justify-center p-4">
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
                            <video 
                                src={selectedVideos.front.startsWith('http') ? selectedVideos.front : `${import.meta.env.VITE_BACKEND_URL}/${selectedVideos.front}`} 
                                controls 
                                playsInline
                                preload="metadata"
                                className="w-full rounded-lg bg-black border border-white/20" 
                            />
                        </div>
                    )}
                    {selectedVideos.back && (
                        <div>
                            <h3 className="text-white text-center mb-2 font-bold uppercase">Back View</h3>
                            <video 
                                src={selectedVideos.back.startsWith('http') ? selectedVideos.back : `${import.meta.env.VITE_BACKEND_URL}/${selectedVideos.back}`} 
                                controls 
                                playsInline
                                preload="metadata"
                                className="w-full rounded-lg bg-black border border-white/20" 
                            />
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
                                    <tr key={item.id} className="hover:bg-gray-50 transition-colors">
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
                                                onClick={() => deleteMeasurement(item.id)}
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
                                    <tr key={apt.id} className="hover:bg-gray-50 transition-colors">
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
                                    <tr key={user.id} className="hover:bg-gray-50 transition-colors">
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
                                                    onClick={() => toggleAdminRole(user.id, 'admin')}
                                                    className="flex items-center gap-2 ml-auto text-red-500 hover:bg-red-50 px-3 py-1 rounded text-xs font-bold uppercase transition-colors"
                                                    title="Remove Admin Access"
                                                >
                                                    <ShieldOff size={14} /> Revoke
                                                </button>
                                            ) : (
                                                <button 
                                                    onClick={() => toggleAdminRole(user.id, 'customer')}
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

                {/* PRODUCTS TAB */}
                {activeTab === 'products' && (
                    <div className="p-6">
                        {/* Add Product Form */}
                        <div className="mb-8 p-6 bg-gray-50 rounded-lg border border-gray-100 relative">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-bold">
                                    {editingProduct ? 'Edit Product' : 'Add New Product'}
                                </h3>
                                {editingProduct && (
                                    <button 
                                        onClick={cancelEditing}
                                        className="text-xs text-red-500 hover:text-red-700 underline"
                                    >
                                        Cancel Edit
                                    </button>
                                )}
                            </div>
                            <form onSubmit={handleAddOrUpdateProduct} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Title</label>
                                    <input 
                                        type="text" 
                                        value={newProduct.title}
                                        onChange={(e) => setNewProduct({...newProduct, title: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Category</label>
                                    <select 
                                        value={newProduct.category}
                                        onChange={(e) => setNewProduct({...newProduct, category: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                    >
                                        <option value="Hair & Skin Care">Hair & Skin Care</option>
                                        <option value="Ladies Fashion">Ladies Fashion</option>
                                        <option value="Gents Fashion">Gents Fashion</option>
                                        <option value="Bridal & Party Wear">Bridal & Party Wear</option>
                                        <option value="Accessories & Cosmetics">Accessories & Cosmetics</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Year</label>
                                    <input 
                                        type="text" 
                                        value={newProduct.year}
                                        onChange={(e) => setNewProduct({...newProduct, year: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold uppercase text-gray-400 mb-1">Image</label>
                                    <input 
                                        type="file" 
                                        accept="image/*"
                                        onChange={(e) => setProductImage(e.target.files[0])}
                                        className="w-full text-xs"
                                        required={!editingProduct}
                                    />
                                </div>
                                <button 
                                    type="submit"
                                    className="bg-black text-white px-4 py-2 font-bold uppercase text-xs rounded hover:bg-[#C5A059] transition-colors h-10"
                                >
                                    {editingProduct ? 'Update' : 'Add Product'}
                                </button>
                            </form>
                        </div>

                        {/* Product List */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="p-4 text-xs font-bold uppercase text-gray-400">Image</th>
                                        <th className="p-4 text-xs font-bold uppercase text-gray-400">Title</th>
                                        <th className="p-4 text-xs font-bold uppercase text-gray-400">Category</th>
                                        <th className="p-4 text-xs font-bold uppercase text-gray-400">Year</th>
                                        <th className="p-4 text-xs font-bold uppercase text-gray-400 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {products.map(product => (
                                        <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                                            <td className="p-4">
                                                <img 
                                                    src={product.image.startsWith('http') ? product.image : `${import.meta.env.VITE_BACKEND_URL}/${product.image}`} 
                                                    alt={product.title} 
                                                    className="w-12 h-16 object-cover rounded"
                                                />
                                            </td>
                                            <td className="p-4 font-bold">{product.title}</td>
                                            <td className="p-4 text-sm text-gray-500">{product.category}</td>
                                            <td className="p-4 text-sm text-gray-500">{product.year}</td>
                                            <td className="p-4 text-right flex justify-end gap-2">
                                                <button 
                                                    onClick={() => startEditing(product)}
                                                    className="text-gray-400 hover:text-[#C5A059] p-2"
                                                    title="Edit"
                                                >
                                                    <Pencil size={16} />
                                                </button>
                                                <button  
                                                    onClick={() => deleteProduct(product.id)}
                                                    className="text-gray-400 hover:text-red-500 p-2"
                                                >
                                                    <Trash size={16} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {products.length === 0 && (
                                        <tr>
                                            <td colSpan="5" className="p-8 text-center text-gray-400">No products added yet.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
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
