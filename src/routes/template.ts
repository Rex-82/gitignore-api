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
  
  // Serve the list of templates
  TemplateRouter.get(
    env.ENDPOINT,
    (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send(output);
    }
  );

  TemplateRouter.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send(output);
  });
  
  console.log(`Templates will be available at http://${env.HOSTNAME}:${env.PORT}${env.URL}${env.ENDPOINT}file_name.gitignore`)

  output.forEach(async (element) => {
    const encodedElementName = encodeURIComponent(element.name);
    const fileContents = await fs.promises.readFile(element.path);

    // Serve the single template
    TemplateRouter.get(
      `${env.ENDPOINT}${encodedElementName}`,
      (req: Request, res: Response, next: NextFunction) => {
        res.contentType("text/plain");
        res.status(200).send(fileContents);
      }
    );
  });

}

serve();
