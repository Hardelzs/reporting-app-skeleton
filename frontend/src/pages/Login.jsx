
import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login({ onLogin }) {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/api/auth/login', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ email, password })
    });
    const data = await res.json();
    if (data.token) {
      onLogin(data.user);
      if (data.user.role === 'lecturer') navigate('/lecturer');
      else if (data.user.role === 'prl') navigate('/prl');
      else if (data.user.role === 'pl') navigate('/pl');
      else navigate('/student');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h4>Login</h4>
        <form onSubmit={submit}>
          <div className="mb-2">
            <input className="form-control" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          </div>
          <div className="mb-2">
            <input type="password" className="form-control" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          </div>
          <button className="btn btn-primary">Login</button>
          <p>Don’t haave an account? <a href="/register">Register</a></p>
        </form>
      </div>
    </div>
  );
}
