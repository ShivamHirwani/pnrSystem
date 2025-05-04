
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = ({ token }) => {
  const [pnr, setPnr] = useState('');
  const [details, setDetails] = useState(null);

  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:5000/api/pnr/${pnr}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setDetails(res.data);
  };

  const markAbsent = async () => {
    await axios.put(`http://localhost:5000/api/pnr/${pnr}/status`, { status: 'absent' }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  const notifyNext = async () => {
    await axios.post(`http://localhost:5000/api/pnr/${pnr}/notify`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
  };

  return (
    <div>
      <input placeholder="PNR" value={pnr} onChange={(e) => setPnr(e.target.value)} />
      <button onClick={fetchDetails}>Fetch</button>
      {details && (
        <div>
          <p>Name: {details.name}</p>
          <p>Status: {details.status}</p>
          <button onClick={markAbsent}>Mark Absent</button>
          <button onClick={notifyNext}>Notify Next</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
