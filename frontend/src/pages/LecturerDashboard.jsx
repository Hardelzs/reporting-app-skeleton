
import React, {useState, useEffect} from 'react';

export default function LecturerDashboard({ user }) {
  const [report, setReport] = useState({ class_name:'', week:'', date:'', topic:'', outcomes:'', recommendations:'', students_present:0, total_students:0, venue:'', time:'', course_id: null });
  const [reports, setReports] = useState([]);

  useEffect(()=>{ fetchReports(); },[]);

  const fetchReports = async () => {
    const res = await fetch('http://localhost:5001/api/reports');
    const data = await res.json();
    setReports(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch('http://localhost:5001/api/reports', {
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(report)
    });
    setReport({ class_name:'', week:'', date:'', topic:'', outcomes:'', recommendations:'', students_present:0, total_students:0, venue:'', time:'', course_id: '' });
    fetchReports();
  };

  return (
    <div>
      <h4>Lecturer Dashboard</h4>
      <p>Welcome, {user?.name || 'Lecturer'}</p>
      <div className="card p-3 mb-3">
        <h5>Submit Report</h5>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col"><input className="form-control" placeholder="Class Name" value={report.class_name} onChange={e=>setReport({...report, class_name:e.target.value})} /></div>
            <div className="col"><input className="form-control" placeholder="Week" value={report.week} onChange={e=>setReport({...report, week:e.target.value})} /></div>
            <div className="col"><input type="date" className="form-control" value={report.date} onChange={e=>setReport({...report, date:e.target.value})} /></div>
          </div>
          <div className="mt-2"><input className="form-control" placeholder="Course" value={report.course_id} onChange={e=>setReport({...report, topic:e.target.value})} /></div>
          <div className="mt-2"><input className="form-control" placeholder="Topic" value={report.topic} onChange={e=>setReport({...report, topic:e.target.value})} /></div>
          <div className="mt-2"><textarea className="form-control" placeholder="Learning Outcomes" value={report.outcomes} onChange={e=>setReport({...report, outcomes:e.target.value})}></textarea></div>
          <div className="mt-2"><textarea className="form-control" placeholder="Recommendations" value={report.recommendations} onChange={e=>setReport({...report, recommendations:e.target.value})}></textarea></div>
          <div className="mt-2"><input className="form-control" placeholder="Venue" value={report.venue} onChange={e=>setReport({...report, venue:e.target.value})} /></div>
          <div className="mt-2"><input className="form-control" placeholder="Time" value={report.time} onChange={e=>setReport({...report, time:e.target.value})} /></div>
          <div className="mt-2 row">
            <label htmlFor="">Students Presents</label>
            <div className="col"><input type="number" className="form-control" placeholder="Students Present" value={report.students_present} onChange={e=>setReport({...report, students_present:parseInt(e.target.value||0)})} /></div>
            <label htmlFor="">Total Student</label>
            <div className="col"><input type="number" className="form-control" placeholder="Total Registered" value={report.total_students} onChange={e=>setReport({...report, total_students:parseInt(e.target.value||0)})} /></div>
          </div>
          <button className="btn btn-primary mt-2">Submit Report</button>
        </form>
      </div>

      <h5>Your Reports</h5>
      <table className="table table-striped">
        <thead><tr><th>ID</th><th>Class</th><th>Week</th><th>Date</th><th>Topic</th><th>Feedback</th></tr></thead>
        <tbody>
          {reports.map(r=>(
            <tr key={r.id}><td>{r.id}</td><td>{r.class_name}</td><td>{r.week}</td><td>{r.date}</td><td>{r.topic}</td><td>{r.feedback || '-'}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
