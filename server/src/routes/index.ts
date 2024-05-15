import express, { Router } from "express";

import files from "./file.routes";
import purchases from "./purchase.routes";

const router = express.Router();

export default (): Router => {
  files(router);
  purchases(router);
  return router;
};
