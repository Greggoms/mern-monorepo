import getErrorMessage, { reportError } from "@/lib/utils/error-handlers";
import { PurchaseDetails } from "@/interfaces/PurchaseDetails";
import { MessageWithFileResponse } from "@/interfaces/MessageResponse";

const BASE_URL = "http://localhost:5000/api";

/*=======================================
  GET
=======================================*/

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
