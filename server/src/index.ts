import "@colors/colors";
import express, { Application, Request, Response } from "express";
import cors from "cors";

import corsOptions from "./config/corsOptions";
import router from "./routes/index";
import { errorHandler, notFound } from "./middleware/errorHandlers";

const app: Application = express();
const PORT = process.env.PORT || 5000;

// configurations
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use("/api", router());
app.get("/api/health-check", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hello 👋" });
});

// Make sure these middleware routes are last, with the errorHandler last.
app.use(notFound);
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server listening on port ${PORT}`.brightCyan.underline)
);
