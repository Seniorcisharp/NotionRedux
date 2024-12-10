import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setNotes, setError, setLoading, deleteNote } from "../redux/actions";
import { api } from "../api";
import "../css/NotesPage.css";

const NotesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notes = useSelector((state) => state.notes);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchNotes = async () => {
      dispatch(setLoading(true));
      const userId = localStorage.getItem("userId");
      if (!userId) {
        navigate("/login");
        return;
      }

      try {
        const fetchedNotes = await api.get("/notes");
        const userNotes = fetchedNotes.filter((note) => note.userId === userId);
        dispatch(setNotes(userNotes));
      } catch (err) {
        dispatch(setError("Ошибка загрузки заметок."));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchNotes();
  }, [dispatch, navigate]);

  const handleDelete = async (id) => {
    if (window.confirm("Вы уверены, что хотите удалить эту заметку?")) {
      dispatch(deleteNote(id)); 

      try {
        await api.delete(`/notes/${id}`);
      } catch (err) {
        dispatch(setError("Ошибка при удалении заметки."));
        const noteToRestore = notes.find((note) => note.id === id);
        dispatch(setNotes([...notes, noteToRestore]));
      }
    }
  };

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="notes-page">
      <h1>Мои заметки</h1>
      {loading && <p>Загрузка...</p>}
      {error && <p className="error">{error}</p>}

      <input
        type="text"
        placeholder="Поиск заметок"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <div>
        <Link to="/notes/create" className="button">
          Создать новую заметку 
        </Link>
        <Link to="/" className="button">
          | На главную
        </Link>
      </div>

      {filteredNotes.length === 0 ? (
        <p>Заметок не найдено.</p>
      ) : (
        <ul>
          {filteredNotes.map((note) => (
            <li key={note.id}>
              <div>
                <strong>{note.title}</strong>
                <span>({new Date(note.createdAt).toLocaleDateString()})</span>
              </div>
              <div>
                <button onClick={() => navigate(`/notes/view/${note.id}`)}>👀</button>
                <button onClick={() => navigate(`/notes/edit/${note.id}`)}>✍️</button>
                <button onClick={() => handleDelete(note.id)}>🗑</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NotesPage;