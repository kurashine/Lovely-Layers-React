import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/logic/useAuth";
import "./LoginPage.css";
import Button from "../../components/Buttons";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(username, password);

    if (success) {
      navigate("/admin/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <form className="login__form" onSubmit={handleSubmit}>
        <img
          alt="Logo"
          className="navigation__logo"
          src="/static/images/navbar-logo.svg"
        />
        <div className="login__form-field">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="login__form-field">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <Button
          type="submit"
          buttonProps={{ id: 1, label: "Login", styles: {} }}
        />
      </form>
      <div className="login__right" />
    </div>
  );
};

export default Login;
