import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingBasketIcon } from "lucide-react";

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
import { TOP_NAVIGATION } from "@/lib/routes";
import { Separator } from "./ui/separator";

export default function Header() {
  const { pathname } = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const cartProductCount = 3;

  return (
    <header className="border-b-[1px] py-4 shadow-md">
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-5">
          <Link to="/" className="shrink-0">
            <h2 className="font-semibold text-2xl">MERN</h2>
          </Link>
          {/* Desktop Nav */}
          <NavigationMenu className="hidden sm:block flex-1">
            <NavigationMenuList>
              {TOP_NAVIGATION.map((link) => (
                <NavigationMenuItem key={link.url}>
                  <NavigationMenuLink
                    className={navigationMenuTriggerStyle()}
                    active={pathname === link.url}
                    asChild
                  >
                    <Link to={link.url}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="flex items-center gap-x-3">
          <Button
            asChild
            variant="outline"
            className={cn(
              "hidden sm:flex",
              pathname === "/cart" && "bg-accent"
            )}
          >
            <Link to="/cart">
              <ShoppingBasketIcon className="w-5 h-5" />
              <span className="text-muted-foreground mx-1">|</span>{" "}
              <span
                className={cn(
                  cartProductCount > 0
                    ? "text-green-500 dark:text-green-600"
                    : "text-muted-foreground"
                )}
              >
                {cartProductCount}
              </span>
            </Link>
          </Button>
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
            <SheetContent className="w-[320px] px-0">
              <nav className="flex flex-col">
                {TOP_NAVIGATION.map((link) => (
                  <div
                    key={link.url}
                    className={cn(
                      "justify-stretch text-left",
                      pathname === link.url && "bg-accent"
                    )}
                  >
                    <Link
                      key={link.url}
                      to={link.url}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center px-10 py-2 hover:bg-accent/50"
                    >
                      {link.Icon && <link.Icon className="mr-3 w-5 h-5" />}{" "}
                      {link.label}
                    </Link>
                    <Separator />
                  </div>
                ))}
                <Link
                  to="/cart"
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex items-center px-10 py-2 hover:bg-accent/50",
                    pathname === "/cart" && "bg-accent"
                  )}
                >
                  <ShoppingBasketIcon className="mr-3 w-5 h-5" />
                  Cart <span className="text-muted-foreground mx-1">
                    |
                  </span>{" "}
                  <span
                    className={cn(
                      cartProductCount > 0
                        ? "text-green-500 dark:text-green-600"
                        : "text-muted-foreground"
                    )}
                  >
                    {cartProductCount}
                  </span>
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
