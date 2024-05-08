import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

// layouts
import RootLayout from "./layouts/RootLayout";

// pages
import HomePage from "./pages/home";
import ErrorPage from "./pages/error";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<RootLayout />} errorElement={<ErrorPage />}>
      <Route index element={<HomePage />} />
      {/* <Route path="blog" element={<BlogPage />} /> */}
      {/* <Route path="about" element={<AboutPage />} /> */}
      {/* <Route path="contact" element={<ContactPage />} /> */}
    </Route>
  )
);

export default function AppRouter() {
  return <RouterProvider router={router} />;
}
