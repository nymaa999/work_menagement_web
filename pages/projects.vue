<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">Projects</h1>
        <p class="text-gray-500 mt-1">Manage your work projects</p>
      </div>
      
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
    <div class="bg-white shadow rounded-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-medium text-gray-900">Миний төслүүд</h2>
          <button 
            @click="isCreateModalOpen = true"
            class="btn bg-blue-600 text-white hover:bg-blue-700"
          >
            New Project
          </button>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="project in projects" :key="project.id" class="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-medium text-gray-900">{{ project.proName }}</h3>
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(project.proStatus)"
              >
                {{ project.proStatus }}
              </span>
            </div>
            <p class="text-gray-500 text-sm mb-4">{{ project.proDesc }}</p>
            <div class="flex items-center justify-between">
              <div class="flex -space-x-2">
                <img 
                  v-for="member in project.proMembers.slice(0, 3)" 
                  :key="member"
                  :src="`https://ui-avatars.com/api/?name=${member}&background=random`"
                  :alt="member" 
                  class="w-8 h-8 rounded-full border-2 border-white"
                />
                <div v-if="project.proMembers.length > 3" class="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  +{{ project.proMembers.length - 3 }}
                </div>
              </div>
              <div>
                <NuxtLink 
                  :to="{ name: 'tasks', query: { id: project.id, name: project.proName } }"
                  class="text-blue-600 hover:text-blue-700 font-medium"
                >
                  View Tasks
                </NuxtLink>
              </div>
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
                v-model="newProject.proName"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                v-model="newProject.proDesc"
                rows="3"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Project Type</label>
              <select 
                v-model="newProject.proType"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option disabled value="">Select Type</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
                <option value="client">Client</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select 
                v-model="newProject.proStatus"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="active">Active</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input 
                v-model="newProject.proStartDate"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
              <input 
                v-model="newProject.proEndDate"
                type="date"
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Team Members</label>
              <select 
                v-model="newProject.proMembers"
                multiple
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option v-for="user in userStore.users" :value="user">
                  {{ user.username }} 
                </option>
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
import { useProjectStore } from '@/stores/project'
import { useUserStore } from '@/stores/user'
import { reactive, ref, computed, onMounted } from 'vue'
import type { User } from '@/stores/user'

// Store-ууд
const proStore = useProjectStore()
const userStore = useUserStore()

// UI хувьсагчууд
const searchQuery = ref('')
const statusFilter = ref('')
const priorityFilter = ref('')
const isCreateModalOpen = ref(false)

// const emit = defineEmits(['open-create-task'])

// Нэвтэрсэн хэрэглэгчийн нэр
const currentUserName = computed(() => userStore.currentUser?.username || '')
console.log('currentUserName', currentUserName.value)

// Төсөл шүүж харуулах - зөвхөн тухайн хэрэглэгч оролцсон төслүүд
const projects = computed(() => {
  const userName = currentUserName.value.toLowerCase()
  // console.log("***********", userName, "************")
  return proStore.projects.filter(project => {
    // string массив эсвэл объект массив аль альтай ажиллах
    return project.proMembers.some((member: any) => {
      if (typeof member === 'string') {
        return member.toLowerCase().includes(userName)
      } else if (member && member.name) {
        return member.name.toLowerCase().includes(userName)
      }
      return false
    })
  })
})


// const allusers = await userStore.getAllUsers();


// Төсөл үүсгэх формын утгууд
const newProject = reactive({
  proName: '',
  proDesc: '',
  proType: '',
  proStatus: 'active',
  proStartDate: '',
  proEndDate: '',
  proMembers: [] as User[],
})

// Төсөл үүсгэх
const handleCreateProject = async () => {
  try {
    const payload = {
      ...newProject,
      proMembers: newProject.proMembers.map(member => member.username) // name эсвэл email тохируул
    }
    console.log("names:", payload.proMembers)
    await proStore.createProject(payload)
    isCreateModalOpen.value = false
    resetForm()
  } catch (error) {
    console.error('Project creation failed:', error)
  }
}


// Төлөвийн өнгө харуулах
const getStatusClass = (status: string) => {
  switch (status) {
    case 'In Progress':
      return 'bg-blue-100 text-blue-800'
    case 'Planning':
      return 'bg-yellow-100 text-yellow-800'
    case 'Completed':
      return 'bg-green-100 text-green-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

// Форм дахин хоослох
const resetForm = () => {
  newProject.proName = ''
  newProject.proDesc = ''
  newProject.proType = ''
  newProject.proStatus = 'active'
  newProject.proStartDate = ''
  newProject.proEndDate = ''
  newProject.proMembers = []
}

// Projects татах
onMounted(() => {
  proStore.getAllProjects()
})

onMounted(() => {
  userStore.getUsers()
})
// console.log('projects', projects.value)

</script>
