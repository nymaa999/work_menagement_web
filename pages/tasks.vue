<template>
  <div class="max-w-7xl mx-auto">
    <!-- Header Section -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Tasks</h1>
        <p class="text-gray-600 mt-2">Manage your work tasks</p>
      </div>
      <button @click="showCreateTaskModal = true" class="btn btn-primary">
        Create New Task
      </button>
    </div>

    <!-- Filters Section -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <input 
            v-model="filters.search" 
            type="text" 
            placeholder="Search tasks..." 
            class="input"
          >
        </div>
        <div class="flex gap-4">
          <select v-model="filters.priority" class="input">
            <option value="">All Priorities</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <select v-model="filters.status" class="input">
            <option value="">All Status</option>
            <option value="todo">Todo</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Kanban Board -->
    <KanbanBoard />

    <!-- Create Task Modal -->
    <div v-if="showCreateTaskModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4">Create New Task</h2>
        <form @submit.prevent="handleCreateTask" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700">Title</label>
            <input v-model="newTask.title" type="text" class="input" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="newTask.description" class="input" rows="3" required></textarea>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Due Date</label>
            <input v-model="newTask.dueDate" type="date" class="input" required>
          </div>
          
          <div>
            <label class="block text-sm font-medium text-gray-700">Priority</label>
            <select v-model="newTask.priority" class="input" required>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          
          <div class="flex justify-end space-x-3">
            <button type="button" @click="showCreateTaskModal = false" class="btn bg-gray-100 text-gray-700">
              Cancel
            </button>
            <button type="submit" class="btn btn-primary">
              Create Task
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/task'
import KanbanBoard from '../components/KanbanBoard.vue'

const taskStore = useTaskStore()
const showCreateTaskModal = ref(false)

const filters = ref({
  search: '',
  priority: '',
  status: ''
})

const newTask = ref({
  title: '',
  description: '',
  dueDate: '',
  priority: 'medium' as const,
  status: 'todo' as const,
  assignedTo: [],
  createdBy: 'current-user-id' // TODO: Get from user store
})

const handleCreateTask = async () => {
  try {
    await taskStore.createTask(newTask.value)
    showCreateTaskModal.value = false
    newTask.value = {
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'todo',
      assignedTo: [],
      createdBy: 'current-user-id'
    }
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}
</script> 