<template>
  <div class="p-4">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <!-- Todo Column -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4">Todo</h3>
        <div class="space-y-4">
          <TaskCard
            v-for="task in todoTasks"
            :key="task.id"
            :task="task"
            @update="handleTaskUpdate"
            @delete="handleTaskDelete"
          />
        </div>
      </div>

      <!-- In Progress Column -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4">In Progress</h3>
        <div class="space-y-4">
          <TaskCard
            v-for="task in inProgressTasks"
            :key="task.id"
            :task="task"
            @update="handleTaskUpdate"
            @delete="handleTaskDelete"
          />
        </div>
      </div>

      <!-- Done Column -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold mb-4">Done</h3>
        <div class="space-y-4">
          <TaskCard
            v-for="task in doneTasks"
            :key="task.id"
            :task="task"
            @update="handleTaskUpdate"
            @delete="handleTaskDelete"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useTaskStore } from '../stores/task'
import TaskCard from './TaskCard.vue'

const taskStore = useTaskStore()

const todoTasks = computed(() => taskStore.getTasksByStatus('todo'))
const inProgressTasks = computed(() => taskStore.getTasksByStatus('in-progress'))
const doneTasks = computed(() => taskStore.getTasksByStatus('done'))

const handleTaskUpdate = async (taskId: string, updates: any) => {
  await taskStore.updateTask(taskId, updates)
}

const handleTaskDelete = async (taskId: string) => {
  await taskStore.deleteTask(taskId)
}

// Fetch tasks when component is mounted
onMounted(() => {
  taskStore.fetchTasks()
})
</script> 