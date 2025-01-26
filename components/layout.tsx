import { Sidebar } from "./sidebar"
import { TodoList } from "./todo-list"
import { TodoDetail } from "./todo-detail"
import { useStore } from "@/lib/store"
import { AlignJustify, Search, LayoutGrid } from 'lucide-react';
import { ThemeProvider } from "@/components/theme-provider"
import { Moon, Sun } from "lucide-react"
import { ModeToggle } from "./mode-toggle";
import { useState } from "react";

interface LayoutProps extends React.HTMLAttributes<HTMLDivElement> { }

export function Layout({ className, ...props }: LayoutProps) {
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const selectedTodo = useStore((state) => state.selectedTodo)
  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <nav className="flex justify-between p-3 items-center">
        <div className="flex  justify-between items-center" >
        <AlignJustify className="cursor-pointer" onClick={toggleSidebar} />
          <h1 className="logo text-2xl font-bold tracking-tighter text-green-900 px-4">DoIt</h1>
        </div>
        <div className="flex justify-between gap-5 items-center">
          <Search />
          <LayoutGrid />
          <ModeToggle />
        </div>
      </nav>
      <div className={`grid h-screen grid-cols-[280px_1fr_auto] bg-background ${className}`} {...props}>

      <div
        className={`grid h-screen bg-background transition-all duration-300 ${
          isSidebarVisible
            ? "grid-cols-[280px_1fr]" // Sidebar visible
            : "grid-cols-[1fr]" // Sidebar hidden
        } ${className}`}
        {...props}
      >
          <Sidebar />
        </div>
        <TodoList />
        {selectedTodo && <TodoDetail todo={selectedTodo} />}
      </div>
    </ThemeProvider>
  )
}

