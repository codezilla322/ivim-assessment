import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getNoteById, updateNote, createNote } from "../lib/api";

export default function NoteEdit() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

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
    if (!title || !content) {
      setErrorMsg("Title and content are required");
      return;
    }

    try {
      let response;
      if (id) {
        response = await updateNote(id, { title, content });
      } else {
        response = await createNote({ title, content });
      }
      if (response.status === 201 || response.status === 200) navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMsg((error as any).response?.data?.message || error.message);
      } else {
        console.log("An error occurred");
      }
    }
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
            onFocus={() => setErrorMsg("")}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
          />
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onFocus={() => setErrorMsg("")}
            style={{ padding: "0.5rem", fontSize: "1rem" }}
            cols={30}
            rows={10}
          />
        </div>
        <div
          style={{
            marginBottom: "1rem",
            display: errorMsg ? "block" : "none",
            color: "red",
          }}
        >
          <p>{errorMsg}</p>
        </div>
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
