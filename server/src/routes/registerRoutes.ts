import { Application } from "express";
import mainRouter from "./index"; // the file you shared

export async function registerRoutes(app: Application) {
  app.use("/api", mainRouter);
  return app;
}
