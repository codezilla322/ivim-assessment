import { Server } from "http";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import noteRoutes from "./routes/noteRoutes";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/notes", noteRoutes);

let server: Server;

export const startServer = () => {
  return new Promise<void>((resolve) => {
    server = app.listen(port, () => {
      resolve();
    });
  });
};

export const closeServer = () => {
  return new Promise<void>((resolve) => {
    server.close(() => {
      resolve();
    });
  });
};

if (require.main === module) {
  startServer().then(() => {
    console.log(`Server listening on port ${port}`);
  });
}

export default app;
