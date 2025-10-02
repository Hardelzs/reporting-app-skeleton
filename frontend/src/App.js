
import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import LecturerDashboard from './pages/LecturerDashboard';
import PRLDashboard from './pages/PRLDashboard';
import PLDashboard from './pages/PLDashboard';
import StudentDashboard from './pages/StudentDashboard';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">ReportingApp</Link>
          <div>
            <Link className="btn btn-outline-primary me-2" to="/login">Login</Link>
            <Link className="btn btn-outline-secondary" to="/register">Register</Link>
          </div>
        </div>
      </nav>
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home user={user} />} />
          <Route path="/login" element={<Login onLogin={setUser} />} />
          <Route path="/register" element={<Register onRegister={setUser} />} />
          <Route path="/lecturer" element={user ? <LecturerDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/prl" element={user ? <PRLDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/pl" element={user ? <PLDashboard user={user} /> : <Navigate to="/login" />} />
          <Route path="/student" element={user ? <StudentDashboard user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

function Home({user}) {
  return (
    <div>
      <h3>Welcome to the Minimal Reporting App</h3>
      <p>Use Login / Register to continue. After logging in you'll be redirected to the appropriate dashboard URL (lecturer, prl, pl, student).</p>
    </div>
  );
}

export default App;
