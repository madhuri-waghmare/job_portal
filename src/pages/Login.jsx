import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../Firebase";
import { doc, getDoc } from 'firebase/firestore';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'user_profile', user.uid));
      const role =userDoc.data().role;
      console.log("******8", role)
      if (role === 'admin') {
        localStorage.setItem("userRole", "admin");
        navigate('/admin/jobs');
      } else if (role === 'user') {
        localStorage.setItem("userRole", "user");
        navigate('/jobs');
      }
      return userDoc.data().role;
      
    } catch (err) {

      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin} className="container">
      <h2>Login</h2>
      <div className="mb-3">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          className="form-control"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary">Login</button>
      {error && <p className="text-danger">{error}</p>}
    </form>
  );
}

export default Login;