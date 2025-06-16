import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [role, setRole] = useState(null);
  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);
console.log('8888', role)
  return (
    <header className="navbar">
      <h1>Job Portal</h1>
      <nav className="nav-links" id="navLinks">
        {role === "admin" || role === "user" ? <>
          <Link to="/">Home</Link>
          <Link to="/logout">Logout</Link>
        </> : <><Link to="/">Home</Link>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
          </>
        }
      </nav>
    </header>
  )
}

export default Header;
