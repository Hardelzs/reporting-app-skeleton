
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register({ onRegister }) {
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [role,setRole] = useState('lecturer');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/auth/register', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ name, email, password, role })
    });
    const data = await res.json();
    if (data.token) {
      onRegister(data.user);
      if (data.user.role === 'lecturer') navigate('/lecturer');
      else if (data.user.role === 'prl') navigate('/prl');
      else if (data.user.role === 'pl') navigate('/pl');
      else navigate('/student');
    } else {
      alert(data.error || 'Registration failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h4>Register</h4>
        <form onSubmit={submit}>
          <div className="mb-2"><input className="form-control" placeholder="Name" value={name} onChange={e=>setName(e.target.value)} /></div>
          <div className="mb-2"><input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} /></div>
          <div className="mb-2"><input type="password" className="form-control" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} /></div>
          <div className="mb-2">
            <select className="form-select" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="student">Student</option>
              <option value="lecturer">Lecturer</option>
              <option value="prl">PRL</option>
              <option value="pl">PL</option>
            </select>
          </div>
          <button className="btn btn-success">Register</button>
          <p>Already a menember? <a href="/">Login</a></p>
        </form>
      </div>
    </div>
  );
}
