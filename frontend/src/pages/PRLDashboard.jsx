
import React, {useState, useEffect} from 'react';

export default function PRLDashboard({ user }) {
  const [reports, setReports] = useState([]);
  const [feedbacks, setFeedbacks] = useState({});

  useEffect(()=>{ fetchReports(); },[]);

  const fetchReports = async () => {
    const res = await fetch('http://localhost:5001/api/reports');
    const data = await res.json();
    setReports(data);
  };

  const sendFeedback = async (id) => {
    await fetch(`http://localhost:5001/api/reports/${id}/feedback`, {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({ feedback: feedbacks[id] || '' })
    });
    fetchReports();
  };

  return (
    <div>
      <h4>PRL Dashboard</h4>
      <p>Welcome, {user?.name || 'PRL'}</p>
      <table className="table">
        <thead><tr><th>ID</th><th>Course</th><th>Class</th><th>Topic</th><th>Actions</th></tr></thead>
        <tbody>
          {reports.map(r=>(
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.course_name || '-'}</td>
              <td>{r.class_name}</td>
              <td>{r.topic}</td>
              <td>
                <input className="form-control mb-1" placeholder="Feedback" value={feedbacks[r.id]||''} onChange={e=>setFeedbacks({...feedbacks, [r.id]: e.target.value})} />
                <button className="btn btn-sm btn-primary" onClick={()=>sendFeedback(r.id)}>Save Feedback</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
