export interface Todo {
  id: string
  title: string
  completed: boolean
  important: boolean
  notes?: string
  dueDate?: string
  steps?: TodoStep[]
  createdAt: string
}

export interface TodoStep {
  id: string
  title: string
  completed: boolean
}

export interface TodoList {
  id: string
  name: string
  todos: Todo[]
}

