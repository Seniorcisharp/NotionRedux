import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../redux/actions";
import bcrypt from "bcryptjs";
import { api } from "../api";

const LoginForm = ({ setUser }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const storedUserId = localStorage.getItem("userId");
      if (storedUserId) {
        const storedUser = await api.get(`users/${storedUserId}`);
        if (!storedUser) {
          localStorage.removeItem("userId");
          setErrorMessage("Неверный userId в localStorage.");
          return;
        }
      }

      const users = await api.get("/users");
      const user = users.find((u) => u.email === formData.email);

      if (!user) {
        setErrorMessage("Пользователь не найден.");
        return;
      }

      const passwordMatch = bcrypt.compareSync(formData.password, user.password);
      if (!passwordMatch) {
        setErrorMessage("Неверный пароль.");
        return;
      }

      localStorage.setItem("userId", user.id);
      setUser(user);
      navigate("/dashboard");
    } catch (error) {
      setErrorMessage("Произошла ошибка при входе.");
    }
  };

  return (
    <div className="login-form">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Пароль"
        />
        {errorMessage && <p className="error">{errorMessage}</p>}
        <button type="submit">Войти</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  setUser,
};

export default connect(null, mapDispatchToProps)(LoginForm);
