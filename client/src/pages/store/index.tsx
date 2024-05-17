import { useQuery, useQueryClient } from "@tanstack/react-query";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { addProductToCart, getAllProducts } from "@/api/endpoints";
import getErrorMessage from "@/lib/utils/error-handlers";
import { toast } from "sonner";

export default function StorePage() {
  const queryClient = useQueryClient();

  const products = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
  });

  // This will need to be handled by an endpoint
  // in order to preserve the items in the cart.
  const handleAddToCart = async (productId: string, qty: number) => {
    console.log(productId);
    const response = await addProductToCart({ productId, quantity: qty });
    // TODO: Make the `getMe` api route '/api/users/me'
    queryClient.invalidateQueries({
      queryKey: ["users", "me"],
    });
    toast.success(response.message);
  };

  return (
    <main className="container mt-5 mb-20">
      <h1 className="text-3xl font-semibold text-center mb-20">
        Shop All Products
      </h1>

      {products.isLoading ? (
        <em>....Loader....</em>
      ) : products.isError ? (
        <div>
          <h2>Something went wrong...</h2>
          <p className="text-destructive">{getErrorMessage(products.error)}</p>
        </div>
      ) : !products.data ? (
        <p>No products data found!</p>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {products.data.map((p) => (
            <li key={p.id}>
              <Card>
                <div className="h-64 w-full bg-accent rounded-t-lg" />
                <CardHeader>
                  <CardTitle>{p.name}</CardTitle>
                  <CardDescription>{p.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{p.price}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    type="button"
                    size="sm"
                    className="w-full"
                    onClick={() => handleAddToCart(p.id, 1)}
                  >
                    Add to cart
                  </Button>
                </CardFooter>
              </Card>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
