import { Router } from "express";
import * as z from "zod";

import validateRequest from "../middleware/validateRequest";
import { getPurchase } from "../controllers/purchase.controller";

export default (router: Router) => {
  router.get(
    "/purchases/:id",
    validateRequest({
      params: z.object({ id: z.string() }),
    }),
    getPurchase
  );
};
