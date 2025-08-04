import express, { type Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import { registerRoutes } from "./src/routes/registerRoutes"; // API routes
import { setupVite, serveStatic, log } from "./vite";
import cors from "cors";

import dotenv from "dotenv";
dotenv.config();

(async () => {
  // === API SERVER ===
  const apiApp = express();

  // Parse JSON and URL-encoded bodies
  apiApp.use(express.json());
  apiApp.use(express.urlencoded({ extended: false }));

  // IMPORTANT: cookieParser must come BEFORE cors and routes
  apiApp.use(cookieParser());

  // Setup CORS - must come AFTER cookieParser for credentials to work
  apiApp.use(
    cors({
      origin: "http://127.0.0.1:2000", // frontend origin
      credentials: true, // allow cookies to be sent
    })
  );

  // Mount your API routes AFTER cookieParser and cors
  await registerRoutes(apiApp);

  // Error handling middleware
  apiApp.use(
    (err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      if (!res.headersSent) {
        res.status(status).json({ message });
      }
      console.error(err);
    }
  );

  const http = await import("http");
  const apiServer = http.createServer(apiApp);

  const apiPort = 3001; // API port
  const host = "127.0.0.1";

  apiServer.listen(apiPort, host, () => {
    log(`✅ API Server running at http://${host}:${apiPort}`);
  });

  // === FRONTEND / STATIC SERVER ===
  const frontendApp = express();

  if (frontendApp.get("env") === "development") {
    const frontendHttp = await import("http");
    const frontendServer = frontendHttp.createServer(frontendApp);
    await setupVite(frontendApp, frontendServer); // pass server instance
  } else {
    serveStatic(frontendApp);
  }

  const frontendPort = 2000; // Frontend port

  frontendApp.listen(frontendPort, host, () => {
    log(`✅ Frontend Server running at http://${host}:${frontendPort}`);
  });
})();
