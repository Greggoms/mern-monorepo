import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu } from "lucide-react";

import ThemeToggle from "@/components/ThemeToggle";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils/shadcn-utils";

export default function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b-[1px] py-4 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <Link to="/" className="shrink-0">
            <h2 className="font-semibold text-2xl">MERN</h2>
          </Link>
          {/* Desktop Nav */}
          <NavigationMenu className="hidden sm:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  className={navigationMenuTriggerStyle()}
                  active={pathname === "/cart"}
                  asChild
                >
                  <Link to="/cart">Cart</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-x-3">
          <ThemeToggle />

          {/* Mobile Nav */}
          <Sheet
            open={isMenuOpen}
            onOpenChange={() =>
              isMenuOpen ? setIsMenuOpen(false) : setIsMenuOpen(true)
            }
          >
            <SheetTrigger className="sm:hidden" asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent className="w-[320px]">
              <nav className="flex flex-col gap-y-1">
                <Button
                  asChild
                  variant="link"
                  className={cn(
                    "justify-stretch text-left",
                    pathname === "/cart" && "underline"
                  )}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Link to="/cart">Cart</Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
