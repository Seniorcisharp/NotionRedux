import React from "react";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
 
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>404 - Страница не найдена</h1>
      <p>Извините, но такой страницы не существует.</p>
      {isAuthenticated ? (
        <div>
          <p>Перейдите на <Link to="/dashboard">Главную страницу</Link></p>
        </div>
      ) : (
        <div>
          <p>Перейдите на <Link to="/login">Вход</Link></p>
        </div>
      )}
    </div>
  );
};

export default NotFoundPage;
