import { type Application, type Router } from "express";
import { TemplateRouter } from "./template";
import dotenv from "dotenv";

dotenv.config();

const URL = process.env.URL || "/api/templates";
const ENDPOINT = process.env.ENDPOINT || "/Global/";

const _routes: Array<[string, Router]> = [[`${URL}${ENDPOINT}`, TemplateRouter]];

export const routes = (app: Application) => {
  _routes.forEach((route) => {
    const [url, router] = route;
    app.use(url, router);
  });
};
