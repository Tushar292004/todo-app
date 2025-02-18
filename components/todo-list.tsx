import { Bell, Calendar, ChevronDown, Plus, RefreshCw, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { useStore } from "@/lib/store"
import { useState } from "react"

export function TodoList() {
  const [newTodo, setNewTodo] = useState("")
  const selectedList = useStore((state) => state.selectedList)
  const lists = useStore((state) => state.lists)
  const addTodo = useStore((state) => state.addTodo)
  const toggleTodo = useStore((state) => state.toggleTodo)
  const toggleImportant = useStore((state) => state.toggleImportant)
  const setSelectedTodo = useStore((state) => state.setSelectedTodo)

  const currentList = lists.find((list) => list.id === selectedList)
  const pendingTodos = currentList?.todos.filter((todo) => !todo.completed) || []
  const completedTodos = currentList?.todos.filter((todo) => todo.completed) || []

  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTodo.trim()) return

    const todo = {
      id: crypto.randomUUID(),
      title: newTodo,
      completed: false,
      important: false,
      createdAt: new Date().toISOString(),
    }

    addTodo(selectedList, todo)
    setNewTodo("")
  }

  return (
    <div className="flex flex-col">
      <div className="border-b mx-2">
        <h2 className="flex items-center text-sm text-gray-500 dark:text-green-900 font-bold p-2">To Do <ChevronDown /></h2>
        <form onSubmit={handleAddTodo} className="space-y-4 bg-[#EEF6EF] border-t-2 dark:bg-[#2F3630]">
          <div className="flex items-center gap-2 border-none ">
            <Input placeholder="Add A Task"  className="border-none mb-6 bg-[#EEF6EF] dark:bg-[#2F3630] "  value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="ghost" size="icon">
              <Bell className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <Calendar className="h-4 w-4" />
            </Button>
            <Button type="button" variant="ghost" size="icon">
              <RefreshCw className="h-4 w-4"/>
            </Button>
            <div className="ml-auto mr-2 mb-2">
              <Button type="submit" className="bg-[#357937] dark:text-white">ADD TASK</Button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex-1 overflow-auto p-4">
          {pendingTodos.map((todo) => (
            <div key={todo.id} className="flex items-center gap-2 border-t-2 px-4 py-2" onClick={() => setSelectedTodo(todo)}>
              <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(selectedList, todo.id)} />
              <span className={`${todo.completed ? "line-through text-muted-foreground" : ""}`}>{todo.title}</span>
              <Button
                variant="ghost"
                size="icon"
                className="ml-auto"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleImportant(selectedList, todo.id)
                }}
              >
                <Star className={`h-4 w-4 ${todo.important ? "fill-[#357937] dark:fill-white text-[#357937] dark:text-white"  : ""}`} />
              </Button>
            </div>
          ))}
          {completedTodos.length > 0 && (
            <>
             <h1 className="">Completed</h1>
              {completedTodos.map((todo) => (
                <div key={todo.id} className="flex items-center gap-2 border-t-2 px-4 py-2" onClick={() => setSelectedTodo(todo)}>
                  <Checkbox checked={todo.completed} onCheckedChange={() => toggleTodo(selectedList, todo.id)} />
                  <span className="line-through text-muted-foreground">{todo.title}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="ml-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleImportant(selectedList, todo.id)
                    }}
                  >
                    <Star className={`h-4 w-4 ${todo.important ? "fill-[#357937] dark:fill-white text-[#357937] dark:text-white" : ""}`} />
                  </Button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

  )
}

