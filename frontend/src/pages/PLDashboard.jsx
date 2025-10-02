
import React from 'react';

export default function PLDashboard({ user }) {
  return (
    <div>
      <h4>Program Leader (PL) Dashboard</h4>
      <p>Welcome, {user?.name || 'PL'}</p>
      <p>Minimal features: view reports (use PRL or Lecturer routes). Assigning courses can be added later.</p>
    </div>
  );
}
