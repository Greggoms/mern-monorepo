import getErrorMessage, { reportError } from "@/lib/utils/error-handlers";
import { PurchaseDetails } from "@/interfaces/PurchaseDetails";
import {
  MessageResponse,
  MessageWithFileResponse,
} from "@/interfaces/MessageResponse";
import { Product } from "@/interfaces/Product";

const BASE_URL = "http://localhost:5000/api";

/*=======================================
  GET
=======================================*/

export async function getAllProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/products`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

/**
 * I will need to verify this request with authorization.
 * The user will have to be decoded on the backend. Once
 * found from the DB, return their cart array.
 */
export async function getMyCart(): Promise<Product[]> {
  try {
    const res = await fetch(`${BASE_URL}/users/cart`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function getPurchase(id: string): Promise<PurchaseDetails> {
  try {
    const res = await fetch(`${BASE_URL}/purchases/${id}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

/*=======================================
  POST
=======================================*/
/**
 * I will need to verify this request with authorization.
 * The user will have to be decoded on the backend. Once
 * found from the DB, push the productId to their cart array.
 * Revalidate this path afterwards!
 *
 * I'm going to embed the cart info into the User model
 * for now. I don't see why I'd need a collection of carts
 * if I want the user AND cart info to be available at all times.
 * I also don't see the need for a single user to be associated
 * with many carts 🤔.
 *
 * I'm not sure if I want to perform joins on database ids or
 * just store the full product. I need a way to keep track of
 * each quantity as well.
 *
 * ```ts
 * // Possibility:
 * const cart = [
 *  {productId: "fuin948h904", qty: 1},
 *  {productId: "034870jrn20", qty: 3},
 * ]
 * ```
 */
export async function addProductToCart({
  productId,
  quantity,
}: {
  productId: string;
  quantity: number;
}): Promise<MessageResponse> {
  try {
    const res = await fetch(`${BASE_URL}/users/cart`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    });
    const data: MessageResponse = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}

export async function generatePurchaseInvoice(
  purchaseDetails: PurchaseDetails
): Promise<MessageWithFileResponse> {
  try {
    const res = await fetch(`${BASE_URL}/files/purchase-invoice`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(purchaseDetails),
    });
    const data: MessageWithFileResponse = await res.json();

    if (!res.ok) throw new Error(data.message);

    return data;
  } catch (error) {
    return reportError({ message: getErrorMessage(error) });
  }
}
