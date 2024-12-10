import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux"; 
import { store } from "../redux/store";
import HomePage from "../pages/HomePage";
import RegistrationForm from "../components/RegistrationForm";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Notes from "../pages/NotesPage";
import EditNotePage from "../pages/EditNotePage";
import NoteViewPage from "../pages/NoteViewPage";
import CreateNotePage from "../pages/CreateNotePage";
import NotFoundPage from "../pages/404Page";

const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/notes/edit/:id" element={<EditNotePage />} />
          <Route path="/notes/view/:id" element={<NoteViewPage />} />
          <Route path="/notes/create" element={<CreateNotePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
};

export default App;
