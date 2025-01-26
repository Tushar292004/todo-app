import { Bell, Calendar, FileText, LayoutGrid, Plus, Star, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useStore } from "@/lib/store"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

export function Sidebar() {
  const lists = useStore((state) => state.lists)
  const selectedList = useStore((state) => state.selectedList)
  const setSelectedList = useStore((state) => state.setSelectedList)
  const addList = useStore((state) => state.addList)

  const currentList = lists.find((list) => list.id === selectedList)
  const completedTasks = currentList?.todos.filter((todo) => todo.completed).length || 0
  const totalTasks = currentList?.todos.length || 0
  const pendingTasks = totalTasks - completedTasks

  const data = [
    { name: "Pending", value: pendingTasks },
    { name: "Completed", value: completedTasks },
  ]

  const COLORS = ["#4ade80", "#166534"]

  return (
    <div className="flex h-full flex-col justify-evenly bg-[#eef6ef]">
      <div className="p-4">
        <div className="flex flex-col items-center gap-2 border-b p-4">
          <img      src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fRC6fI0THYFgBICKwQjbiHZ0SP7F6L.png"
            alt="Profile" 
            className="h-10 w-10 rounded-full"
          />
          <div>
            <h2 className="font-semibold">Hey, ABCD</h2>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-2 bg-white">
          <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => setSelectedList("default")}>
            <FileText className="h-4 w-4" />
            All Tasks
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start gap-2"
            onClick={() => setSelectedList("ghost")}
          >
            <Calendar className="h-4 w-4" />
            Today
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Star className="h-4 w-4" />
            Important
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <LayoutGrid className="h-4 w-4" />
            Planned
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-2">
            <Users className="h-4 w-4" />
            Assigned to me
          </Button>
        </nav>
      </div>
      <div className=" px-4 py-2 bg-[#eef6ef] ">
        <Button variant="outline" className="w-full justify-start gap-2 border-none rounded-none" onClick={() => addList("New List")}>
          <Plus className="h-4 w-4" />
          Add list
        </Button>
      </div>
      <div className="p-4 bg-[#eef6ef]">
        <div className="bg-card p-4">
          <div className="flex items-center justify-evenly">
            <h3 className="font-semibold">Today Tasks</h3>
            <span className="text-2xl font-bold">{totalTasks}</span>
          </div>
          <div className="h-40 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={data} innerRadius={30} outerRadius={40} paddingAngle={5} dataKey="value">
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#4ade80]" />
              <span>Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full bg-[#166534]" />
              <span>Done</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

