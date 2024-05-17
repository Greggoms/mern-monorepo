import { NextFunction, Request, Response } from "express";

import { Product } from "../interfaces/db/Product";
import { MessageResponse } from "../interfaces/MessageResponse";

export const getMyCart = async (
  req: Request,
  res: Response<Product[]>,
  next: NextFunction
) => {
  try {
    // Query for user
    // ...

    // Not sure if I want to 'populate' the cart IDs
    // or already have the full product embedded..
    // ...

    // Return their cart.
    res.status(200).json([]);
  } catch (error) {
    return next(error);
  }
};

export const addProductToCart = async (
  req: Request<{}, {}, { productId: string; quantity: number }>,
  res: Response<MessageResponse>,
  next: NextFunction
) => {
  const { productId, quantity } = req.body;
  try {
    // Query for users
    // ...

    // Add product info into the cart
    // ...

    res.status(200).json({
      message: `Added ${quantity} item${
        quantity > 1 ? "s" : ""
      } to cart! (not really)`,
    });
  } catch (error) {
    return next(error);
  }
};
