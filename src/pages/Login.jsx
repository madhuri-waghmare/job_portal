
import React, { useState, useContext } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../hooks/AuthContext";
import { supabase } from "../superbase/config";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError(authError.message);
      return;
    }

    const user = authData.user;
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .select('role')
      .eq('id', user.id)
      .single();

    if (profileError) {
      setError("Failed to fetch user role.");
      return;
    }

    const role = profileData.role;
    login(role); 

    if (role === 'admin') {
      navigate('/admin/jobs');
    } else {
      navigate('/');
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
