import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { UserAuth } from '../../context/AuthContext';

export default function Signup() {
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { createUser } = UserAuth();
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError({message: "Passwords don't match"});
      return;
    }

    try {
      await createUser(email, password);
      navigate("/");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleSignup}>
        <input
          type="email"
          autoComplete="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          autoComplete="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <input
          type="password"
          autoComplete="password"
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button type="submit">Sign up</button>
        {error && <span>{error.message}</span>}
        <p>Have an account? <Link to="/login">Log in</Link> instead</p>
      </form>
    </div>
  );
}
