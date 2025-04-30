<template>
  <div class="bg-white rounded-lg shadow-sm p-4">
    <div class="flex justify-between items-start mb-2">
      <h4 class="font-medium text-gray-900">{{ task.title }}</h4>
      <div class="flex items-center space-x-2">
        <span :class="getPriorityBadgeClass(task.priority)" class="text-xs px-2 py-1 rounded-full">
          {{ task.priority }}
        </span>
        <button @click="$emit('delete', task.id)" class="text-red-500 hover:text-red-700">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
    
    <p class="text-sm text-gray-600 mb-4">{{ task.description }}</p>
    
    <div class="flex items-center justify-between text-sm text-gray-500">
      <div class="flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
        </svg>
        {{ formatDate(task.dueDate) }}
      </div>
      
      <div class="flex items-center space-x-2">
        <span v-for="userId in task.taskMems" :key="userId" class="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
          {{ userId.charAt(0).toUpperCase() }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Task {
  id: string
  title: string
  description: string
  dueDate: string
  status: 'todo' | 'in-progress' | 'done'
  priority: 'low' | 'medium' | 'high'
  taskMems: string[]
}

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'update', taskId: string, updates: Partial<Task>): void
  (e: 'delete', taskId: string): void
}>()

const getPriorityBadgeClass = (priority: Task['priority']) => {
  const classes = {
    low: 'bg-green-100 text-green-800',
    medium: 'bg-yellow-100 text-yellow-800',
    high: 'bg-red-100 text-red-800'
  }
  return classes[priority]
}

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString()
}
</script> 