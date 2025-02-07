import axios from "axios";
import Note from "../types/Note";

const API_URL = "http://localhost:8000/notes";

export const getNotes = () => axios.get(API_URL);
export const getNoteById = (id: string) => axios.get(`${API_URL}/${id}`);
export const createNote = (note: Partial<Note>) => axios.post(API_URL, note);
export const updateNote = (id: string, note: Partial<Note>) =>
  axios.put(`${API_URL}/${id}`, note);
export const deleteNote = (id: string) => axios.delete(`${API_URL}/${id}`);
