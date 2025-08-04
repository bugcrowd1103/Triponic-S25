import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./src/routes/registerRoutes"; // API routes
import { serveStatic, log } from "./vite";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

(async () => {
  // === SERVER SETUP ===
  const app = express();

  // Parse JSON and URL-encoded bodies
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Cookie parsing must come first
  app.use(cookieParser());

  // CORS setup (update origin if needed for production)
  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  // Mount your API routes
  await registerRoutes(app);

  // Serve static frontend (only in production)
  if (app.get("env") === "production") {
    serveStatic(app); // make sure vite.ts handles static serving from dist/
  }

  // Error handling middleware
  app.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      if (!res.headersSent) {
        res.status(status).json({ message });
      }
      console.error(err);
    }
  );

  // Bind to correct host/port for Render
  const PORT = process.env.PORT || 3001;
  const HOST = "0.0.0.0";

  app.listen(PORT, HOST, () => {
    log(`✅ Server running at http://${HOST}:${PORT}`);
  });
})();
