import request from "supertest";
import app, { startServer, closeServer } from "../app";
import fs from "fs";
import path from "path";

const filePath = path.join(__dirname, "../models/notes.json");

beforeEach(async () => {
  await startServer();
  fs.writeFileSync(filePath, JSON.stringify([]));
});

afterEach(async () => {
  await closeServer();
});

describe("Notes API", () => {
  it("should create a new note", async () => {
    const response = await request(app).post("/notes").send({
      title: "Test Note",
      content: "This is a test note",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("should retrieve all notes", async () => {
    await request(app).post("/notes").send({
      title: "Sample Note",
      content: "Sample content",
    });

    const response = await request(app).get("/notes");
    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
  });

  it("should retrieve a note by ID", async () => {
    const noteResponse = await request(app).post("/notes").send({
      title: "Specific Note",
      content: "Content for testing",
    });

    const noteId = noteResponse.body.id;
    const response = await request(app).get(`/notes/${noteId}`);

    expect(response.status).toBe(200);
    expect(response.body.id).toBe(noteId);
  });

  it("should update a note", async () => {
    const noteResponse = await request(app).post("/notes").send({
      title: "Old Title",
      content: "Old Content",
    });

    const noteId = noteResponse.body.id;

    const response = await request(app).put(`/notes/${noteId}`).send({
      title: "Updated Title",
      content: "Updated Content",
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe("Updated Title");
  });

  it("should delete a note", async () => {
    const noteResponse = await request(app).post("/notes").send({
      title: "To be deleted",
      content: "This note will be deleted",
    });

    const noteId = noteResponse.body.id;

    const deleteResponse = await request(app).delete(`/notes/${noteId}`);
    expect(deleteResponse.status).toBe(204);

    const checkResponse = await request(app).get(`/notes/${noteId}`);
    expect(checkResponse.status).toBe(404);
  });
});
