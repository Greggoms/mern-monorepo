import { Router } from "express";

import validateRequest from "../middleware/validateRequest";
import { createPurchaseInvoice } from "../controllers/file.controller";
import { purchaseDetailsSchema } from "../interfaces/PurchaseDetails";

export default (router: Router) => {
  router.post(
    "/files/purchase-invoice",
    validateRequest({
      body: purchaseDetailsSchema,
    }),
    createPurchaseInvoice
  );
};
