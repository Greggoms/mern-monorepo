import { NextFunction, Request, Response } from "express";
import { renderToBuffer } from "@react-pdf/renderer";

import { MessageWithFileResponse } from "../interfaces/MessageResponse";
import { ProductDetails } from "../interfaces/files/PurchaseDetails";
import generatePurchaseInvoice from "../utils/files/generatePurchaseInvoice";

export const createPurchaseInvoice = async (
  req: Request<{}, {}, ProductDetails>,
  res: Response<MessageWithFileResponse>,
  next: NextFunction
) => {
  try {
    const { promo, products } = req.body;

    const total = products
      .map((p) => p.price)
      .reduce((prev, current) => {
        return prev + current;
      })
      .toFixed(2);

    const totalWithTax = (parseFloat(total) * 0.09 + parseFloat(total)).toFixed(
      2
    );
    console.log({ total, totalWithTax });

    // return 'fileResult' in the json to send the client a Buffer
    const fileResult = await renderToBuffer(generatePurchaseInvoice());
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
