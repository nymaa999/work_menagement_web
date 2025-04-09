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

        <!-- Password input section -->
        <div class="relative">
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
      v-model="form.password"
      :type="showPassword ? 'text' : 'password'"
      placeholder="Password"
      class="input mt-1 w-full pr-10 py-2 px-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
    <button
      type="button"
      @click="showPassword = !showPassword"
      class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
    >
            <svg
              v-if="showPassword"
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path
                fill-rule="evenodd"
                d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                clip-rule="evenodd"
              />
            </svg>
            <svg
              v-else
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                clip-rule="evenodd"
              />
              <path
                d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
              />
            </svg>
          </button>
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
const showPassword = ref(false); // Нууц үг харах/нуух төлөв


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