import { Outlet, ScrollRestoration } from "react-router-dom";

import Header from "@/components/Header";
import { Toaster } from "@/components/ui/sonner";

function RootLayout() {
  return (
    <>
      <div
        id="__root"
        className="grid grid-rows-[min-content_1fr] min-h-screen"
      >
        <Header />

        <Outlet />
        <Toaster richColors />
      </div>

      <ScrollRestoration />
    </>
  );
}

export default RootLayout;
