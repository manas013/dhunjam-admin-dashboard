import React, { useState } from 'react';
import AdminDashboard from './component/AdminDashboard';
import "./style/style.css"
import Login from './component/Login';

const App = () => {
  const authToken = localStorage.getItem("token")
  const [token, setToken] = useState(null);

  const handleLogin = (userToken) => {
    setToken(userToken);
    localStorage.setItem("token", userToken)
  };

  return (
    <div>
      {authToken || token ? <AdminDashboard token={token} /> : <Login onLogin={handleLogin} />}
      {/* <Login onLogin={handleLogin}/> */}
    </div>
  );
};

export default App;
