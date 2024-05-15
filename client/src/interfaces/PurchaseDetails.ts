import * as z from "zod";
import { productSchema } from "./Product";

export const purchaseDetailsSchema = z.object({
  id: z.string(),
  /** Global promo ID, could extend to the product level if needed. */
  promo: z.string().optional(),
  products: z.array(productSchema),
});

export type PurchaseDetails = z.infer<typeof purchaseDetailsSchema>;
