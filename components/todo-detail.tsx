import { Bell, Calendar, Plus, RotateCcw, Star, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useStore } from "@/lib/store"
import type { Todo } from "@/types/todo"
import { Checkbox } from "./ui/checkbox"

interface TodoDetailProps {
  todo: Todo
}

export function TodoDetail({ todo }: TodoDetailProps) {
  const setSelectedTodo = useStore((state) => state.setSelectedTodo)
  const selectedList = useStore((state) => state.selectedList)
  const updateTodo = useStore((state) => state.updateTodo)
  const toggleTodo = useStore((state) => state.toggleTodo)
  const toggleImportant = useStore((state) => state.toggleImportant)

  return (
    <div className="w-[400px]">
      <div className="flex flex-col justify-between h-full">
        <div className="space-y-4 p-4 bg-[#eef6ef] h-full">
          <div key={todo.id} className="flex items-center gap-2 border-t-2 p-4 bg-[#eef6ef] " onClick={() => setSelectedTodo(todo)}>
            <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(selectedList, todo.id)} />
            <span className="text-muted-foreground">{todo.title}</span>
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto"
              onClick={(e) => {
                e.stopPropagation()
                toggleImportant(selectedList, todo.id)
              }}
            >
              <Star className={`h-4 w-4 ${todo.important ? "fill-yellow-400 text-yellow-400" : ""}`} />
            </Button>
          </div>
          <div className="space-y-2">
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-t-2">
              <Plus className="h-4 w-4" />
              Add Step
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-t-2">
              <Bell className="h-4 w-4" />
              Set Reminder
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-t-2">
              <Calendar className="h-4 w-4" />
              Add Due Date
            </Button>
            <Button variant="outline" className="w-full justify-start gap-2 bg-transparent border-t-2">
              <RotateCcw className="h-4 w-4" />
              Repeat
            </Button>
          </div>
          <div className="space-y-2 bg-transparent border-t-2 p-4">
            <label className="text-sm font-medium">Notes</label>
          </div>
        </div>
        <div className="flex items-center justify-between border-b p-4">
          <Button variant="ghost" size="icon" onClick={() => setSelectedTodo(null)}>
            <X className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">Created {new Date(todo.createdAt).toLocaleDateString()}</span>
          <Trash2 />
        </div>
      </div>
    </div>
  )
}

