import express, { type Application } from "express";
import { routes } from "./routes";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Access environment variables
const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || "3000";

const app: Application = express();

routes(app);

app.listen(PORT, () =>
  console.log(`Server is listening on http://${HOSTNAME}:${PORT}`)
);
