import { type Application, type Router } from "express";
import { TemplateRouter } from "./template";

const _routes: Array<[string, Router]> = [["/product", TemplateRouter]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
