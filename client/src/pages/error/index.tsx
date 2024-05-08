import { Link, useRouteError } from "react-router-dom";

import getErrorMessage from "@/lib/utils/error-handlers";
import { Button } from "@/components/ui/button";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  const error_message = getErrorMessage(error);

  return (
    <main className="container mt-5 mb-20">
      <h1 className="text-2xl">Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <em className="text-destructive">{error_message}</em>
      </p>

      <Link to="/" className="block mt-10">
        <Button>Return to Home</Button>
      </Link>
    </main>
  );
}
