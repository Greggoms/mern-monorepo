import express, { Router } from "express";

import files from "./file.routes";
import purchases from "./purchase.routes";
import products from "./product.routes";
import users from "./user.routes";

const router = express.Router();

export default (): Router => {
  files(router);
  purchases(router);
  products(router);
  users(router);
  return router;
};
