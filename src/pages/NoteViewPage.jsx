import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { api } from "../api";
import { setError, setLoading, setNotes } from "../redux/actions";

const NoteViewPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const notes = useSelector((state) => state.notes);
  const error = useSelector((state) => state.error);
  const loading = useSelector((state) => state.loading);

  const note = notes.find((note) => note.id === id);

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) {
        dispatch(setError("ID заметки не найдено."));
        return;
      }

      dispatch(setLoading(true));

      try {
        const response = await api.get(`/notes/${id}`);
        dispatch(setNotes([response]));
      } catch (err) {
        if (err.response && err.response.status === 404) {
          dispatch(setError("Заметка не найдена."));
        } else {
          dispatch(setError("Произошла ошибка при взаимодействии с сервером."));
        }
      } finally {
        dispatch(setLoading(false));
      }
    };

    if (!note) {
      fetchNote();
    }
  }, [id, note, dispatch]);

  const handleExit = () => {
    navigate("/notes");
  };

  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={handleExit}>Вернуться к списку заметок</button>
      </div>
    );
  }

  if (loading) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className="note-view-page">
      {note ? (
        <>
          <h1>{note.title}</h1>
          <p>{note.content}</p>
          <p>{new Date(note.createdAt).toLocaleDateString()}</p>
        </>
      ) : (
        <p>Заметка не найдена.</p>
      )}
      <button onClick={handleExit}>Вернуться к списку заметок</button>
    </div>
  );
};

export default NoteViewPage;
