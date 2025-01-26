import { ThemeProvider } from "@/components/theme-provider"
import { Layout } from "@/components/layout"

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Layout className="text-foreground" />
    </ThemeProvider>
  )
}

