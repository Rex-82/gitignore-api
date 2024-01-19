import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import fs from "fs";
import count from "../templates";
import env from "../utils/env";

export const TemplateRouter: Router = Router();

async function serve() {
  const output = await count();

  TemplateRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).send(JSON.stringify(output, null, 2));
  });

  console.log(
    `Templates will be available at http://${env.HOSTNAME}:${env.PORT}${env.URL}`
  );

  output.forEach(async (element) => {
    const encodedElementName = encodeURIComponent(element.name);
    const fileContents = await fs.promises.readFile(element.path);

    // Serve the single template
    TemplateRouter.get(
      `/${encodedElementName}`,
      (req: Request, res: Response, next: NextFunction) => {
        res.contentType("text/plain");
        res.status(200).send(fileContents);
      }
    );
  });
}

serve();
