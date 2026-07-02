import express from "express";
import cors from "cors";
import authRoutes from "./modules/auth/auth.routes";
import {errorHandler} from "./shared/middleware/error.middleware";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);


app.get("/health", (_, res) => {
  res.status(200).json({
    status: "OK",
    message: "AI Interview Simulator API is running."
  });
});

app.use(errorHandler);
export default app;