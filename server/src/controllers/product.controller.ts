import { NextFunction, Request, Response } from "express";

import { Product } from "../interfaces/db/Product";
import { products } from "./FAKE_DATA";

export const getAllProducts = async (
  req: Request,
  res: Response<Product[]>,
  next: NextFunction
) => {
  try {
    // Query for products
    // ...

    res.status(200).json(products);
  } catch (error) {
    return next(error);
  }
};
