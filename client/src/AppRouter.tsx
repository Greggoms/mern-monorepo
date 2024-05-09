import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import ErrorPage from "./pages/error";
import HomePage from "./pages/home";
import CartPage from "./pages/cart";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      <Route path="cart" element={<CartPage />} />
    </Route>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
