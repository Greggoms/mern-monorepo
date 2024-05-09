import { Router } from "express";

import validateRequest from "../middleware/validateRequest";
import { createPurchaseInvoice } from "../controllers/file.controller";
import { productDetailsSchema } from "../interfaces/files/PurchaseDetails";

export default (router: Router) => {
  router.post(
    "/files/purchase-invoice",
    validateRequest({
      body: productDetailsSchema,
    }),
    createPurchaseInvoice
  );
};
