import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { generatePurchaseInvoice, getPurchase } from "@/api/endpoints";
import getErrorMessage from "@/lib/utils/error-handlers";

import { Button } from "@/components/ui/button";

// There are 3 hardcoded purchases. This chooses a random one per query call.
const purchaseId = `purchase-${Math.floor(Math.random() * 3 + 1)}-id`;

export default function CartPage() {
  // The generated PDF as a base64 string.
  const [invoice, setInvoice] = useState<string>();

  // Fetch purchase details.
  const query = useQuery({
    queryKey: ["purchases", purchaseId],
    queryFn: () => getPurchase(purchaseId),
  });

  /** This only handles displaying the PDF for now... */
  const handleDownloadInvoice = async () => {
    if (!query.data) return toast.info("No purchase information...");

    try {
      const res = await generatePurchaseInvoice(query.data);

      setInvoice(res.file as string); // receiving a base64 string
      // setInvoice(res.file.data as Buffer); // if receiving a Buffer
      toast.success(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  if (query.isLoading) {
    return (
      <main className="container pt-5 pb-20">
        <em className="text-muted-foreground">Fetching purchase...</em>
      </main>
    );
  }
  if (query.isError || !query.data) {
    return (
      <main className="container pt-5 pb-20 space-y-5">
        <p>Something went wrong...</p>
        <p className="text-destructive">{getErrorMessage(query.error)}</p>
      </main>
    );
  }

  return (
    <main className="container pt-5 pb-20 space-y-10">
      <h1>Thank you for your purchase</h1>

      {query.data.products.length === 0 ? (
        <em className="text-muted-foreground">N/A</em>
      ) : (
        <ul>
          {query.data.products.map((p) => (
            <li key={p.id}>
              <h3>{p.name}</h3>
              <p>{p.price}</p>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      )}

      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadInvoice}
        disabled={query.isLoading || query.isError}
      >
        <Download className="mr-2" />
        Download Invoice
      </Button>

      {invoice && (
        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
          <Viewer fileUrl={invoice} theme={"dark"} />
        </Worker>
      )}
    </main>
  );
}
