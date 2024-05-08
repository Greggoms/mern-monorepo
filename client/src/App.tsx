import AppRouter from "./AppRouter";
import { ThemeProvider } from "./components/providers/ThemeProvider";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
