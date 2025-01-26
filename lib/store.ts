import { create } from "zustand"
import { persist } from "zustand/middleware"
import type { Todo, TodoList } from "@/types/todo"

interface TodoStore {
  deleteTodo: any
  lists: TodoList[]
  selectedTodo: Todo | null
  selectedList: string
  setSelectedTodo: (todo: Todo | null) => void
  setSelectedList: (listId: string) => void
  addList: (name: string) => void
  addTodo: (listId: string, todo: Todo) => void
  toggleTodo: (listId: string, todoId: string) => void
  toggleImportant: (listId: string, todoId: string) => void
  updateTodo: (listId: string, todoId: string, updates: Partial<Todo>) => void
}

export const useStore = create<TodoStore>()(
  persist(
    (set) => ({
      lists: [
        {
          id: "default",
          name: "Today",
          todos: [],
        },
      ],
      selectedTodo: null,
      selectedList: "default",
      setSelectedTodo: (todo) => set({ selectedTodo: todo }),
      setSelectedList: (listId) => set({ selectedList: listId }),
      addList: (name) =>
        set((state) => ({
          lists: [...state.lists, { id: crypto.randomUUID(), name, todos: [] }],
        })),
      addTodo: (listId, todo) =>
        set((state) => ({
          lists: state.lists.map((list) => (list.id === listId ? { ...list, todos: [...list.todos, todo] } : list)),
        })),
      toggleTodo: (listId, todoId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  todos: list.todos.map((todo) =>
                    todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
                  ),
                }
              : list,
          ),
        })),
      toggleImportant: (listId, todoId) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  todos: list.todos.map((todo) =>
                    todo.id === todoId ? { ...todo, important: !todo.important } : todo,
                  ),
                }
              : list,
          ),
        })),
      updateTodo: (listId, todoId, updates) =>
        set((state) => ({
          lists: state.lists.map((list) =>
            list.id === listId
              ? {
                  ...list,
                  todos: list.todos.map((todo) => (todo.id === todoId ? { ...todo, ...updates } : todo)),
                }
              : list,
          ),
        })),
        deleteTodo: (listId: string, todoId: string) =>
          set((state) => ({
            lists: state.lists.map((list) =>
              list.id === listId
                ? {
                    ...list,
                    todos: list.todos.filter((todo) => todo.id !== todoId),
                  }
                : list
            ),
          })),
    }),
    {
      name: "todo-storage",
    },
  ),
  
)

