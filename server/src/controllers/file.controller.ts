import { NextFunction, Request, Response } from "express";
import { renderToBuffer } from "@react-pdf/renderer";

import { MessageWithFileResponse } from "../interfaces/MessageResponse";
import { PurchaseDetails } from "../interfaces/files/PurchaseDetails";
import generatePurchaseInvoice from "../utils/files/generatePurchaseInvoice";

export const createPurchaseInvoice = async (
  req: Request<{}, {}, PurchaseDetails>,
  res: Response<MessageWithFileResponse>,
  next: NextFunction
) => {
  try {
    const { promo, products, id } = req.body;

    // return 'fileResult' in the json to send the client a Buffer
    const fileResult = await renderToBuffer(
      generatePurchaseInvoice({ promo, products, id })
    );
    // return 'toBase64' in the json to send the client a string
    const toBase64 =
      "data:" + "application/pdf" + ";base64," + fileResult.toString("base64");

    res
      .status(200)
      .json({ message: "Here's your purchase invoice", file: toBase64 });
  } catch (error) {
    return next(error);
  }
};
