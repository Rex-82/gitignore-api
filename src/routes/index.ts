import { type Application, type Router } from "express";
import { TemplateRouter } from "./template";
import env from "../utils/env";

const _routes: Array<[string, Router]> = [[env.URL, TemplateRouter]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
