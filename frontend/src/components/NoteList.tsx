import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Note from "../types/Note";
import { getNotes } from "../lib/api";

export default function NoteList() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const fetchNotes = async () => {
      const response = await getNotes();
      setNotes(response.data);
    };
    fetchNotes();
  }, []);

  return (
    <div>
      <h1>Notes</h1>
      <ul>
        {notes.map((note: Note) => (
          <li key={note.id}>
            <h2>
              <Link to={`/note/${note.id}`}>{note.title}</Link>
            </h2>
          </li>
        ))}
      </ul>
      <Link to="/create" style={{ display: "inline-block" }}>
        <button>Create Note</button>
      </Link>
    </div>
  );
}
