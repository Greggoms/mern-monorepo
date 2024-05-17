import { Router } from "express";

import { getAllProducts } from "../controllers/product.controller";

export default (router: Router) => {
  router.get("/products", getAllProducts);
};
