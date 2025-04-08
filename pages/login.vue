<template>
  <div class="min-h-[calc(100vh-200px)] flex items-center justify-center">
    <div class="bg-white rounded-lg shadow-sm p-8 w-full max-w-md">
      <div class="text-center mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p class="text-gray-600 mt-2">Please sign in to your account</p>
      </div>

      <!-- Social Login Buttons -->
      <div class="space-y-3 mb-6">
        <button 
          @click="handleGoogleLogin" 
          class="w-full flex items-center justify-center space-x-2 btn bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
        >
          <svg class="w-5 h-5" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span>Continue with Google</span>
        </button>
        <button 
          @click="handleFacebookLogin" 
          class="w-full flex items-center justify-center space-x-2 btn bg-[#1877F2] text-white hover:bg-[#1877F2]/90"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
          <span>Continue with Facebook</span>
        </button>
      </div>

      <div class="relative my-6">
        <div class="absolute inset-0 flex items-center">
          <div class="w-full border-t border-gray-300"></div>
        </div>
        <div class="relative flex justify-center text-sm">
          <span class="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>

      <form @submit.prevent="handleLogin" class="space-y-6">
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="form.email" 
            type="email" 
            class="input mt-1" 
            required
            placeholder="Enter your email"
          >
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input 
            v-model="form.password" 
            type="password" 
            class="input mt-1" 
            required
            placeholder="Enter your password"
          >
        </div>

        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <input 
              v-model="form.remember" 
              type="checkbox" 
              class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary"
            >
            <label class="ml-2 block text-sm text-gray-700">Remember me</label>
          </div>
          <NuxtLink to="/forgot-password" class="text-sm text-primary hover:text-primary/80">
            Forgot password?
          </NuxtLink>
        </div>

        <button 
          type="submit" 
          class="btn btn-primary w-full"
          :disabled="loading"
        >
          <span v-if="loading">Signing in...</span>
          <span v-else>Sign In</span>
        </button>

        <div class="text-center text-sm text-gray-600">
          Don't have an account? 
          <NuxtLink to="/register" class="text-primary hover:text-primary/80">
            Register
          </NuxtLink>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false
})

const handleLogin = async (): Promise<void> => {
  try {
    loading.value = true
    await userStore.login(form.value.email, form.value.password)
    await router.push('/profile')
  } catch (error) {
    console.error('Login failed:', error)
    alert('Нэвтрэх үед алдаа гарлаа. Дахин оролдоно уу.')
  } finally {
    loading.value = false
  }
}


const handleGoogleLogin = async () => {
  try {
    loading.value = true
    await userStore.loginWithGoogle()
    router.push('/')
  } catch (error) {
    console.error('Google login failed:', error)
  } finally {
    loading.value = false
  }
}

const handleFacebookLogin = async () => {
  try {
    loading.value = true
    await userStore.loginWithFacebook()
    router.push('/')
  } catch (error) {
    console.error('Facebook login failed:', error)
  } finally {
    loading.value = false
  }
}
</script> 