import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <div>
      <h1>Добро пожаловать на наш сайт!</h1>
      <p>Выберите одно из следующих действий:</p>
      <nav>
        {!user ? (
          <>
            <Link to="/register">Зарегистрироваться</Link> |{" "}
            <Link to="/login">Войти</Link> |{" "}
            <Link to="/notes">Заметки</Link>
          </>
        ) : (
          <>
            <Link to="/notes">Заметки</Link> |{" "}
            <button onClick={handleLogout} className="logout-button">
              Выйти
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default HomePage;
