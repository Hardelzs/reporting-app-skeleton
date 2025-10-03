import { useEffect, useState } from "react";

export default function StudentDashboard() {
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const res = await fetch("http://localhost:5001/api/reports");
        const data = await res.json();
        setReports(data);
      } catch (err) {
        console.error("Failed to load reports", err);
      }
    };
    fetchReports();
  }, []);

  return (
    <div className="container mt-5">
      <h2>Reports</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Course</th>
            <th>Week</th>
            <th>Date</th>
            <th>Class Name</th>
            <th>Present</th>
            <th>Total</th>
            <th>Topic</th>
            <th>Outcomes</th>
            <th>Recommendations</th>
            <th>Feedback</th>
          </tr>
        </thead>
        <tbody>
          {reports.map(r => (
            <tr key={r.id}>
              <td>{r.course_name} ({r.course_code})</td>
              <td>{r.week}</td>
              <td>{r.date}</td>
              <td>{r.class_name}</td>
              <td>{r.students_present}</td>
              <td>{r.total_students}</td>
              <td>{r.topic}</td>
              <td>{r.outcomes}</td>
              <td>{r.recommendations}</td>
              <td>{r.feedback || "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
