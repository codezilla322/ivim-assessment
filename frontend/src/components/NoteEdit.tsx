import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote, createNote } from "../lib/api";

export default function NoteEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      const fetchNote = async () => {
        const response = await getNoteById(id);
        setTitle(response.data.title);
        setContent(response.data.content);
      };
      fetchNote();
    }
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (id) {
      await updateNote(id, { title, content });
    } else {
      await createNote({ title, content });
    }
    navigate("/");
  };

  return (
    <div>
      <h1>{id ? "Edit Note" : "Create A New Note"}</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "1rem" }}>
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
            required
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
            cols={30}
            rows={10}
            required
          />
        </div>
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
