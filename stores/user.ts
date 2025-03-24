import { defineStore } from 'pinia'

interface User {
  id: string | number
  name: string
  email: string
  avatar?: string
}

interface RegisterForm {
  name: string
  email: string
  password: string
  confirmPassword: string
  acceptTerms: boolean
}

export const useUserStore = defineStore('user', {
  state: () => ({
    currentUser: null as User | null,
    loading: false,
    error: null as string | null,
    isAuthenticated: false
  }),

  getters: {
    getUser: (state) => state.currentUser,
    getLoading: (state) => state.loading,
    getError: (state) => state.error,
    isLoggedIn: (state) => state.isAuthenticated,
    getUserId: (state) => state.currentUser?.id,
    getUserEmail: (state) => state.currentUser?.email,
    getUserAvatar: (state) => state.currentUser?.avatar
  },

  actions: {
    async register(form: RegisterForm) {
      try {
        this.loading = true
        this.error = null

        // TODO: Replace with actual API call
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Create user object
        const user: User = {
          id: Date.now(), // Temporary ID
          name: form.name,
          email: form.email,
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(form.name)}`
        }

        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(user))
        
        // Update state
        this.currentUser = user
        this.isAuthenticated = true

        // Бүртгэлийн дараа профайл хуудас руу шилжих
        navigateTo('/profile')

        return user
      } catch (error) {
        this.error = 'Failed to register'
        throw error
      } finally {
        this.loading = false
      }
    },

    async loginWithGoogle() {
      try {
        this.loading = true
        const config = useRuntimeConfig()
        const clientId = config.public.googleClientId
        const redirectUri = 'http://localhost:3000/auth/google/callback'
        
        // Google OAuth URL үүсгэх
        const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
          `client_id=${clientId}&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `response_type=code&` +
          `scope=email profile&` +
          `access_type=offline&` +
          `prompt=consent`

        // Google login цонх нээх
        window.location.href = authUrl
      } catch (error) {
        console.error('Google login error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async loginWithFacebook() {
      try {
        this.loading = true
        const config = useRuntimeConfig()
        const clientId = config.public.facebookClientId
        const redirectUri = window.location.origin + '/auth/facebook/callback'
        
        // Facebook OAuth URL үүсгэх
        const authUrl = `https://www.facebook.com/v12.0/dialog/oauth?` +
          `client_id=${clientId}&` +
          `redirect_uri=${encodeURIComponent(redirectUri)}&` +
          `scope=email public_profile`

        // Facebook login цонх нээх
        window.location.href = authUrl
      } catch (error) {
        console.error('Facebook login error:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async login(email: string, password: string) {
      try {
        this.loading = true
        this.error = null

        // TODO: Replace with actual API call
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))

        // Get user from localStorage
        const userStr = localStorage.getItem('user')
        if (!userStr) {
          throw new Error('User not found')
        }

        const user = JSON.parse(userStr)
        if (user.email !== email) {
          throw new Error('Invalid credentials')
        }

        // Update state
        this.currentUser = user
        this.isAuthenticated = true

        return user
      } catch (error) {
        this.error = 'Failed to login'
        throw error
      } finally {
        this.loading = false
      }
    },

    logout() {
      // Clear localStorage
      localStorage.removeItem('user')
      
      // Reset state
      this.currentUser = null
      this.isAuthenticated = false
      this.error = null
    },

    // Initialize user from localStorage on app start
    initializeUser() {
      const userStr = localStorage.getItem('user')
      if (userStr) {
        const user = JSON.parse(userStr)
        this.currentUser = user
        this.isAuthenticated = true
      }
    }
  }
}) 