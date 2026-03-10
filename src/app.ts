import express, { Express } from "express";
import {
  accessLogger,
  errorLogger,
  consoleLogger
} from "./api/v1/middleware/logger";
import errorHandler from "./api/v1/middleware/errorHandler";
import projectRoutes from "./api/v1/routes/projectRoutes";
import adminRoutes from "./api/v1/routes/adminRoutes";

const app: Express = express();

// Logging
if(process.env.NODE_ENV === "production"){
  app.use(accessLogger);
  app.use(errorLogger)
} else {
  app.use(consoleLogger);
}

// Body parsing
app.use(express.json());

// Health endpoint
app.get("/api/v1/health", (req, res) => {
  res.json({
    status: "OK",
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    version: "1.0.0"
  });
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use("/api/v1/projects", projectRoutes);
app.use("/api/v1/admin", adminRoutes);



app.use(errorHandler);

export default app;