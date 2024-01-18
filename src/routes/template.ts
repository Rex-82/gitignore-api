import {
  type Request,
  type Response,
  type NextFunction,
  Router,
} from "express";
import fs from "fs";
import count from "../templates";

export const TemplateRouter: Router = Router();

async function serve() {
  const output = await count();
  
  // Serve the list of templates
  TemplateRouter.get(
    "/",
    (req: Request, res: Response, next: NextFunction) => {
      res.status(200).send(output);
    }
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
