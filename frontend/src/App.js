import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './App.css';
import Login from "./pages/Login";
import Album from "./pages/Album"; // Ensure the case matches the file name
import Playlist from "./pages/Playlist";
import AdminPage from "./admin/Adminpage"; // Ensure the case matches the file name

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/album" element={<Album />} />
        <Route path="/playlist" element={<Playlist />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;