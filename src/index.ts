import express, { type Application } from "express";
import { routes } from "./routes";
import env from "./utils/env";

const app: Application = express();

routes(app);

app.listen(env.PORT, () =>
  console.log(`Server is listening on http://${env.HOSTNAME}:${env.PORT}`)
);
