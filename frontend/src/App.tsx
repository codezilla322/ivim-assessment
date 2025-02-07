import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.css";
import { NoteList, NoteDetail, NoteEdit } from "./components";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<NoteList />} />
        <Route path="/note/:id" element={<NoteDetail />} />
        <Route path="/create" element={<NoteEdit />} />
        <Route path="/edit/:id" element={<NoteEdit />} />
      </Routes>
    </Router>
  );
}

export default App;
