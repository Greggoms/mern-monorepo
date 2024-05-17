import { Router } from "express";

import { getMyCart, addProductToCart } from "../controllers/user.controller";

export default (router: Router) => {
  // Will need verification middleware for these routes
  router.get("/users/cart", getMyCart);
  router.post("/users/cart", addProductToCart);
};
