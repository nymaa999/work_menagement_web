<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Projects</h1>
        <p class="text-gray-500 mt-1">Manage your work projects</p>
      </div>
      <button 
        @click="isCreateModalOpen = true"
        class="btn bg-blue-600 text-white hover:bg-blue-700"
      >
        Create Project
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white rounded-lg shadow-sm p-4 mb-6">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-[200px]">
          <input 
            type="text" 
            v-model="searchQuery"
            placeholder="Search projects..."
            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
        </div>
        <div class="flex gap-4">
          <select 
            v-model="statusFilter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="on-hold">On Hold</option>
          </select>
          <select 
            v-model="priorityFilter"
            class="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">All Priority</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id"
        class="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start mb-4">
          <h3 class="text-lg font-semibold text-gray-900">{{ project.name }}</h3>
          <span 
            :class="{
              'bg-green-100 text-green-800': project.status === 'active',
              'bg-gray-100 text-gray-800': project.status === 'completed',
              'bg-yellow-100 text-yellow-800': project.status === 'on-hold'
            }"
            class="px-2 py-1 text-xs font-medium rounded-full"
          >
            {{ project.status }}
          </span>
        </div>
        <p class="text-gray-600 text-sm mb-4">{{ project.description }}</p>
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-2">
            <div class="flex -space-x-2">
              <img 
                v-for="member in project.members.slice(0, 3)" 
                :key="member.id"
                :src="member.avatar" 
                :alt="member.name"
                class="w-6 h-6 rounded-full border-2 border-white"
              >
              <div 
                v-if="project.members.length > 3"
                class="w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-600"
              >
                +{{ project.members.length - 3 }}
              </div>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <span class="text-sm text-gray-500">{{ project.tasks }} tasks</span>
            <button class="text-blue-600 hover:text-blue-700">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Create Project Modal -->
    <div 
      v-if="isCreateModalOpen"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <div class="bg-white rounded-lg p-6 w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-semibold text-gray-900">Create New Project</h2>
          <button 
            @click="isCreateModalOpen = false"
            class="text-gray-400 hover:text-gray-500"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form @submit.prevent="handleCreateProject" class="space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input 
              v-model="newProject.name"
              type="text"
              required
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea 
              v-model="newProject.description"
              rows="3"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select 
              v-model="newProject.status"
              class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="active">Active</option>
              <option value="completed">Completed</option>
              <option value="on-hold">On Hold</option>
            </select>
          </div>
          <div class="flex justify-end space-x-3 mt-6">
            <button 
              type="button"
              @click="isCreateModalOpen = false"
              class="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button 
              type="submit"
              class="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const isCreateModalOpen = ref(false)
const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')

const newProject = ref({
  name: '',
  description: '',
  status: 'active'
})

// Mock data
const projects = ref([
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Redesign company website with modern UI/UX',
    status: 'active',
    tasks: 12,
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
      { id: 3, name: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' },
      { id: 4, name: 'Sarah Wilson', avatar: 'https://ui-avatars.com/api/?name=Sarah+Wilson' }
    ]
  },
  {
    id: 2,
    name: 'Mobile App Development',
    description: 'Develop new mobile app for iOS and Android',
    status: 'on-hold',
    tasks: 8,
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' }
    ]
  },
  {
    id: 3,
    name: 'Marketing Campaign',
    description: 'Launch new marketing campaign for Q2',
    status: 'completed',
    tasks: 15,
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
      { id: 3, name: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' }
    ]
  }
])

const filteredProjects = computed(() => {
  return projects.value.filter(project => {
    const matchesSearch = project.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesStatus = !statusFilter.value || project.status === statusFilter.value
    return matchesSearch && matchesStatus
  })
})

const handleCreateProject = () => {
  // TODO: Implement project creation logic
  projects.value.push({
    id: projects.value.length + 1,
    ...newProject.value,
    tasks: 0,
    members: []
  })
  isCreateModalOpen.value = false
  newProject.value = {
    name: '',
    description: '',
    status: 'active'
  }
}
</script> 