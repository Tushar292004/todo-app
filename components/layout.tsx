import { Sidebar } from "./sidebar"
import { TodoList } from "./todo-list"
import { TodoDetail } from "./todo-detail"
import { useStore } from "@/lib/store"
import { AlignJustify, Search, LayoutGrid } from 'lucide-react';
import { ThemeProvider } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { ModeToggle } from "./mode-toggle";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Layout({ className, ...props }: LayoutProps) {
  const selectedTodo = useStore((state) => state.selectedTodo)

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <nav className="flex justify-between p-3 items-center">
        <div className="flex  justify-between items-center" >
          <AlignJustify />
          <h1 className="logo text-2xl font-bold tracking-tighter text-green-900 px-4">DoIt</h1>
        </div>
        <div className="flex justify-between gap-5 items-center">
          <Search />
          <LayoutGrid />
          <ModeToggle />
        </div>
      </nav>
      <div className={`grid h-screen grid-cols-[280px_1fr_auto] bg-background ${className}`} {...props}>
        <Sidebar />
        <TodoList />
        {selectedTodo && <TodoDetail todo={selectedTodo} />}
      </div>
    </ThemeProvider>
  )
}

