import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getNoteById, deleteNote } from "../lib/api";
import Note from "../types/Note";

export default function NoteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [note, setNote] = useState<Note | null>(null);

  useEffect(() => {
    const fetchNote = async () => {
      const response = await getNoteById(id!);
      setNote(response.data);
    };
    fetchNote();
  }, [id]);

  const handleDelete = async () => {
    await deleteNote(id!);
    navigate("/");
  };

  if (!note) return <p>Loading...</p>;

  return (
    <div>
      <h1>{note.title}</h1>
      <p>{note.content}</p>
      <div style={{ display: "flex", gap: "1rem" }}>
        <button onClick={handleDelete}>Delete</button>
        <button onClick={() => navigate(`/edit/${note.id}`)}>Edit</button>
      </div>
    </div>
  );
}
