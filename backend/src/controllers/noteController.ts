import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { readNotesFromFile, writeNotesToFile } from "../models/noteModel";

export const getNotes = (req: Request, res: Response): any => {
  const notes = readNotesFromFile();
  res.status(200).json(notes);
};

export const getNoteById = (req: Request, res: Response): any => {
  const { id } = req.params;
  const notes = readNotesFromFile();
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).json({ message: "Note not found" });
  res.status(200).json(note);
};

export const createNote = (req: Request, res: Response): any => {
  const { title, content }: { title: string; content: string } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  const newNote = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  const notes = readNotesFromFile();
  notes.push(newNote);
  writeNotesToFile(notes);
  res.status(201).json(newNote);
};

export const updateNote = (req: Request, res: Response): any => {
  const { id } = req.params;
  const { title, content }: { title: string; content: string } = req.body;
  const notes = readNotesFromFile();
  const note = notes.find((n) => n.id === id);
  if (!note) return res.status(404).json({ message: "Note not found" });

  note.title = title || note.title;
  note.content = content || note.content;
  note.updatedAt = new Date().toISOString();
  writeNotesToFile(notes);
  res.status(200).json(note);
};

export const deleteNote = (req: Request, res: Response): any => {
  const { id } = req.params;
  const notes = readNotesFromFile();
  const index = notes.findIndex((n) => n.id === id);
  if (index === -1) return res.status(404).json({ message: "Note not found" });
  notes.splice(index, 1);
  writeNotesToFile(notes);
  res.status(204).send();
};
