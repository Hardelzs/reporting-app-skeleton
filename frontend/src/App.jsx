import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import LecturerDashboard from "./pages/LecturerDashboard";
import PRLDashboard from "./pages/PRLDashboard";
import PLDashboard from "./pages/PLDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import { useState } from "react";

function App() {
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);

  const handleLogin = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };
    const handleRegister = (user, token) => {
    setUser(user);
    localStorage.setItem("token", token);
  };
  return (
    <Routes>
      <Route path="/" element={<Login onLogin={handleLogin} />} />
      <Route path="/register" element={<Register onRegister={handleRegister}/>} />


      <Route path="/lecturer" element={<LecturerDashboard />} />
      <Route path="/prl" element={<PRLDashboard />} />
      <Route path="/pl" element={<PLDashboard />} />
      <Route path="/student" element={<StudentDashboard />} />
    </Routes>
  );
}

export default App;
