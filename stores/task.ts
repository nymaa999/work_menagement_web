import { defineStore } from 'pinia'

interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  assignedTo: string[]
  createdBy: string
  createdAt: string
  updatedAt: string
}

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [] as Task[],
    loading: false,
    error: null as string | null
  }),

  getters: {
    getTasksByStatus: (state) => (status: Task['status']) => {
      return state.tasks.filter(task => task.status === status)
    },
    getTasksByUser: (state) => (userId: string) => {
      return state.tasks.filter(task => 
        task.assignedTo.includes(userId) || task.createdBy === userId
      )
    }
  },

  actions: {
    async createTask(task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) {
      try {
        this.loading = true
        // TODO: API call to create task
        const newTask: Task = {
          ...task,
          id: Date.now().toString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
        this.tasks.push(newTask)
        return newTask
      } catch (error) {
        this.error = 'Failed to create task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateTask(taskId: string, updates: Partial<Task>) {
      try {
        this.loading = true
        // TODO: API call to update task
        const taskIndex = this.tasks.findIndex(t => t.id === taskId)
        if (taskIndex === -1) throw new Error('Task not found')
        
        this.tasks[taskIndex] = {
          ...this.tasks[taskIndex],
          ...updates,
          updatedAt: new Date().toISOString()
        }
        return this.tasks[taskIndex]
      } catch (error) {
        this.error = 'Failed to update task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async deleteTask(taskId: string) {
      try {
        this.loading = true
        // TODO: API call to delete task
        this.tasks = this.tasks.filter(t => t.id !== taskId)
      } catch (error) {
        this.error = 'Failed to delete task'
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchTasks() {
      try {
        this.loading = true
        // TODO: API call to fetch tasks
        // this.tasks = await api.getTasks()
      } catch (error) {
        this.error = 'Failed to fetch tasks'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 