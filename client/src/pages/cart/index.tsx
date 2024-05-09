import { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";

import { Button } from "@/components/ui/button";
import { Cart } from "@/interfaces/Cart";

export default function CartPage() {
  const [invoice, setInvoice] = useState<string | Buffer | null>(null);
  const [cart, setCart] = useState<Cart | null>();

  useEffect(() => {
    const fetchResult = {
      promo: "some-random-id",
      products: [
        {
          id: "r4nD0mid",
          name: "Item One",
          description: "",
          price: 0.55,
        },
        {
          id: "239018kedm32",
          name: "Item Two",
          description: "",
          price: 5.45,
        },
        {
          id: "g6985tr1hrt",
          name: "Item Three",
          description: "",
          price: 2,
        },
      ],
    };
    setCart(fetchResult);
  }, []);

  /** This only handles displaying the PDF for now... */
  const handleDownloadInvoice = async () => {
    if (!cart) return toast.info("No cart...");

    try {
      const res = await fetch(
        "http://localhost:5000/api/files/purchase-invoice",
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cart),
        }
      );
      const body = await res.json();
      console.log(body);

      if (!res.ok) {
        console.error(body);
        toast.error(body.message);
        return;
      }

      setInvoice(body.file); // receiving a base64 string
      // setInvoice(body.file.data); // if receiving a Buffer
      toast.success(body.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="container pt-5 pb-20 space-y-10">
      <h1>Thank you for your purchase</h1>

      <ul>
        <li>Product 1</li>
        <li>Product 2</li>
        <li>Product 3</li>
      </ul>

      <Button
        variant="outline"
        size="sm"
        onClick={handleDownloadInvoice}
        disabled={!cart}
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
