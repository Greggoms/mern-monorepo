import { LucideIcon, StoreIcon } from "lucide-react";

type NavigationLink = {
  url: string;
  label: string;
  Icon?: LucideIcon;
};

/**
 * The '/cart' route isn't in this list because I want to add
 * additional logic to display the cart's current product count.
 *
 * I would also either need to ditch shadcn's <Navigation> or
 * modify it to allow the cart button to float right on desktop.
 */
export const TOP_NAVIGATION: NavigationLink[] = [
  {
    url: "/store",
    label: "Store",
    Icon: StoreIcon,
  },
];
