import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../hooks/AuthContext';
import { ThemeContext } from '../hooks/ThemeContext';

const Header = () => {
  const { role } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <header className="navbar">
      <div className="logo">Job Portal</div>
      <nav className="nav-links" id="navLinks">
        <Link to="/">Home</Link>

        {role === 'admin' && (
          <>
            <Link to="/admin/jobs">Admin Panel</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}

        {role === 'user' && (
          <>
            <Link to="/jobs">Job List</Link>
            <Link to="/logout">Logout</Link>
          </>
        )}

        {!role && (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}

        <button onClick={toggleTheme} className="theme-toggle">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>
    </header>
  );
};

export default Header;
