
import React, { useState } from 'react';
import axios from 'axios';

const LoginPage = ({ setToken }) => {
  const [employeeNumber, setEmployeeNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/tc/login', { employeeNumber, password });
      setToken(response.data.token);
    } catch {
      alert('Login failed');
    }
  };

  return (
    <div>
      <input placeholder="Employee Number" value={employeeNumber} onChange={(e) => setEmployeeNumber(e.target.value)} />
      <input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
