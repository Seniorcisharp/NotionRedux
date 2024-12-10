import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote, setError, setLoading } from "../redux/actions";
import { api } from "../api";

const CreateNotePage = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, error, loading } = useSelector((state) => state);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      dispatch(setError("Название заметки не может быть пустым."));
      return;
    }

    const newNote = {
      title,
      body,
      createdAt: new Date().toISOString(),
      userId: user.id,
    };

    dispatch(setLoading(true));

    try {
      const savedNote = await api.post("/notes", newNote);
      dispatch(addNote(savedNote));
      navigate("/notes");
    } catch (err) {
      dispatch(setError("Ошибка при сохранении заметки. Попробуйте еще раз."));
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div className="create-note-page">
      <h1>Создание новой заметки</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Название заметки:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название"
          />
        </label>
        {error && <p className="error">{error}</p>}

        <label>
          Тело заметки:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Введите текст (не обязательно)"
          />
        </label>

        <button type="submit" disabled={loading}>
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>

      <button onClick={() => navigate("/notes")}>Назад</button>
    </div>
  );
};

export default CreateNotePage;
