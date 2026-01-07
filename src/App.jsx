import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import OnlineMeasurements from './pages/OnlineMeasurements/OnlineMeasurements';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminDashboard from './pages/Admin/AdminDashboard'; // Will implement next

import Collection from './pages/Collection/Collection';
import About from './pages/About/About';
import BookAppointment from './pages/Appointment/BookAppointment';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collections" element={<Collection />} />
        <Route path="/measurements" element={<OnlineMeasurements />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/appointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
