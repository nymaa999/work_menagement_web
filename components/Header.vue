<template>
  <header class="bg-white border-b border-gray-200">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-center h-16">
        <!-- Logo -->
        <div class="flex-shrink-0">
          <NuxtLink to="/" class="flex items-center">
            <img src="/items/logo.png" alt="Logo" class="h-8 w-auto">
            <span class="ml-2 text-xl font-bold text-gray-900">Archer Management</span>
          </NuxtLink>
        </div>

        <!-- Navigation -->
        <nav class="hidden md:flex space-x-8">
          <NuxtLink 
            to="/" 
            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            :class="{ 'text-blue-600': $route.path === '/' }"
          >
            Home
          </NuxtLink>
          <NuxtLink 
            to="/tasks" 
            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            :class="{ 'text-blue-600': $route.path === '/tasks' }"
          >
            Tasks
          </NuxtLink>
          <NuxtLink 
            to="/projects" 
            class="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
            :class="{ 'text-blue-600': $route.path === '/projects' }"
          >
            Projects
          </NuxtLink>
        </nav>

        <!-- User Menu -->
        <div class="flex items-center">
          <button 
            v-if="!isLoggedIn"
            @click="navigateTo('/login')"
            class="btn bg-blue-600 text-white hover:bg-blue-700"
          >
            Sign In
          </button>
          <div v-else class="relative">
            <button 
              @click="isMenuOpen = !isMenuOpen"
              class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
            >
              <img 
                :src="userAvatar" 
                :alt="userName"
                class="h-8 w-8 rounded-full"
              >
              <span class="text-sm font-medium">{{ userName }}</span>
              <svg 
                class="h-4 w-4" 
                :class="{ 'transform rotate-180': isMenuOpen }"
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            <!-- Dropdown Menu -->
            <div 
              v-if="isMenuOpen"
              class="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
            >
              <div class="py-1">
                <NuxtLink 
                  to="/profile"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="isMenuOpen = false"
                >
                  Profile
                </NuxtLink>
                <NuxtLink 
                  to="/settings"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  @click="isMenuOpen = false"
                >
                  Settings
                </NuxtLink>
                <button 
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
const isMenuOpen = ref(false)
const isLoggedIn = ref(false)
const userName = ref('John Doe')
const userAvatar = ref('https://ui-avatars.com/api/?name=John+Doe')

const handleLogout = () => {
  // TODO: Implement logout logic
  isLoggedIn.value = false
}
</script> 