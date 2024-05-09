import * as z from "zod";
import { productSchema } from "../db/Product";

export const productDetailsSchema = z.object({
  /** Global promo ID, could extend to the product level if needed. */
  promo: z.string().optional(),
  products: z.array(productSchema),
});

export type ProductDetails = z.infer<typeof productDetailsSchema>;
