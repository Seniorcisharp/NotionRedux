import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setError, setLoading } from "../redux/actions";
import { api } from "../api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, error, loading } = useSelector((state) => state);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        navigate("/login");
        return;
      }

      dispatch(setLoading(true));

      try {
        const userData = await api.get(`users/${userId}`);
        dispatch(setUser(userData));
      } catch (err) {
        dispatch(setError("Ошибка при загрузке данных пользователя."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchUserData();
  }, [dispatch, navigate]);

  

  if (loading) {
    return <div>Загрузка...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!user) {
    return <div>Пользователь не найден</div>;
  }

  return (
    <div className="dashboard">
      <h2>Личный кабинет</h2>
      <p><strong>Имя:</strong> {user.name}</p>
      <p><strong>Возраст:</strong> {user.age}</p>
      <p><strong>Пол:</strong> {user.gender}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Дата регистрации:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>

      <div className="actions">
        <button onClick={() => navigate("/notes")} className="notes-button">
          Перейти к заметкам
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
