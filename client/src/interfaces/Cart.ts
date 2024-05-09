import * as z from "zod";
import { productSchema } from "./Product";

export const cartSchema = z.object({
  /** Global promo ID, could extend to the product level if needed. */
  promo: z.string().optional(),
  products: z.array(productSchema),
});

export type Cart = z.infer<typeof cartSchema>;
