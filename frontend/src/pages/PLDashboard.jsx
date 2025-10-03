import { useState, useEffect } from "react";

export default function PLDashboard({ user }) {
  const [courses, setCourses] = useState([]);
  const [reports, setReports] = useState([]);
  const [form, setForm] = useState({
    faculty: "",
    course_name: "",
    course_code: "",
    lecturer_id: ""
  });

  // Fetch courses
  const loadCourses = async () => {
    const res = await fetch("http://localhost:5001/api/courses");
    const data = await res.json();
    setCourses(data);
  };

  // Fetch reports
  const loadReports = async () => {
    const res = await fetch("http://localhost:5001/api/reports");
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    loadCourses();
    loadReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5001/api/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ faculty: "", course_name: "", course_code: "", lecturer_id: "" });
    loadCourses();
  };

  return (
    <div className="container mt-5">
      <h3>Program Leader (PL) Dashboard</h3>
      <p>Welcome, {user?.name || "PL"}</p>

      {/* Assign Course Form */}
      <h4>Assign Module to Lecturer</h4>
      <form onSubmit={handleSubmit} className="mb-4">
        <input
          className="form-control mb-2"
          placeholder="Faculty"
          value={form.faculty}
          onChange={(e) => setForm({ ...form, faculty: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Course Name"
          value={form.course_name}
          onChange={(e) => setForm({ ...form, course_name: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Course Code"
          value={form.course_code}
          onChange={(e) => setForm({ ...form, course_code: e.target.value })}
        />
        <input
          className="form-control mb-2"
          placeholder="Lecturer ID"
          value={form.lecturer_id}
          onChange={(e) => setForm({ ...form, lecturer_id: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">Assign</button>
      </form>

      {/* Courses List */}
      <h4>Assigned Courses</h4>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Faculty</th>
            <th>Course</th>
            <th>Code</th>
            <th>Lecturer</th>
          </tr>
        </thead>
        <tbody>
          {courses.map(c => (
            <tr key={c.id}>
              <td>{c.faculty}</td>
              <td>{c.course_name}</td>
              <td>{c.course_code}</td>
              <td>{c.lecturer_name || "Unassigned"}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Reports View */}
      <h4 className="mt-4">Reports from PRL</h4>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Course</th>
            <th>Week</th>
            <th>Date</th>
            <th>Class</th>
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
              <td>{r.course_name}</td>
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
