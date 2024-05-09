import { Toaster as Sonner } from "sonner";
import { useTheme } from "@/hooks/useTheme";

type ToasterProps = React.ComponentProps<typeof Sonner>;

/**
 * The unaltered component can be found here: [sonner.tsx](https://github.com/shadcn-ui/ui/blob/main/apps/www/registry/default/ui/sonner.tsx).
 * The `className` and `toastOptions` props that came by default when installing from shadcn
 * have been removed so the `richColors` prop works correctly.
 *
 * The `richColors` prop could be removed and the `className` and `toastOptions` props could
 * be brought back in once I've defined my own custom colors for each of the `toastOptions.classNames` object.
 * [Sonner Docs - Styling](https://sonner.emilkowal.ski/styling).
 */
const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return <Sonner theme={theme as ToasterProps["theme"]} {...props} />;
};

export { Toaster };
