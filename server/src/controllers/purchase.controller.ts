import { NextFunction, Request, Response } from "express";

import { purchases } from "./FAKE_DATA";
import { MessageResponse } from "../interfaces/MessageResponse";
import { PurchaseDetails } from "../interfaces/PurchaseDetails";

/**
 * @method GET
 * @route /api/purchases/:id
 * @description Retrieves a purchase by its ID.
 * @todo This endpoint should be auth protected to prevent exposing everyone's purchases.
 */
export const getPurchase = (
  req: Request<{ id: string }>,
  res: Response<PurchaseDetails | MessageResponse>,
  next: NextFunction
) => {
  const { id: purchaseId } = req.params;

  try {
    const foundPurchase = purchases.find(
      (purchase) => purchase.id === purchaseId
    );

    if (!foundPurchase) {
      return res.status(404).json({
        message: "No purchase found with the provided purchaseId",
        provided_value: purchaseId,
      });
    }

    return res.status(200).json(foundPurchase);
  } catch (error) {
    next(error);
  }
};
