<template>
  <div class="max-w-7xl mx-auto">
    <div class="flex flex-col items-center my-10">
      <h1 class="text-3xl font-bold text-gray-900 mb-6">Work Management</h1>
      <button @click="showCreateTaskModal = true" class="btn btn-primary">
        Create New Task
      </button>
    </div>

    <KanbanBoard />
  </div>

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
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTaskStore } from '../stores/task'
import KanbanBoard from '../components/KanbanBoard.vue'

const taskStore = useTaskStore()
const showCreateTaskModal = ref(false)

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