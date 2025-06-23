import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { setRole } = useContext(AuthContext); 

  useEffect(() => {
    localStorage.removeItem('role');
    setRole(null); 
    const timer = setTimeout(() => {
      navigate('/login');
    }, 1500);

    return () => clearTimeout(timer);
  }, [navigate, setRole]);

  return (
    <main>
      <section className="hero">
        <h1>Logout Successful</h1>
        <p>Redirecting to login...</p>
      </section>
    </main>
  );
};

export default Logout;
