<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <!-- Профайл мэдээлэл -->
      <div class="bg-white shadow rounded-lg p-6 mb-8">
        <div class="flex items-center space-x-4 mb-6">
          <img 
            :src="userStore.getUserAvatar" 
            :alt="userStore.getUser?.name"
            class="w-20 h-20 rounded-full"
          >
          <div>
            <h1 class="text-2xl font-bold text-gray-900">{{ userStore.getUser?.name }}</h1>
            <p class="text-gray-500">{{ userStore.getUserEmail }}</p>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Хэрэглэгчийн мэдээлэл</h2>
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500">ID</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ userStore.getUserId }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">И-мэйл</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ userStore.getUserEmail }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Нэр</dt>
              <dd class="mt-1 text-sm text-gray-900">{{ userStore.getUser?.name }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500">Нэвтрэлтийн төлөв</dt>
              <dd class="mt-1 text-sm text-gray-900">
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                      :class="userStore.isLoggedIn ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                  {{ userStore.isLoggedIn ? 'Нэвтэрсэн' : 'Нэвтрээгүй' }}
                </span>
              </dd>
            </div>
          </dl>
        </div>

        <div class="mt-6">
          <button
            @click="userStore.logout"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Гарах
          </button>
        </div>
      </div>

      <!-- Төслүүд -->
      <div class="bg-white shadow rounded-lg p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-lg font-medium text-gray-900">Миний төслүүд</h2>
          <NuxtLink 
            to="/projects" 
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Бүх төсөл
          </NuxtLink>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div v-for="project in projects" :key="project.id" class="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
              <h3 class="text-lg font-medium text-gray-900">{{ project.name }}</h3>
              <span 
                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                :class="getStatusClass(project.status)"
              >
                {{ project.status }}
              </span>
            </div>
            <p class="text-gray-500 text-sm mb-4">{{ project.description }}</p>
            <div class="flex items-center justify-between">
              <div class="flex -space-x-2">
                <img 
                  v-for="member in project.members.slice(0, 3)" 
                  :key="member.id"
                  :src="member.avatar" 
                  :alt="member.name"
                  class="w-8 h-8 rounded-full border-2 border-white"
                >
                <div v-if="project.members.length > 3" class="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                  +{{ project.members.length - 3 }}
                </div>
              </div>
              <span class="text-sm text-gray-500">{{ project.tasks }} даалгавар</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()

// Хэрэглэгч нэвтрээгүй бол login хуудас руу шилжих
if (!userStore.isLoggedIn) {
  navigateTo('/login')
}

// Жишээ төслүүд
const projects = ref([
  {
    id: 1,
    name: 'Вэб сайт шинэчлэл',
    description: 'Компанийн вэб сайтыг шинэчлэх төсөл',
    status: 'In Progress',
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' },
      { id: 3, name: 'Mike Johnson', avatar: 'https://ui-avatars.com/api/?name=Mike+Johnson' }
    ],
    tasks: 12
  },
  {
    id: 2,
    name: 'Мобайл апп хөгжүүлэлт',
    description: 'iOS болон Android апп хөгжүүлэх төсөл',
    status: 'Planning',
    members: [
      { id: 1, name: 'John Doe', avatar: 'https://ui-avatars.com/api/?name=John+Doe' },
      { id: 2, name: 'Jane Smith', avatar: 'https://ui-avatars.com/api/?name=Jane+Smith' }
    ],
    tasks: 8
  }
])

// Төслийн төлөвийн өнгө
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
</script> 