import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../superbase/config";

function Register() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password, role } = formData;

    if (!email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      const userId = authData.user.id;
      const { error: insertError } = await supabase.from('users').insert([
        { id: userId, email, role }
      ]);

      if (insertError) {
        setError(insertError.message);
        return;
      }

      setSuccess('Registration successful!');
      setFormData({ email: '', password: '', role: 'user' });

      setTimeout(() => {
        navigate("/login?from=register");
      }, 1000);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" name="email" required onChange={handleChange} />

        <label>Password</label>
        <input type="password" name="password" required onChange={handleChange} />

        <label>Role</label>
        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
