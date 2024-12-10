import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setError, updateNote } from "../redux/actions";
import { api } from "../api";

const EditNotePage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notes = useSelector((state) => state.notes);
  const error = useSelector((state) => state.error);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(false);

  const currentNote = notes.find((note) => String(note.id) === String(id));

  useEffect(() => {
    const fetchNote = async () => {
      if (currentNote) {
        setTitle(currentNote.title);
        setBody(currentNote.body);
        return;
      }

      try {
        const note = await api.get(`/notes/${id}`);
        setTitle(note.title);
        setBody(note.body);
      } catch (err) {
        dispatch(setError("Ошибка загрузки заметки."));
      }
    };

    fetchNote();
  }, [id, currentNote, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim()) {
      dispatch(setError("Название заметки не может быть пустым."));
      return;
    }

    const updatedNote = {
      ...currentNote,
      title,
      body,
      updatedAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      await api.put(`/notes/${currentNote.id}`, updatedNote);
      dispatch(updateNote(updatedNote));
      navigate("/notes");
    } catch (err) {
      dispatch(setError("Ошибка при обновлении заметки."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="edit-note-page">
      <h1>Редактирование заметки</h1>
      {error && <p className="error">{error}</p>}
      {loading && <p>Сохранение...</p>}
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
        <label>
          Тело заметки:
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Введите текст заметки"
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? "Сохранение..." : "Сохранить"}
        </button>
      </form>
      <button onClick={() => navigate("/notes")}>Назад</button>
    </div>
  );
};

export default EditNotePage;
