import * as z from "zod";

export const productSchema = z.object({
  id: z.string().min(5, "Invalid product ID"),
  name: z.string().min(1, "Product name is required"),
  description: z.string(),
  price: z.number().min(0, "Product price cannot be less than $0"),
});

export type Product = z.infer<typeof productSchema>;
