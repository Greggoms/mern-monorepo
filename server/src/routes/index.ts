import express, { Router } from "express";
import files from "./file.routes";

const router = express.Router();

export default (): Router => {
  files(router);
  return router;
};
