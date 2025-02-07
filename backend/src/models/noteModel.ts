export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "notes.json");

export const readNotesFromFile = (): Note[] => {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData);
};

export const writeNotesToFile = (notes: Note[]): void => {
  fs.writeFileSync(filePath, JSON.stringify(notes, null, 2));
};
