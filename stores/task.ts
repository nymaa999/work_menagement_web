import { defineStore } from 'pinia'
import axios from 'axios'


interface Task{
  id: string
  title: string
  description: string
  dueDate: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  taskMems: string[]
  proId: string
}

export interface TaskForm{
  title: string
  description: string
  dueDate: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  taskMems: string[]
  proId: string
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
    // getTasksByUser: (state) => (userId: string) => {
    //   return state.tasks.filter(task => 
    //     task.taskMems.includes(userId) || task.createdBy === userId
    //   )
    // }
  },

  actions: {
    async createTask(form: TaskForm) {
      try {
        this.loading = true
        const response = await axios.post('http://localhost:9911/api/tasks/create', form)
        const task = response.data
        console.log("this is res:",task);

        localStorage.setItem('task', JSON.stringify(task))
        // this.currentTask = task

      } catch (error) {
        this.error = 'Failed to create project'
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
        const response = await axios.get('http://localhost:9911/api/tasks/getAll')
        this.tasks = response.data
        
        console.log(this.tasks);
      } catch (error) {
        this.error = 'Failed to fetch tasks'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
}) 